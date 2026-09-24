import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const recoveryRoot = path.join(root, '.aidlc-recovery/complete-archive-discovery')
const manifest = JSON.parse(await readFile(path.join(recoveryRoot, 'manifest.json'), 'utf8'))
const sha256 = (value) => createHash('sha256').update(value).digest('hex')
const findings = []

for (const target of manifest.targetStates.filter(({ exists, kind }) => exists && kind === 'file')) {
  const bytes = await readFile(path.join(recoveryRoot, 'payload', target.path)).catch(() => null)
  if (!bytes || bytes.byteLength !== target.bytes || sha256(bytes) !== target.sha256) findings.push({ code: 'U04A-REC-PAYLOAD', target: target.path })
}
const patchBytes = await readFile(path.join(recoveryRoot, manifest.trackedDiff.path)).catch(() => null)
if (!patchBytes || sha256(patchBytes) !== manifest.trackedDiff.sha256) findings.push({ code: 'U04A-REC-PATCH', target: manifest.trackedDiff.path })
if (!manifest.restoration?.passed) findings.push({ code: 'U04A-REC-REHEARSAL', target: 'isolated-restoration' })

const report = {
  schemaVersion: 1,
  targetCount: manifest.targetCount,
  capturedPayloadCount: manifest.existingFileCount,
  absentStateCount: manifest.absentStateCount,
  isolatedRestorationPassed: manifest.restoration?.passed === true,
  findings,
  canRestore: manifest.restoration?.passed === true && findings.length === 0,
}
await writeFile(path.join(root, 'artifacts/portfolio/u04-complete-archive/recovery-verification.json'), `${JSON.stringify(report, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
if (!report.canRestore) process.exitCode = 1
