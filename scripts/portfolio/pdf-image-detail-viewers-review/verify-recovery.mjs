import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const recoveryRoot = path.join(root, '.aidlc-recovery/pdf-image-detail-viewers')
const evidenceRoot = path.join(root, 'artifacts/portfolio/u05-media-viewers')
const manifest = JSON.parse(await readFile(path.join(recoveryRoot, 'manifest.json'), 'utf8'))
const sha256 = (value) => createHash('sha256').update(value).digest('hex')
const findings = []

for (const target of manifest.targetStates.filter(({ exists, kind }) => exists && kind === 'file')) {
  const payload = await readFile(path.join(recoveryRoot, 'payload', target.path)).catch(() => null)
  if (!payload || payload.byteLength !== target.bytes || sha256(payload) !== target.sha256) findings.push({ code: 'U05-REC-PAYLOAD', target: target.path })
}
const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'))
if (sha256(Buffer.from(JSON.stringify(packageJson.dependencies ?? {}))) !== manifest.dependencyBaseline.dependenciesSha256) findings.push({ code: 'U05-REC-DEPENDENCY-DRIFT', target: 'dependencies' })
if (sha256(Buffer.from(JSON.stringify(packageJson.devDependencies ?? {}))) !== manifest.dependencyBaseline.devDependenciesSha256) findings.push({ code: 'U05-REC-DEPENDENCY-DRIFT', target: 'devDependencies' })
if (!manifest.restoration?.passed) findings.push({ code: 'U05-REC-REHEARSAL', target: 'isolated-restoration' })

const report = { schemaVersion: 1, capturedFileCount: manifest.targetStates.filter(({ kind }) => kind === 'file').length, isolatedRestorationPassed: manifest.restoration?.passed === true, findings, canRestore: manifest.restoration?.passed === true && findings.length === 0 }
await mkdir(evidenceRoot, { recursive: true })
await writeFile(path.join(evidenceRoot, 'recovery-verification.json'), `${JSON.stringify(report, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
if (!report.canRestore) process.exitCode = 1
