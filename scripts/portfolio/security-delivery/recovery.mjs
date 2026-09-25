import { createHash } from 'node:crypto'
import { cp, mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

const root = process.cwd()
const recoveryRoot = path.join(root, '.aidlc-recovery/security-delivery-integrated-acceptance')
const payloadRoot = path.join(recoveryRoot, 'payload')
const evidenceRoot = path.join(root, 'artifacts/portfolio/u06-security-delivery')
const existingTargets = [
  'src/App.tsx',
  'src/portfolio/index.ts',
  'package.json',
  'package-lock.json',
  '.github/workflows/deploy.yml',
  'vite.config.ts',
  'tsconfig.app.json',
  'eslint.config.js',
]
const plannedTargets = [
  'src/portfolio/release/release.types.ts',
  'src/portfolio/release/releaseDecision.ts',
  'src/portfolio/release/headerAssessment.ts',
  'src/portfolio/release/evidenceBundle.ts',
  'src/portfolio/release/index.ts',
  'scripts/portfolio/security-delivery/reports.mjs',
  'scripts/portfolio/security-delivery/sbom.mjs',
  'scripts/portfolio/security-delivery/dependencies.mjs',
  'scripts/portfolio/security-delivery/ci-integrity.mjs',
  'scripts/portfolio/security-delivery/headers.mjs',
  'scripts/portfolio/security-delivery/integrated.mjs',
  'scripts/portfolio/security-delivery/privacy.mjs',
  'scripts/portfolio/security-delivery/review.mjs',
]

const sha256 = (value) => createHash('sha256').update(value).digest('hex')
const exists = (target) => stat(target).then(() => true, () => false)

await mkdir(payloadRoot, { recursive: true })
await mkdir(evidenceRoot, { recursive: true })

const targetStates = []
for (const relativePath of [...existingTargets, ...plannedTargets]) {
  const absolutePath = path.join(root, relativePath)
  if (!(await exists(absolutePath))) {
    targetStates.push({ path: relativePath, exists: false })
    continue
  }
  const info = await stat(absolutePath)
  if (!info.isFile()) throw new Error(`RECOVERY_TARGET_NOT_FILE:${relativePath}`)
  const bytes = await readFile(absolutePath)
  targetStates.push({ path: relativePath, exists: true, bytes: bytes.byteLength, sha256: sha256(bytes) })
  const destination = path.join(payloadRoot, relativePath)
  await mkdir(path.dirname(destination), { recursive: true })
  await cp(absolutePath, destination)
}

const rehearsalRoot = await mkdtemp(path.join(tmpdir(), 'u06-security-delivery-recovery-'))
const findings = []
try {
  for (const target of targetStates.filter(({ exists: present }) => present)) {
    const source = path.join(payloadRoot, target.path)
    const destination = path.join(rehearsalRoot, target.path)
    await mkdir(path.dirname(destination), { recursive: true })
    await cp(source, destination)
    const restored = await readFile(destination)
    if (restored.byteLength !== target.bytes || sha256(restored) !== target.sha256) {
      findings.push({ code: 'U06-RECOVERY-HASH-MISMATCH', target: target.path })
    }
  }
} finally {
  await rm(rehearsalRoot, { recursive: true, force: true })
}

const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'))
const packageLock = await readFile(path.join(root, 'package-lock.json'))
const manifest = {
  schemaVersion: 1,
  createdAt: new Date().toISOString(),
  targetStates,
  dependencyBaseline: {
    packageLockSha256: sha256(packageLock),
    dependenciesSha256: sha256(Buffer.from(JSON.stringify(packageJson.dependencies ?? {}))),
    devDependenciesSha256: sha256(Buffer.from(JSON.stringify(packageJson.devDependencies ?? {}))),
  },
  restoration: { isolated: true, findings, passed: findings.length === 0 },
  canProceed: findings.length === 0,
}

await writeFile(path.join(recoveryRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
await writeFile(path.join(evidenceRoot, 'recovery-preflight.json'), `${JSON.stringify(manifest, null, 2)}\n`)
process.stdout.write(`${JSON.stringify({
  targetCount: targetStates.length,
  capturedFileCount: targetStates.filter(({ exists: present }) => present).length,
  absentStateCount: targetStates.filter(({ exists: present }) => !present).length,
  findings,
  canProceed: manifest.canProceed,
}, null, 2)}\n`)
if (!manifest.canProceed) process.exitCode = 1
