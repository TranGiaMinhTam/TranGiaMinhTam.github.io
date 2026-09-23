import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const argument = (name, fallback) => {
  const index = process.argv.indexOf(name)
  return index >= 0 ? process.argv[index + 1] : fallback
}
const phase = argument('--phase', 'source')
const read = (target) => fs.readFileSync(path.join(root, target), 'utf8')
const exists = (target) => fs.existsSync(path.join(root, target))
const sha256 = (target) => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, target))).digest('hex')
const findings = []
const add = (code, target, message) => findings.push({ code, severity: 'error', target, message })

const preflight = JSON.parse(read('artifacts/portfolio/u03/preflight.json'))
const identityFiles = [
  'identity.types.ts', 'disciplineCatalog.ts', 'identityQuestionsModel.ts', 'ResearchIdentity.tsx',
  'PortraitAperture.tsx', 'ExplorationSpectrum.tsx', 'IdentityActions.tsx', 'ResearchQuestions.tsx',
  'QuestionLedger.tsx', 'QuestionConstellation.tsx', 'RelationshipSummary.tsx',
  'IdentityQuestions.module.css', 'sectionBodies.tsx', 'index.ts',
].map((name) => `src/portfolio/identity/${name}`)

for (const target of [...identityFiles, 'src/portfolio/shell/SectionBodyResolver.tsx']) {
  if (!exists(target)) add('U03-FILE-001', target, 'Required U-03 file is missing.')
}
if (sha256('package-lock.json') !== preflight.dependencies.lockfileSha256) add('U03-DEP-001', 'package-lock.json', 'Dependency lockfile changed during U-03.')
if (fs.statSync(path.join(root, 'src/assets/minh-tam/profile_pic.jpg')).size > 1265478) add('U03-PER-003', 'profile_pic.jpg', 'Portrait exceeds the approved source size.')
if (fs.statSync(path.join(root, 'src/assets/minh-tam/certificates/academic-transcript.pdf')).size !== 6817646) add('U03-EVD-001', 'academic-transcript.pdf', 'Transcript differs from the preflight evidence.')

const identitySource = identityFiles.filter(exists).map(read).join('\n')
for (const [code, pattern, message] of [
  ['U03-BND-001', /from\s+['"][^'"]*(?:\/data\/|templates\/|@chakra-ui|tailwindcss)/, 'Legacy data or rejected presentation import detected.'],
  ['U03-SEC-001', /dangerouslySetInnerHTML|<foreignObject|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/, 'Unsafe markup or runtime network surface detected.'],
  ['U03-SEC-002', /\b(?:javascript|data):/i, 'Unsafe URL scheme detected.'],
  ['U03-BND-002', /portfolio\/(?:research|academic|tools|fieldwork|contact|journal)\//, 'Later-domain presentation import detected.'],
]) if (pattern.test(identitySource)) add(code, 'src/portfolio/identity', message)

const bodies = exists('src/portfolio/identity/sectionBodies.tsx') ? read('src/portfolio/identity/sectionBodies.tsx') : ''
const bodyKeys = [...bodies.matchAll(/^\s{2}(identity|questions):/gm)].map((match) => match[1])
if (bodyKeys.join(',') !== 'identity,questions') add('U03-OWN-001', 'src/portfolio/identity/sectionBodies.tsx', 'Body registry must contain exactly identity and questions.')
if (!/width=\{portrait\.width\}[\s\S]*height=\{portrait\.height\}[\s\S]*loading="eager"[\s\S]*decoding="async"/.test(identitySource)) add('U03-PER-004', 'PortraitAperture.tsx', 'Portrait loading and geometry attributes are incomplete.')
if (/rel=["']preload["']|<object|<embed/.test(identitySource)) add('U03-PER-005', 'src/portfolio/identity', 'Transcript or evidence preload surface detected.')

if (phase === 'source' || phase === 'candidate') {
  if (sha256('src/App.tsx') !== preflight.activeEntry.appSha256) add('U03-GATE-001', 'src/App.tsx', 'Live body registration changed before candidate approval.')
}
if (phase === 'candidate') {
  const candidate = exists('artifacts/portfolio/u03/candidate.json') ? JSON.parse(read('artifacts/portfolio/u03/candidate.json')) : undefined
  if (!candidate) add('U03-CAN-001', 'artifacts/portfolio/u03/candidate.json', 'Candidate measurement is missing.')
  if (candidate && (candidate.totals.javascriptBytes > 256000 || candidate.totals.cssBytes > 24576)) add('U03-PER-001', 'candidate manifest', 'Candidate exceeds a U-03 initial-code budget.')
  if (candidate && candidate.totals.javascriptBytes > preflight.baselineBuild.javascriptBytes * 1.1) add('U03-PER-002', 'candidate manifest', 'Candidate JavaScript regressed more than ten percent from U-02.')
}
if (phase === 'active') {
  const app = read('src/App.tsx')
  const identityRegistryIsDirect = app.includes('sectionBodies={identityQuestionBodyRegistry}')
  const identityRegistryIsComposed =
    app.includes('composePortfolioBodyRegistries') &&
    app.includes('composePortfolioBodyRegistries(\n  identityQuestionBodyRegistry,') &&
    /sectionBodies=\{[A-Za-z][A-Za-z0-9]*BodyRegistry\}/.test(app)
  if (!app.includes('identityQuestionBodyRegistry') || (!identityRegistryIsDirect && !identityRegistryIsComposed)) add('U03-ACT-001', 'src/App.tsx', 'Approved U-03 body registry is not active.')
  const decision = exists('artifacts/portfolio/u03/candidate-decision.json') ? JSON.parse(read('artifacts/portfolio/u03/candidate-decision.json')) : undefined
  if (!decision?.canActivate) add('U03-GATE-002', 'candidate-decision.json', 'Explicit candidate activation approval is missing.')
}

findings.sort((left, right) => left.code.localeCompare(right.code) || left.target.localeCompare(right.target))
const report = {
  schemaVersion: 1,
  check: 'identity-questions',
  phase,
  expectedIdentityFileCount: identityFiles.length,
  bodyKeys,
  portraitBytes: fs.statSync(path.join(root, 'src/assets/minh-tam/profile_pic.jpg')).size,
  transcriptBytes: fs.statSync(path.join(root, 'src/assets/minh-tam/certificates/academic-transcript.pdf')).size,
  findings,
  counts: { errors: findings.length, warnings: 0 },
  canProceed: findings.length === 0,
}
console.log(JSON.stringify(report, null, 2))
process.exitCode = report.canProceed ? 0 : 1
