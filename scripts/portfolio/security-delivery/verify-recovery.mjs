import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const recoveryRoot = path.join(root, '.aidlc-recovery/security-delivery-integrated-acceptance')
const evidenceRoot = path.join(root, 'artifacts/portfolio/u06-security-delivery')
const manifest = JSON.parse(await readFile(path.join(recoveryRoot, 'manifest.json'), 'utf8'))
const sha256 = (value) => createHash('sha256').update(value).digest('hex')
const findings = []

for (const target of manifest.targetStates.filter(({ exists }) => exists)) {
  const payload = await readFile(path.join(recoveryRoot, 'payload', target.path)).catch(() => null)
  if (!payload || payload.byteLength !== target.bytes || sha256(payload) !== target.sha256) {
    findings.push({ code: 'U06-RECOVERY-PAYLOAD-MISMATCH', target: target.path })
  }
}

const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'))
const packageLock = await readFile(path.join(root, 'package-lock.json'))
const plannedChanges = {
  packageLockChanged: sha256(packageLock) !== manifest.dependencyBaseline.packageLockSha256,
  dependenciesChanged: sha256(Buffer.from(JSON.stringify(packageJson.dependencies ?? {}))) !== manifest.dependencyBaseline.dependenciesSha256,
  devDependenciesChanged: sha256(Buffer.from(JSON.stringify(packageJson.devDependencies ?? {}))) !== manifest.dependencyBaseline.devDependenciesSha256,
}
if (manifest.restoration?.passed !== true) findings.push({ code: 'U06-RECOVERY-REHEARSAL-FAILED', target: 'isolated-restoration' })

await mkdir(evidenceRoot, { recursive: true })
const report = {
  schemaVersion: 1,
  capturedFileCount: manifest.targetStates.filter(({ exists }) => exists).length,
  isolatedRestorationPassed: manifest.restoration?.passed === true,
  plannedChanges,
  findings,
  canRestore: manifest.restoration?.passed === true && findings.length === 0,
}
await writeFile(path.join(evidenceRoot, 'recovery-verification.json'), `${JSON.stringify(report, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
if (!report.canRestore) process.exitCode = 1
