import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const recoveryRoot = path.join(root, '.aidlc-recovery/resume-led-content-integration')
const manifest = JSON.parse(await readFile(path.join(recoveryRoot, 'manifest.json'), 'utf8'))
const sha256 = (value) => createHash('sha256').update(value).digest('hex')
const findings = []
for (const target of manifest.targetStates.filter(({ exists }) => exists)) {
  const bytes = await readFile(path.join(recoveryRoot, 'payload', target.path)).catch(() => null)
  if (!bytes || bytes.byteLength !== target.bytes || sha256(bytes) !== target.sha256) findings.push({ code: 'U03-REC-PAYLOAD', target: target.path })
}
const patchBytes = await readFile(path.join(recoveryRoot, manifest.trackedDiff.path)).catch(() => null)
if (!patchBytes || sha256(patchBytes) !== manifest.trackedDiff.sha256) findings.push({ code: 'U03-REC-PATCH', target: manifest.trackedDiff.path })
const report = {
  schemaVersion: 1,
  targetCount: manifest.targetCount,
  capturedPayloadCount: manifest.existingTargetCount,
  absentStateCount: manifest.absentTargetCount,
  isolatedRestorationPassed: manifest.restoration.passed,
  findings,
  canRestore: manifest.restoration.passed && findings.length === 0,
}
await writeFile(path.join(root, 'artifacts/portfolio/u03-resume-content/recovery-verification.json'), `${JSON.stringify(report, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
if (!report.canRestore) process.exitCode = 1
