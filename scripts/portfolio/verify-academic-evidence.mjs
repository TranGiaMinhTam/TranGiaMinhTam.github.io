import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const argument = (name, fallback) => {
  const index = process.argv.indexOf(name)
  return index >= 0 ? process.argv[index + 1] : fallback
}
const phase = argument('--phase', 'source')
const resolve = (target) => path.join(root, target)
const exists = (target) => fs.existsSync(resolve(target))
const read = (target) => fs.readFileSync(resolve(target), 'utf8')
const sha256 = (target) => crypto.createHash('sha256').update(fs.readFileSync(resolve(target))).digest('hex')
const hashValue = (value) => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex')
const findings = []
const add = (code, target, message) => findings.push({ code, severity: 'error', target, message })

const preflight = JSON.parse(read('artifacts/portfolio/u05/preflight.json'))
const recovery = JSON.parse(read('artifacts/portfolio/u05/active-registration-recovery.json'))
const packageJson = JSON.parse(read('package.json'))
const academicFiles = [
  'academic.types.ts', 'academicEvidenceCatalog.ts', 'academicEvidenceModel.ts',
  'AcademicEvidenceAction.tsx', 'TextDocumentPreview.tsx', 'LazyEvidenceImage.tsx',
  'AcademicStatus.tsx', 'EvidenceCountSummary.tsx', 'AcademicRelationshipSummary.tsx',
  'AcademicTrajectory.tsx', 'EvidenceLibrary.tsx', 'AcademicEvidence.module.css',
  'sectionBodies.tsx', 'index.ts',
].map((name) => `src/portfolio/academics/${name}`)

for (const target of academicFiles) if (!exists(target)) add('U05-FILE-001', target, 'Required U-05 source file is missing.')
if (sha256('package-lock.json') !== preflight.dependencies.lockfileSha256) add('U05-DEP-001', 'package-lock.json', 'Dependency lockfile changed during U-05.')
if (hashValue(packageJson.dependencies) !== preflight.dependencies.dependencyDeclarationsSha256) add('U05-DEP-002', 'package.json', 'Runtime dependency declarations changed during U-05.')
if (hashValue(packageJson.devDependencies) !== preflight.dependencies.devDependencyDeclarationsSha256) add('U05-DEP-003', 'package.json', 'Development dependency declarations changed during U-05.')

const source = academicFiles.filter(exists).map(read).join('\n')
for (const [code, pattern, message] of [
  ['U05-BND-001', /from\s+['"][^'"]*(?:\/data\/|templates\/|@chakra-ui|tailwindcss)/, 'Legacy data or rejected presentation import detected.'],
  ['U05-BND-002', /from\s+['"][^'"]*(?:\/identity\/|\/research\/|\/impact\/|\/contact\/|\/journal\/)/, 'Earlier or later presentation-domain import detected.'],
  ['U05-SEC-001', /dangerouslySetInnerHTML|<foreignObject|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/, 'Unsafe markup or runtime network surface detected.'],
  ['U05-EVD-001', /assets\/minh-tam\/source\//, 'Raw source evidence is referenced.'],
  ['U05-REL-003', /journalPosts|first-local-journal|wordpress(?:\.com)?|nham\s+hung/i, 'Former-owner writing is reachable from U-05 source.'],
]) if (pattern.test(source)) add(code, 'src/portfolio/academics', message)

const bodies = exists('src/portfolio/academics/sectionBodies.tsx') ? read('src/portfolio/academics/sectionBodies.tsx') : ''
const bodyKeys = [...bodies.matchAll(/^\s{2}'(academic-trajectory|evidence-library)':/gm)].map((match) => match[1])
if (bodyKeys.join(',') !== 'academic-trajectory,evidence-library') add('U05-OWN-001', 'src/portfolio/academics/sectionBodies.tsx', 'Expected exactly the two approved U-05 body registrations.')
if (!/loading="lazy"[\s\S]*decoding="async"/.test(source)) add('U05-PER-004', 'LazyEvidenceImage.tsx', 'Image loading attributes are incomplete.')
if (/<(?:object|embed|iframe)|rel=["'](?:preload|prefetch)["']/.test(source)) add('U05-PER-003', 'src/portfolio/academics', 'Automatic document loading surface detected.')
if (!/evidence-profile-portrait/.test(source) && /download\s+(?:the\s+)?cv/i.test(source)) add('U05-REL-003', 'src/portfolio/academics', 'Pending CV is presented as published evidence.')

const assetExpectations = [
  ['src/assets/minh-tam/certificates/academic-transcript.pdf', 6817646],
  ['src/assets/minh-tam/certificates/borsworth-scholarship.pdf', 786452],
  ['src/assets/minh-tam/certificates/worthgate-scholarship.pdf', 918299],
  ['src/assets/minh-tam/certificates/gys-brochure.pdf', 3099234],
  ['src/assets/minh-tam/certificates/protein-docking-research.pdf', 3490329],
  ['src/assets/minh-tam/certificates/sim-lse-certificate.pdf', 51969],
  ['src/assets/minh-tam/certificates/wico-poster.pdf', 7702179],
  ['src/assets/minh-tam/projects/molecular-docking.jpg', 255505],
  ['src/assets/minh-tam/projects/cashew-polyphenol.jpg', 164808],
  ['src/assets/minh-tam/projects/data-analytics.jpg', 831243],
]
for (const [target, bytes] of assetExpectations) {
  if (!exists(target) || fs.statSync(resolve(target)).size !== bytes) add('U05-EVD-002', target, `Expected exact approved asset size ${bytes}.`)
}

if (phase === 'source' || phase === 'candidate') {
  if (sha256('src/App.tsx') !== preflight.activeEntry.sha256) add('U05-GATE-001', 'src/App.tsx', 'Live body registration changed before candidate approval.')
  if (sha256(preflight.approvedRegistry.path) !== preflight.approvedRegistry.sha256) add('U05-GATE-002', preflight.approvedRegistry.path, 'Approved U-04 registry changed during U-05 candidate work.')
  if (read(recovery.path) !== recovery.content) add('U05-GATE-003', recovery.path, 'Live entry no longer matches the exact recovery content.')
}

if (phase === 'candidate') {
  for (const target of [
    'scripts/portfolio/academic-candidate/index.html',
    'scripts/portfolio/academic-candidate/main.tsx',
    'scripts/portfolio/academic-candidate/vite.config.mjs',
  ]) if (!exists(target)) add('U05-CAN-001', target, 'Candidate harness file is missing.')
  const entry = exists('scripts/portfolio/academic-candidate/main.tsx') ? read('scripts/portfolio/academic-candidate/main.tsx') : ''
  if (!/identityQuestionBodyRegistry/.test(entry) || !/researchDataBodyRegistry/.test(entry) || !/academicEvidenceBodyRegistry/.test(entry) || !/composePortfolioBodyRegistries/.test(entry)) add('U05-CAN-002', 'scripts/portfolio/academic-candidate/main.tsx', 'Candidate does not compose all approved registries.')
  const candidate = exists('artifacts/portfolio/u05/candidate.json') ? JSON.parse(read('artifacts/portfolio/u05/candidate.json')) : undefined
  if (!candidate) add('U05-CAN-003', 'artifacts/portfolio/u05/candidate.json', 'Candidate measurement is missing.')
  if (candidate && candidate.totals.javascriptBytes > 274000) add('U05-PER-001', 'candidate manifest', 'Candidate JavaScript exceeds 274,000 bytes.')
  if (candidate && candidate.totals.javascriptBytes > 249238 * 1.1) add('U05-PER-001', 'candidate manifest', 'Candidate JavaScript exceeds 10-percent growth from U-04.')
  if (candidate && candidate.totals.cssBytes > 43008) add('U05-PER-002', 'candidate manifest', 'Candidate CSS exceeds 43,008 bytes.')
}

if (phase === 'active') {
  const app = read('src/App.tsx')
  if (!app.includes('academicEvidenceBodyRegistry') || !app.includes('composePortfolioBodyRegistries')) add('U05-ACT-001', 'src/App.tsx', 'Approved U-05 composed registry is not active.')
  const decision = exists('artifacts/portfolio/u05/candidate-decision.json') ? JSON.parse(read('artifacts/portfolio/u05/candidate-decision.json')) : undefined
  if (!decision?.canActivate) add('U05-GATE-004', 'artifacts/portfolio/u05/candidate-decision.json', 'Explicit candidate activation approval is missing.')
}

findings.sort((left, right) => left.code.localeCompare(right.code) || left.target.localeCompare(right.target))
const report = {
  schemaVersion: 1,
  check: 'academic-evidence',
  phase,
  expectedAcademicFileCount: academicFiles.length,
  bodyKeys,
  documentBytes: assetExpectations.slice(0, 7).reduce((sum, [, bytes]) => sum + bytes, 0),
  imageBytes: assetExpectations.slice(7).reduce((sum, [, bytes]) => sum + bytes, 0),
  findings,
  counts: { errors: findings.length, warnings: 0 },
  canProceed: findings.length === 0,
}
console.log(JSON.stringify(report, null, 2))
process.exitCode = report.canProceed ? 0 : 1
