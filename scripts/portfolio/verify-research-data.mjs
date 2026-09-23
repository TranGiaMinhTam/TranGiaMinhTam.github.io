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

const preflight = JSON.parse(read('artifacts/portfolio/u04/preflight.json'))
const recovery = JSON.parse(read('artifacts/portfolio/u04/active-registration-recovery.json'))
const packageJson = JSON.parse(read('package.json'))
const researchFiles = [
  'research.types.ts', 'projectCatalog.ts', 'researchDataModel.ts', 'ResearchEvidenceAction.tsx',
  'ResearchFigure.tsx', 'ResearchRelationshipSummary.tsx', 'ContributionStatus.tsx',
  'PublicationStatus.tsx', 'ComputationalProjects.tsx', 'LaboratoryResearch.tsx', 'DataStories.tsx',
  'ResearchData.module.css', 'sectionBodies.tsx', 'index.ts',
].map((name) => `src/portfolio/research/${name}`)

for (const target of researchFiles) if (!exists(target)) add('U04-FILE-001', target, 'Required U-04 source file is missing.')
if (sha256('package-lock.json') !== preflight.dependencies.lockfileSha256) add('U04-DEP-001', 'package-lock.json', 'Dependency lockfile changed during U-04.')
if (hashValue(packageJson.dependencies) !== preflight.dependencies.dependencyDeclarationsSha256) add('U04-DEP-002', 'package.json', 'Runtime dependency declarations changed during U-04.')
if (hashValue(packageJson.devDependencies) !== preflight.dependencies.devDependencyDeclarationsSha256) add('U04-DEP-003', 'package.json', 'Development dependency declarations changed during U-04.')

const source = researchFiles.filter(exists).map(read).join('\n')
for (const [code, pattern, message] of [
  ['U04-BND-001', /from\s+['"][^'"]*(?:\/data\/|templates\/|@chakra-ui|tailwindcss)/, 'Legacy data or rejected presentation import detected.'],
  ['U04-BND-002', /from\s+['"][^'"]*(?:\/identity\/|\/academics\/|\/impact\/|\/contact\/|\/journal\/)/, 'Earlier or later presentation-domain import detected.'],
  ['U04-SEC-001', /dangerouslySetInnerHTML|<foreignObject|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/, 'Unsafe markup or runtime network surface detected.'],
  ['U04-SEC-002', /\b(?:javascript|data):/i, 'Unsafe destination scheme detected.'],
  ['U04-EVD-001', /assets\/minh-tam\/source\//, 'Raw source evidence is referenced.'],
  ['U04-REL-003', /journalPosts|first-local-journal|wordpress(?:\.com)?|nham\s+hung/i, 'Former-owner writing is reachable from U-04 source.'],
]) if (pattern.test(source)) add(code, 'src/portfolio/research', message)

const bodies = exists('src/portfolio/research/sectionBodies.tsx') ? read('src/portfolio/research/sectionBodies.tsx') : ''
const bodyKeys = [...bodies.matchAll(/^\s{2}'(computational-projects|laboratory-research|data-stories)':/gm)].map((match) => match[1])
if (bodyKeys.join(',') !== 'computational-projects,laboratory-research,data-stories') add('U04-OWN-001', 'src/portfolio/research/sectionBodies.tsx', 'Expected exactly the three approved U-04 body registrations.')
if (!/loading="lazy"[\s\S]*decoding="async"/.test(source)) add('U04-PER-003', 'ResearchFigure.tsx', 'Figure loading attributes are incomplete.')
if (/<(?:object|embed|iframe)|rel=["'](?:preload|prefetch)["']/.test(source)) add('U04-PER-004', 'src/portfolio/research', 'Automatic evidence loading surface detected.')

const assetExpectations = [
  ['src/assets/minh-tam/projects/molecular-docking.jpg', 255505],
  ['src/assets/minh-tam/projects/cashew-polyphenol.jpg', 164808],
  ['src/assets/minh-tam/projects/data-analytics.jpg', 831243],
  ['src/assets/minh-tam/certificates/protein-docking-research.pdf', 3490329],
  ['src/assets/minh-tam/certificates/wico-poster.pdf', 7702179],
  ['src/assets/minh-tam/certificates/sim-lse-certificate.pdf', 51969],
]
for (const [target, bytes] of assetExpectations) {
  if (!exists(target) || fs.statSync(resolve(target)).size !== bytes) add('U04-EVD-002', target, `Expected exact approved asset size ${bytes}.`)
}

if (phase === 'source' || phase === 'candidate') {
  if (sha256('src/App.tsx') !== preflight.activeEntry.appSha256) add('U04-GATE-001', 'src/App.tsx', 'Live body registration changed before candidate approval.')
  if (sha256(recovery.dependentRegistry.path) !== recovery.dependentRegistry.expectedSha256) add('U04-GATE-002', recovery.dependentRegistry.path, 'Approved U-03 registry changed during U-04 candidate work.')
}

if (phase === 'candidate') {
  for (const target of [
    'scripts/portfolio/research-candidate/index.html',
    'scripts/portfolio/research-candidate/main.tsx',
    'scripts/portfolio/research-candidate/vite.config.mjs',
  ]) if (!exists(target)) add('U04-CAN-001', target, 'Candidate harness file is missing.')
  const candidateEntry = exists('scripts/portfolio/research-candidate/main.tsx') ? read('scripts/portfolio/research-candidate/main.tsx') : ''
  if (!/identityQuestionBodyRegistry/.test(candidateEntry) || !/researchDataBodyRegistry/.test(candidateEntry) || !/composePortfolioBodyRegistries/.test(candidateEntry)) add('U04-CAN-002', 'scripts/portfolio/research-candidate/main.tsx', 'Candidate does not compose approved U-03 and U-04 registries.')
  const candidate = exists('artifacts/portfolio/u04/candidate.json') ? JSON.parse(read('artifacts/portfolio/u04/candidate.json')) : undefined
  if (!candidate) add('U04-CAN-003', 'artifacts/portfolio/u04/candidate.json', 'Candidate measurement is missing.')
  if (candidate && candidate.totals.javascriptBytes > 250000) add('U04-PER-001', 'candidate manifest', 'Candidate JavaScript exceeds 250,000 bytes.')
  if (candidate && candidate.totals.javascriptBytes > 223999 * 1.12) add('U04-PER-001', 'candidate manifest', 'Candidate JavaScript exceeds 12-percent growth from U-03.')
  if (candidate && candidate.totals.cssBytes > 30720) add('U04-PER-002', 'candidate manifest', 'Candidate CSS exceeds 30,720 bytes.')
}

if (phase === 'active') {
  const app = read('src/App.tsx')
  if (!app.includes('researchDataBodyRegistry') || !app.includes('composePortfolioBodyRegistries')) add('U04-ACT-001', 'src/App.tsx', 'Approved U-04 composed registry is not active.')
  const decision = exists('artifacts/portfolio/u04/candidate-decision.json') ? JSON.parse(read('artifacts/portfolio/u04/candidate-decision.json')) : undefined
  if (!decision?.canActivate) add('U04-GATE-003', 'artifacts/portfolio/u04/candidate-decision.json', 'Explicit candidate activation approval is missing.')
}

findings.sort((left, right) => left.code.localeCompare(right.code) || left.target.localeCompare(right.target))
const report = {
  schemaVersion: 1,
  check: 'research-data',
  phase,
  expectedResearchFileCount: researchFiles.length,
  bodyKeys,
  figureBytes: assetExpectations.slice(0, 3).reduce((sum, [, bytes]) => sum + bytes, 0),
  documentBytes: assetExpectations.slice(3).reduce((sum, [, bytes]) => sum + bytes, 0),
  findings,
  counts: { errors: findings.length, warnings: 0 },
  canProceed: findings.length === 0,
}
console.log(JSON.stringify(report, null, 2))
process.exitCode = report.canProceed ? 0 : 1
