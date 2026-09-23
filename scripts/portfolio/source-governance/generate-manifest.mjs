import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { canonicalizeAssets } from './canonicalize.mjs'
import { createConfig } from './config.mjs'
import { writeCanonicalJson, writeFileAtomically } from './evidence.mjs'
import { hashFile } from './hash.mjs'
import { inventoryArchive } from './inventory.mjs'
import { createArchiveManifest, parseArchiveManifest, serializeArchiveManifest } from './manifest.mjs'
import { joinArchiveMetadata } from './metadata.mjs'
import { createNeutralReviewedMetadata } from './reviewed-metadata.mjs'

const readJson = async (target) => JSON.parse(await readFile(target, 'utf8'))

const publicHref = (relativeOutput) => `/${relativeOutput.replace(/^src\//u, '')}`

const normalizeDerivative = (outcome) => {
  const { canonicalId: _canonicalId, relativeOutput, ...rest } = outcome
  return outcome.status === 'ready'
    ? Object.freeze({ ...rest, href: publicHref(relativeOutput) })
    : Object.freeze(rest)
}

const validateDerivative = async ({ workspaceRoot, canonicalById, outcome }) => {
  const canonical = canonicalById.get(outcome.canonicalId)
  if (!canonical) throw new Error('DERIVATIVE_CANONICAL_OWNER_MISSING')
  if (outcome.status !== 'ready') return
  if (!canonical.contentHashes.includes(outcome.sourceSha256)) throw new Error('DERIVATIVE_SOURCE_HASH_MISMATCH')
  const target = path.resolve(workspaceRoot, outcome.relativeOutput)
  const targetStat = await stat(target)
  if (!targetStat.isFile() || targetStat.size !== outcome.bytes) throw new Error('DERIVATIVE_OUTPUT_SIZE_MISMATCH')
  if ((await hashFile(target)).sha256 !== outcome.outputSha256) throw new Error('DERIVATIVE_OUTPUT_HASH_MISMATCH')
}

const requirePassingEvidence = ({ privacy, resume, pbt }) => {
  if (!privacy.markerProvided || !privacy.report?.canProceed || privacy.report.blockingCount !== 0) throw new Error('PRIVACY_GATE_BLOCKED')
  if (!resume.ok || resume.source?.sha256 !== resume.bundled?.sha256 || resume.source?.bytes !== resume.bundled?.bytes) throw new Error('RESUME_GATE_BLOCKED')
  if (!pbt.success || pbt.numPassedTests !== 12 || pbt.numTotalTests !== 12) throw new Error('PBT_GATE_BLOCKED')
}

export const buildManifestCandidate = async ({ workspaceRoot = process.cwd() } = {}) => {
  const config = createConfig({ cwd: workspaceRoot })
  const [inventory, derivativeEvidence, privacy, resume, pbt] = await Promise.all([
    inventoryArchive({ workspaceRoot, sourceRoot: config.sourceRoot }),
    readJson(path.join(config.evidenceRoot, 'derivative-manifest.json')),
    readJson(path.join(config.evidenceRoot, 'privacy-verification.json')),
    readJson(path.join(config.evidenceRoot, 'resume-integrity.json')),
    readJson(path.join(config.evidenceRoot, 'pbt-results.json')),
  ])
  if (!inventory.report.canProceed) throw new Error('INVENTORY_GATE_BLOCKED')
  const canonical = canonicalizeAssets(inventory.facts)
  if (!canonical.report.canProceed) throw new Error('CANONICAL_GATE_BLOCKED')
  requirePassingEvidence({ privacy, resume, pbt })
  const canonicalById = new Map(canonical.items.map((item) => [item.id, item]))
  await Promise.all(derivativeEvidence.outcomes.map((outcome) => validateDerivative({ workspaceRoot, canonicalById, outcome })))
  const derivatives = derivativeEvidence.outcomes.map((outcome) => Object.freeze({
    ...normalizeDerivative(outcome),
    canonicalId: outcome.canonicalId,
  }))
  const metadata = createNeutralReviewedMetadata(canonical.items)
  const joined = joinArchiveMetadata({ canonicalItems: canonical.items, metadata, derivatives })
  if (!joined.report.canProceed || joined.items.length !== canonical.items.length) throw new Error('METADATA_GATE_BLOCKED')
  const manifest = createArchiveManifest({
    items: joined.items.map((item) => Object.freeze({
      ...item,
      derivatives: Object.freeze(item.derivatives.map(({ canonicalId: _canonicalId, ...outcome }) => outcome)),
    })),
    physicalFileCount: inventory.facts.length,
    totalBytes: inventory.summary.totalBytes,
  })
  const serialized = serializeArchiveManifest(manifest)
  parseArchiveManifest(serialized)
  return Object.freeze({ manifest, serialized, inventory, canonical, derivativeEvidence, privacy, resume, pbt })
}

export const promoteManifestCandidate = async ({ workspaceRoot = process.cwd() } = {}) => {
  const config = createConfig({ cwd: workspaceRoot })
  const first = await buildManifestCandidate({ workspaceRoot })
  const second = await buildManifestCandidate({ workspaceRoot })
  if (first.serialized !== second.serialized) throw new Error('MANIFEST_NONDETERMINISTIC')
  const candidatePath = path.join(config.evidenceRoot, 'catalog-candidate.json')
  await writeFileAtomically(candidatePath, first.serialized)
  await writeFileAtomically(config.generatedManifest, first.serialized)
  const { sha256: manifestSha256 } = await hashFile(config.generatedManifest)
  const promotion = {
    schemaVersion: 1,
    canProceed: true,
    twiceRunByteIdentical: true,
    physicalFileCount: first.manifest.physicalFileCount,
    canonicalItemCount: first.manifest.items.length,
    derivativeOutcomeCount: first.derivativeEvidence.outcomes.length,
    readyDerivativeCount: first.derivativeEvidence.outcomes.filter(({ status }) => status === 'ready').length,
    unavailableDerivativeCount: first.derivativeEvidence.outcomes.filter(({ status }) => status === 'unavailable').length,
    resumeSha256: first.resume.bundled.sha256,
    manifestSha256,
  }
  await writeCanonicalJson(path.join(config.evidenceRoot, 'promotion-gate.json'), promotion)
  return Object.freeze(promotion)
}
