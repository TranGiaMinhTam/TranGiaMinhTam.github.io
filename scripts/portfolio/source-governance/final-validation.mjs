import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { createConfig } from './config.mjs'
import { generateDerivatives } from './generate-derivatives.mjs'
import { promoteManifestCandidate } from './generate-manifest.mjs'
import { hashFile } from './hash.mjs'
import { inventoryArchive, validateCapacity } from './inventory.mjs'
import { verifyRecoveryManifest } from './recovery.mjs'
import { verifyPrivacy } from './verify-privacy.mjs'
import { writeCanonicalJson } from './evidence.mjs'

const readJson = async (target) => JSON.parse(await readFile(target, 'utf8'))

const outcomeFingerprint = (outcomes) => JSON.stringify(outcomes.map((outcome) => ({
  canonicalId: outcome.canonicalId,
  status: outcome.status,
  purpose: outcome.purpose,
  sourceSha256: outcome.sourceSha256,
  outputSha256: outcome.outputSha256,
  bytes: outcome.bytes,
  width: outcome.width,
  height: outcome.height,
  pages: outcome.pages,
  mediaType: outcome.mediaType,
  relativeOutput: outcome.relativeOutput,
  reason: outcome.reason,
  safeFallback: outcome.safeFallback,
})))

const parseProtectedHashes = (text) => new Map(text.trim().split('\n').filter(Boolean).map((line) => {
  const separator = line.indexOf('  ')
  return [line.slice(separator + 2), line.slice(0, separator)]
}))

export const runFinalValidation = async ({ workspaceRoot = process.cwd() } = {}) => {
  const config = createConfig({ cwd: workspaceRoot })
  const derivativeBefore = await readJson(path.join(config.evidenceRoot, 'derivative-manifest.json'))
  const sourceHashes = parseProtectedHashes(await readFile(path.join(workspaceRoot, '.aidlc-recovery/source-governance-safe-foundation/protected-archive-sha256.txt'), 'utf8'))
  const rssBefore = process.memoryUsage().rss
  const inventoryStarted = performance.now()
  const inventory = await inventoryArchive({ workspaceRoot, sourceRoot: config.sourceRoot })
  const inventoryElapsedMs = Math.round(performance.now() - inventoryStarted)
  const rssAfter = process.memoryUsage().rss
  const changedSources = inventory.facts.filter((fact) => sourceHashes.get(fact.relativePath) !== fact.sha256).map(({ relativePath }) => relativePath)
  const missingSources = [...sourceHashes.keys()].filter((relativePath) => !inventory.facts.some((fact) => fact.relativePath === relativePath))
  const capacity = validateCapacity({ fileCount: inventory.facts.length, totalBytes: inventory.summary.totalBytes, maxFiles: 500, maxBytes: 1024 ** 3 })
  if (!inventory.report.canProceed || changedSources.length || missingSources.length || !capacity.withinCapacity) throw new Error('SOURCE_PRESERVATION_GATE_BLOCKED')

  const derivativeAfter = await generateDerivatives({ config })
  const derivativesDeterministic = outcomeFingerprint(derivativeBefore.outcomes) === outcomeFingerprint(derivativeAfter.outcomes)
  if (!derivativesDeterministic) throw new Error('DERIVATIVE_NONDETERMINISTIC')

  const resumeEvidence = await readJson(path.join(config.evidenceRoot, 'resume-integrity.json'))
  const bundledResume = await hashFile(config.resumeTarget)
  const externalResumePath = process.env.PORTFOLIO_RESUME_SOURCE
  const externalResume = externalResumePath ? await hashFile(path.resolve(externalResumePath)) : null
  const resumeEqual = bundledResume.sha256 === resumeEvidence.bundled.sha256 && bundledResume.bytes === resumeEvidence.bundled.bytes && (!externalResume || (externalResume.sha256 === bundledResume.sha256 && externalResume.bytes === bundledResume.bytes))
  if (!resumeEqual) throw new Error('RESUME_FINAL_GATE_BLOCKED')

  const privacy = await verifyPrivacy({ config, extractFromResume: true })
  if (!privacy.report.canProceed || !privacy.markerProvided) throw new Error('PRIVACY_FINAL_GATE_BLOCKED')
  const recovery = await verifyRecoveryManifest({ workspaceRoot, manifestPath: config.recoveryManifest })
  if (!recovery.canProceed) throw new Error('RECOVERY_FINAL_GATE_BLOCKED')
  const promotion = await promoteManifestCandidate({ workspaceRoot })

  const report = {
    schemaVersion: 1,
    canProceed: true,
    inventory: {
      physicalFileCount: inventory.facts.length,
      totalBytes: inventory.summary.totalBytes,
      elapsedMs: inventoryElapsedMs,
      rssBeforeBytes: rssBefore,
      rssAfterBytes: rssAfter,
      withinCapacity: capacity.withinCapacity,
    },
    sourcePreservation: { changedCount: changedSources.length, missingCount: missingSources.length },
    derivatives: { twiceRunEquivalent: derivativesDeterministic, readyCount: derivativeAfter.readyCount, unavailableCount: derivativeAfter.unavailableCount },
    resume: { byteIdentical: resumeEqual, bytes: bundledResume.bytes, sha256: bundledResume.sha256 },
    privacy: { canProceed: privacy.report.canProceed, findingCount: privacy.report.findings.length, markerSource: privacy.markerSource, scannedFileCount: privacy.scannedFileCount },
    recovery: { canProceed: recovery.canProceed, findingCount: recovery.findings.length, withinThirtyMinutes: recovery.manifest.restoration.withinThirtyMinutes },
    promotion,
  }
  await writeCanonicalJson(path.join(config.evidenceRoot, 'final-validation.json'), report)
  return report
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  runFinalValidation().then((report) => {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
  }).catch((error) => {
    const code = error instanceof Error ? error.message : 'FINAL_VALIDATION_FAILED'
    process.stderr.write(`${JSON.stringify({ ok: false, code })}\n`)
    process.exitCode = 1
  })
}
