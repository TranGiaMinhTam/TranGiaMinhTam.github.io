import { createHash } from 'node:crypto'
import { cp, mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

const root = process.cwd()
const recoveryRoot = path.join(root, '.aidlc-recovery/pdf-image-detail-viewers')
const payloadRoot = path.join(recoveryRoot, 'payload')
const evidenceRoot = path.join(root, 'artifacts/portfolio/u05-media-viewers')
const existingTargets = [
  'src/App.tsx',
  'src/portfolio/index.ts',
  'src/portfolio/archive/archive.types.ts',
  'src/portfolio/archive/ArchiveCards.tsx',
  'src/portfolio/archive/ArchiveGroup.tsx',
  'src/portfolio/archive/ArchiveExplorer.tsx',
  'src/portfolio/archive/ArchiveExplorer.module.css',
  'src/portfolio/academics/AcademicEvidenceAction.tsx',
  'src/portfolio/academics/LazyEvidenceImage.tsx',
  'src/portfolio/academics/TextDocumentPreview.tsx',
  'src/portfolio/academics/CompleteEvidenceLibrary.tsx',
  'src/portfolio/research/ResearchFigure.tsx',
  'src/portfolio/research/ResearchEvidenceAction.tsx',
  'src/portfolio/research/ComputationalProjects.tsx',
  'src/portfolio/research/LaboratoryResearch.tsx',
  'src/portfolio/shared/EvidenceAction.tsx',
  'src/portfolio/resume/ResumeAction.tsx',
  'src/portfolio/shell/PortfolioExperience.tsx',
  'package.json',
  'package-lock.json',
]
const plannedNewTargets = [
  'src/portfolio/media-viewer',
  'scripts/portfolio/pdf-image-detail-viewers-candidate',
  'scripts/portfolio/pdf-image-detail-viewers-review',
]
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex')
const exists = (target) => stat(target).then(() => true, () => false)

await mkdir(payloadRoot, { recursive: true })
await mkdir(evidenceRoot, { recursive: true })
const targetStates = []
for (const relativePath of [...existingTargets, ...plannedNewTargets]) {
  const absolute = path.join(root, relativePath)
  if (!(await exists(absolute))) {
    targetStates.push({ path: relativePath, exists: false })
    continue
  }
  const fileStat = await stat(absolute)
  if (fileStat.isDirectory()) {
    targetStates.push({ path: relativePath, exists: true, kind: 'directory' })
    continue
  }
  const bytes = await readFile(absolute)
  const record = { path: relativePath, exists: true, kind: 'file', bytes: bytes.byteLength, sha256: sha256(bytes) }
  targetStates.push(record)
  const destination = path.join(payloadRoot, relativePath)
  await mkdir(path.dirname(destination), { recursive: true })
  await cp(absolute, destination)
}

const rehearsalRoot = await mkdtemp(path.join(tmpdir(), 'u05-media-viewer-recovery-'))
const findings = []
for (const record of targetStates.filter(({ kind }) => kind === 'file')) {
  const source = path.join(payloadRoot, record.path)
  const destination = path.join(rehearsalRoot, record.path)
  await mkdir(path.dirname(destination), { recursive: true })
  await cp(source, destination)
  const restored = await readFile(destination)
  if (restored.byteLength !== record.bytes || sha256(restored) !== record.sha256) findings.push({ code: 'U05-REC-HASH', target: record.path })
}
await rm(rehearsalRoot, { recursive: true, force: true })

const packageLock = await readFile(path.join(root, 'package-lock.json'))
const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'))
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
process.stdout.write(`${JSON.stringify({ targetCount: targetStates.length, capturedFileCount: targetStates.filter(({ kind }) => kind === 'file').length, absentStateCount: targetStates.filter(({ exists: present }) => !present).length, findings, canProceed: manifest.canProceed }, null, 2)}\n`)
if (!manifest.canProceed) process.exitCode = 1
