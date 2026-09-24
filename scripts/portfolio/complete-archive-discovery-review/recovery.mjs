import { createHash } from 'node:crypto'
import { execFile } from 'node:child_process'
import { cp, mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'

const exec = promisify(execFile)
const root = process.cwd()
const recoveryRoot = path.join(root, '.aidlc-recovery/complete-archive-discovery')
const payloadRoot = path.join(recoveryRoot, 'payload')
const evidenceRoot = path.join(root, 'artifacts/portfolio/u04-complete-archive')

const existingTargets = [
  'src/portfolio/archive/archive.types.ts',
  'src/portfolio/archive/archiveAliases.ts',
  'src/portfolio/archive/archiveMetadata.ts',
  'src/portfolio/archive/archiveModel.ts',
  'src/portfolio/archive/archiveModel.test.ts',
  'src/portfolio/archive/generated/archive-manifest.json',
  'src/portfolio/archive/index.ts',
  'src/portfolio/archive/mediaSourcePolicy.ts',
  'src/portfolio/archive/mediaSourcePolicy.test.ts',
  'src/portfolio/academics/academic.types.ts',
  'src/portfolio/academics/academicEvidenceCatalog.ts',
  'src/portfolio/academics/academicEvidenceCatalog.test.ts',
  'src/portfolio/academics/academicEvidenceModel.ts',
  'src/portfolio/academics/academicEvidenceModel.test.ts',
  'src/portfolio/academics/EvidenceLibrary.tsx',
  'src/portfolio/academics/AcademicEvidence.module.css',
  'src/portfolio/academics/sectionBodies.tsx',
  'src/portfolio/contact/ContactSignal.tsx',
  'src/portfolio/contact/ContactSignal.test.tsx',
  'src/portfolio/contact/Contact.module.css',
  'src/portfolio/contact/contactModel.ts',
  'src/portfolio/contact/contactModel.test.ts',
  'src/portfolio/contact/contactStyles.test.ts',
  'src/portfolio/research/ComputationalProjects.tsx',
  'src/portfolio/research/projectCatalog.ts',
  'src/portfolio/research/projectCatalog.test.ts',
  'src/portfolio/model/evidenceManifest.ts',
  'src/portfolio/resume/resumeClaims.ts',
  'src/data/research.ts',
  'src/data/projects.ts',
  'src/data/certificates.ts',
  'src/App.tsx',
  'src/App.test.tsx',
  'src/portfolio/boundaries.test.ts',
  'src/portfolio/sourceGovernanceBoundaries.test.ts',
  'scripts/portfolio/check-boundaries.mjs',
  'package.json',
  'package-lock.json',
]

const proteinImages = [
  '7381606024551.jpg',
  'IMG_4206.JPG',
  'IMG_4207.JPG',
  'IMG_4208.JPG',
  'IMG_4213.JPG',
]
const sourceProteinRoot = 'src/assets/minh-tam/source/Science research /2026 Protein Docking'
const deletedProteinRoot = 'src/assets/minh-tam/gallery/2026 Protein Docking'

const plannedNewTargets = [
  'src/portfolio/archive/archiveEligibility.ts',
  'src/portfolio/archive/archiveDiscoveryModel.ts',
  'src/portfolio/archive/archiveGroupLoaders.ts',
  'src/portfolio/archive/archiveGroups.ts',
  'src/portfolio/archive/ArchiveExplorer.tsx',
  'src/portfolio/archive/ArchiveGroup.tsx',
  'src/portfolio/archive/ArchiveCards.tsx',
  'src/portfolio/archive/ArchiveExplorer.module.css',
  'src/portfolio/archive/generated/groups',
  'scripts/portfolio/complete-archive-discovery-candidate/index.html',
  'scripts/portfolio/complete-archive-discovery-candidate/main.tsx',
  'scripts/portfolio/complete-archive-discovery-candidate/vite.config.mjs',
  ...proteinImages.map((name) => `${sourceProteinRoot}/${name}`),
]
const deletedDuplicateTargets = proteinImages.map((name) => `${deletedProteinRoot}/${name}`)

const sha256 = (value) => createHash('sha256').update(value).digest('hex')
const exists = async (filePath) => stat(filePath).then(() => true, () => false)
const recordFor = async (relativePath) => {
  const absolute = path.join(root, relativePath)
  if (!(await exists(absolute))) return { path: relativePath, exists: false }
  const fileStat = await stat(absolute)
  if (fileStat.isDirectory()) return { path: relativePath, exists: true, kind: 'directory' }
  const bytes = await readFile(absolute)
  return { path: relativePath, exists: true, kind: 'file', bytes: bytes.byteLength, sha256: sha256(bytes) }
}

await mkdir(payloadRoot, { recursive: true })
await mkdir(evidenceRoot, { recursive: true })

const targets = [...existingTargets, ...plannedNewTargets, ...deletedDuplicateTargets]
const records = []
for (const relativePath of targets) {
  const record = await recordFor(relativePath)
  records.push(record)
  if (!record.exists || record.kind !== 'file') continue
  const destination = path.join(payloadRoot, relativePath)
  await mkdir(path.dirname(destination), { recursive: true })
  await cp(path.join(root, relativePath), destination)
}

const { stdout: trackedDiff } = await exec('git', ['diff', '--binary', '--', ...existingTargets, ...deletedDuplicateTargets], {
  cwd: root,
  maxBuffer: 64 * 1024 * 1024,
})
await writeFile(path.join(recoveryRoot, 'tracked-targets.patch'), trackedDiff)

const rehearsalRoot = await mkdtemp(path.join(tmpdir(), 'u04-recovery-'))
const findings = []
for (const record of records.filter(({ exists, kind }) => exists && kind === 'file')) {
  const source = path.join(payloadRoot, record.path)
  const destination = path.join(rehearsalRoot, record.path)
  await mkdir(path.dirname(destination), { recursive: true })
  await cp(source, destination)
  const restored = await readFile(destination)
  if (restored.byteLength !== record.bytes || sha256(restored) !== record.sha256) {
    findings.push({ code: 'U04-REC-HASH', target: record.path })
  }
}
await rm(rehearsalRoot, { recursive: true, force: true })

const gitBlobs = []
for (const name of proteinImages) {
  const oldPath = `${deletedProteinRoot}/${name}`
  try {
    await exec('git', ['cat-file', '-e', `HEAD:${oldPath}`], { cwd: root })
    gitBlobs.push({ path: oldPath, available: true })
  } catch {
    gitBlobs.push({ path: oldPath, available: false })
    findings.push({ code: 'U04-REC-GIT-BLOB', target: oldPath })
  }
}

const publicationPath = `${sourceProteinRoot}/Kỷ yếu hội nghị khoa học kỹ thuật Dược lần thứ 42 năm 2026 (extracted).pdf`
const publication = await recordFor(publicationPath)
if (!publication.exists || publication.sha256 !== 'dcc1b81a83eb9d3b10e6b9dc36c4452735e34f4f93db16355a2c782bf1669e74') {
  findings.push({ code: 'U04-REC-PUBLICATION', target: publicationPath })
}

const manifest = {
  schemaVersion: 1,
  targetCount: records.length,
  existingFileCount: records.filter(({ exists, kind }) => exists && kind === 'file').length,
  existingDirectoryCount: records.filter(({ exists, kind }) => exists && kind === 'directory').length,
  absentStateCount: records.filter(({ exists }) => !exists).length,
  targetStates: records,
  trackedDiff: {
    path: 'tracked-targets.patch',
    bytes: Buffer.byteLength(trackedDiff),
    sha256: sha256(trackedDiff),
  },
  proteinDocking: {
    sourcePublication: publication,
    deletedDuplicateFolderPreservedAbsent: !(await exists(path.join(root, deletedProteinRoot))),
    recoverableImageBlobs: gitBlobs,
  },
  restoration: { isolated: true, findings, passed: findings.length === 0 },
  canProceed: findings.length === 0,
}

await writeFile(path.join(recoveryRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
await writeFile(path.join(evidenceRoot, 'recovery-preflight.json'), `${JSON.stringify(manifest, null, 2)}\n`)
process.stdout.write(`${JSON.stringify({ targetCount: manifest.targetCount, existingFileCount: manifest.existingFileCount, absentStateCount: manifest.absentStateCount, proteinImageBlobs: gitBlobs.length, findings, canProceed: manifest.canProceed }, null, 2)}\n`)
if (!manifest.canProceed) process.exitCode = 1
