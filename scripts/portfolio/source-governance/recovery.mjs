import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { hashFile } from './hash.mjs'
import { normalizeRepositoryPath } from './paths.mjs'

export const readRecoveryManifest = async (manifestPath) => JSON.parse(await readFile(manifestPath, 'utf8'))

export const verifyRecoveryManifest = async ({ workspaceRoot, manifestPath, expectedFileCount = 122 }) => {
  const manifest = await readRecoveryManifest(manifestPath)
  const findings = []
  if (manifest.schemaVersion !== 1) findings.push({ code: 'U01-REC-SCHEMA', target: 'recovery-manifest' })
  if (!manifest.canProceed) findings.push({ code: 'U01-REC-NOT-READY', target: 'recovery-manifest' })
  if (manifest.protectedArchive?.fileCount !== expectedFileCount) findings.push({ code: 'U01-REC-COUNT', target: 'protected-archive' })
  if (!manifest.restoration?.withinThirtyMinutes) findings.push({ code: 'U01-REC-RTO', target: 'recovery-rehearsal' })
  for (const target of manifest.targetStates ?? []) normalizeRepositoryPath(target.path)
  const patchPath = path.join(path.dirname(manifestPath), manifest.trackedDiff.path)
  const patchHash = await hashFile(patchPath)
  if (patchHash.sha256 !== manifest.trackedDiff.sha256) findings.push({ code: 'U01-REC-PATCH-HASH', target: 'tracked-targets.patch' })
  if (!path.resolve(manifestPath).startsWith(path.resolve(workspaceRoot))) findings.push({ code: 'U01-REC-PATH', target: 'recovery-manifest' })
  return Object.freeze({ canProceed: findings.length === 0, findings: Object.freeze(findings), manifest })
}
