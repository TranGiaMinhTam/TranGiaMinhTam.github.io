import { createHash } from 'node:crypto'
import { cp, mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const exec = promisify(execFile)
const root = process.cwd()
const recoveryRoot = path.join(root, '.aidlc-recovery/masthead-theme-responsive-alignment')
const payloadRoot = path.join(recoveryRoot, 'payload')
const evidenceRoot = path.join(root, 'artifacts/portfolio/u02-masthead-alignment')

const targets = [
  'src/portfolio/shell/shell.types.ts',
  'src/portfolio/shell/PortfolioExperience.tsx',
  'src/portfolio/shell/ObservatoryShell.tsx',
  'src/portfolio/shell/SpecimenMasthead.tsx',
  'src/portfolio/shell/ThemeControl.tsx',
  'src/portfolio/shell/Shell.module.css',
  'src/portfolio/styles/tokens.css',
  'src/portfolio/index.ts',
  'src/portfolio/identity/RelationshipSummary.tsx',
  'src/portfolio/identity/IdentityQuestions.module.css',
  'src/portfolio/identity/ResearchQuestions.tsx',
  'src/portfolio/research/ResearchRelationshipSummary.tsx',
  'src/portfolio/research/ResearchData.module.css',
  'src/portfolio/research/LaboratoryResearch.tsx',
  'src/portfolio/research/ComputationalProjects.tsx',
  'src/portfolio/research/DataStories.tsx',
  'src/portfolio/academics/AcademicRelationshipSummary.tsx',
  'src/portfolio/academics/AcademicEvidence.module.css',
  'src/portfolio/academics/AcademicTrajectory.tsx',
  'src/portfolio/academics/EvidenceCountSummary.tsx',
  'src/portfolio/visualization/AccessibleDataSummary.tsx',
  'package.json',
  '.github/workflows/deploy.yml',
  'vite.config.ts',
  'scripts/portfolio/check-boundaries.mjs',
]

const plannedNewTargets = [
  'src/portfolio/shared/semanticSummary.types.ts',
  'src/portfolio/shared/semanticSummaryModel.ts',
  'src/portfolio/shared/SemanticSummary.tsx',
  'src/portfolio/shared/SemanticSummary.module.css',
  'src/portfolio/shell/mastheadModel.ts',
  'scripts/portfolio/masthead-alignment-candidate/index.html',
  'scripts/portfolio/masthead-alignment-candidate/main.tsx',
  'scripts/portfolio/masthead-alignment-candidate/vite.config.mjs',
]

const sha256 = (value) => createHash('sha256').update(value).digest('hex')
const fileExists = async (filePath) => stat(filePath).then(() => true, () => false)

const relativeFileRecord = async (relativePath) => {
  const absolutePath = path.join(root, relativePath)
  if (!(await fileExists(absolutePath))) return { path: relativePath, exists: false }
  const bytes = await readFile(absolutePath)
  return { path: relativePath, exists: true, bytes: bytes.byteLength, sha256: sha256(bytes) }
}

await mkdir(payloadRoot, { recursive: true })
await mkdir(evidenceRoot, { recursive: true })

const records = []
for (const relativePath of [...targets, ...plannedNewTargets]) {
  const record = await relativeFileRecord(relativePath)
  records.push(record)
  if (!record.exists) continue
  const destination = path.join(payloadRoot, relativePath)
  await mkdir(path.dirname(destination), { recursive: true })
  await cp(path.join(root, relativePath), destination)
}

const { stdout: trackedDiff } = await exec('git', ['diff', '--binary', '--', ...targets], {
  cwd: root,
  maxBuffer: 16 * 1024 * 1024,
})
await writeFile(path.join(recoveryRoot, 'tracked-targets.patch'), trackedDiff)

const rehearsalRoot = await mkdtemp(path.join(tmpdir(), 'u02-recovery-'))
const rehearsalFindings = []
for (const record of records.filter(({ exists }) => exists)) {
  const source = path.join(payloadRoot, record.path)
  const destination = path.join(rehearsalRoot, record.path)
  await mkdir(path.dirname(destination), { recursive: true })
  await cp(source, destination)
  const restored = await readFile(destination)
  if (sha256(restored) !== record.sha256) rehearsalFindings.push({ code: 'U02-REC-HASH', target: record.path })
}
await rm(rehearsalRoot, { recursive: true, force: true })

const resume = await relativeFileRecord('src/assets/documents/Tran-Gia-Minh-Tam-Resume.pdf')
const protectedManifest = await relativeFileRecord('.aidlc-recovery/source-governance-safe-foundation/protected-archive-sha256.txt')
const manifest = {
  schemaVersion: 1,
  targetCount: records.length,
  existingTargetCount: records.filter(({ exists }) => exists).length,
  absentTargetCount: records.filter(({ exists }) => !exists).length,
  targetStates: records,
  trackedDiff: { path: 'tracked-targets.patch', bytes: Buffer.byteLength(trackedDiff), sha256: sha256(trackedDiff) },
  protectedSources: { resume, protectedManifest },
  restoration: { isolated: true, findings: rehearsalFindings, passed: rehearsalFindings.length === 0 },
  canProceed: rehearsalFindings.length === 0 && resume.exists && protectedManifest.exists,
}
await writeFile(path.join(recoveryRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
await writeFile(path.join(evidenceRoot, 'recovery-preflight.json'), `${JSON.stringify(manifest, null, 2)}\n`)

if (!manifest.canProceed) {
  process.stderr.write('U-02 recovery preflight failed.\n')
  process.exitCode = 1
} else {
  process.stdout.write(`U-02 recovery preflight passed (${manifest.existingTargetCount} captured, ${manifest.absentTargetCount} absence states).\n`)
}
