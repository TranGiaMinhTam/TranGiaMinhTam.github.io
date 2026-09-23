import { createHash } from 'node:crypto'
import { readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const recoveryRoot = path.join(root, '.aidlc-recovery/masthead-theme-responsive-alignment')
const manifest = JSON.parse(await readFile(path.join(recoveryRoot, 'manifest.json'), 'utf8'))
const sha256 = (value) => createHash('sha256').update(value).digest('hex')
const findings = []

for (const target of manifest.targetStates.filter(({ exists }) => exists)) {
  const payload = path.join(recoveryRoot, 'payload', target.path)
  const bytes = await readFile(payload).catch(() => null)
  if (!bytes || sha256(bytes) !== target.sha256) findings.push({ code: 'U02-REC-PAYLOAD', target: target.path })
}
const patchBytes = await readFile(path.join(recoveryRoot, manifest.trackedDiff.path)).catch(() => null)
if (!patchBytes || sha256(patchBytes) !== manifest.trackedDiff.sha256) findings.push({ code: 'U02-REC-PATCH', target: manifest.trackedDiff.path })

for (const [name, record] of Object.entries(manifest.protectedSources)) {
  const bytes = await readFile(path.join(root, record.path)).catch(() => null)
  if (!bytes || sha256(bytes) !== record.sha256 || bytes.byteLength !== record.bytes) findings.push({ code: 'U02-REC-PROTECTED', target: name })
}

const report = {
  schemaVersion: 1,
  targetCount: manifest.targetCount,
  capturedPayloadCount: manifest.existingTargetCount,
  absentStateCount: manifest.absentTargetCount,
  findings,
  canRestore: manifest.restoration.passed && findings.length === 0,
}
await stat(path.join(root, 'artifacts/portfolio/u02-masthead-alignment'))
await writeFile(path.join(root, 'artifacts/portfolio/u02-masthead-alignment/recovery-verification.json'), `${JSON.stringify(report, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
if (!report.canRestore) process.exitCode = 1
