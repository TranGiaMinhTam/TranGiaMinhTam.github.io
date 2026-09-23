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

const preflight = JSON.parse(read('artifacts/portfolio/u06/preflight.json'))
const recovery = JSON.parse(read('artifacts/portfolio/u06/active-registration-recovery.json'))
const packageJson = JSON.parse(read('package.json'))
const impactFiles = [
  'impact.types.ts', 'toolLinkingTable.ts', 'toolsFieldworkModel.ts',
  'ToolContextLink.tsx', 'ClassificationMarker.tsx', 'ToolClassificationSummary.tsx',
  'ActivityRecordCard.tsx', 'ActivitySummary.tsx', 'MethodsAndTools.tsx',
  'FieldworkAndLeadership.tsx', 'ToolsFieldwork.module.css', 'sectionBodies.tsx', 'index.ts',
].map((name) => `src/portfolio/impact/${name}`)

for (const target of impactFiles) if (!exists(target)) add('U06-FILE-001', target, 'Required U-06 source file is missing.')
if (sha256('package-lock.json') !== preflight.dependencies.lockfileSha256) add('U06-DEP-001', 'package-lock.json', 'Dependency lockfile changed during U-06.')
if (hashValue(packageJson.dependencies) !== preflight.dependencies.dependencyDeclarationsSha256) add('U06-DEP-002', 'package.json', 'Runtime dependency declarations changed during U-06.')
if (hashValue(packageJson.devDependencies) !== preflight.dependencies.devDependencyDeclarationsSha256) add('U06-DEP-003', 'package.json', 'Development dependency declarations changed during U-06.')

const source = impactFiles.filter(exists).map(read).join('\n')
for (const [code, pattern, message] of [
  ['U06-BND-001', /from\s+['"][^'"]*(?:\/data\/|templates\/|@chakra-ui|tailwindcss)/, 'Legacy data or rejected presentation import detected.'],
  ['U06-BND-002', /from\s+['"][^'"]*(?:\/identity\/|\/research\/|\/academics\/|\/contact\/|\/journal\/)/, 'Another presentation-domain import detected.'],
  ['U06-SEC-001', /dangerouslySetInnerHTML|<foreignObject|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/, 'Unsafe markup or runtime network surface detected.'],
  ['U06-EVD-001', /assets\/minh-tam\//, 'U-06 directly references a published or raw asset.'],
  ['U06-REL-001', /(?:awards|gallery|videos)\.ts|components\/Awards|journalPosts|wordpress(?:\.com)?|nham\s+hung/i, 'Excluded legacy or former-owner content is reachable from U-06 source.'],
  ['U06-REL-002', /\b(?:rating|proficiency|stars?|score)\b/i, 'Invented rating vocabulary is present in production U-06 source.'],
]) if (pattern.test(source)) add(code, 'src/portfolio/impact', message)

const bodies = exists('src/portfolio/impact/sectionBodies.tsx') ? read('src/portfolio/impact/sectionBodies.tsx') : ''
const bodyKeys = [...bodies.matchAll(/^\s{2}'?(tools|fieldwork-leadership)'?:/gm)].map((match) => match[1])
if (bodyKeys.join(',') !== 'tools,fieldwork-leadership') add('U06-OWN-001', 'src/portfolio/impact/sectionBodies.tsx', 'Expected exactly the two approved U-06 body registrations.')

for (const [target, expected] of Object.entries({
  'src/data/awards.ts': 'eaa49a9aea1da82569d537c05fd84a31284d32ff35e979538427e47f2f946c3b',
  'src/data/gallery.ts': '035f71dc6641b6c992aa13c16ac9de087bcadde9ab1211a752384327105d67c4',
  'src/data/videos.ts': 'd13f4308f1052b97867803c703d90bdc869982ea26d3b4e75cfb3b305343f643',
  'src/components/Awards.tsx': '0b09a521d0c512e0bff4dc4d82975fc6717733a6ce4389e10167c969ac77985c',
})) if (!exists(target) || sha256(target) !== expected) add('U06-BND-003', target, 'Excluded legacy file changed during U-06.')

if (phase === 'source' || phase === 'candidate') {
  if (sha256('src/App.tsx') !== preflight.activeEntry.sha256) add('U06-GATE-001', 'src/App.tsx', 'Live body registration changed before candidate approval.')
  if (sha256(preflight.approvedRegistry.path) !== preflight.approvedRegistry.sha256) add('U06-GATE-002', preflight.approvedRegistry.path, 'Approved U-05 registry changed during U-06 candidate work.')
  if (read(recovery.path) !== recovery.content) add('U06-GATE-003', recovery.path, 'Live entry no longer matches exact recovery content.')
}

if (phase === 'candidate') {
  for (const target of [
    'scripts/portfolio/tools-fieldwork-candidate/index.html',
    'scripts/portfolio/tools-fieldwork-candidate/main.tsx',
    'scripts/portfolio/tools-fieldwork-candidate/vite.config.mjs',
  ]) if (!exists(target)) add('U06-CAN-001', target, 'Candidate harness file is missing.')
  const entry = exists('scripts/portfolio/tools-fieldwork-candidate/main.tsx') ? read('scripts/portfolio/tools-fieldwork-candidate/main.tsx') : ''
  for (const registry of ['identityQuestionBodyRegistry', 'researchDataBodyRegistry', 'academicEvidenceBodyRegistry', 'toolsFieldworkBodyRegistry', 'composePortfolioBodyRegistries']) {
    if (!entry.includes(registry)) add('U06-CAN-002', 'scripts/portfolio/tools-fieldwork-candidate/main.tsx', `Candidate is missing ${registry}.`)
  }
  const candidate = exists('artifacts/portfolio/u06/candidate.json') ? JSON.parse(read('artifacts/portfolio/u06/candidate.json')) : undefined
  const baseline = exists('artifacts/portfolio/u06/measurement-baseline-full.json') ? JSON.parse(read('artifacts/portfolio/u06/measurement-baseline-full.json')) : undefined
  if (!candidate) add('U06-CAN-003', 'artifacts/portfolio/u06/candidate.json', 'Candidate measurement is missing.')
  if (candidate && candidate.totals.javascriptBytes > 285000) add('U06-PER-001', 'candidate manifest', 'Candidate JavaScript exceeds 285,000 bytes.')
  if (candidate && candidate.totals.javascriptBytes > 268491 * 1.08) add('U06-PER-001', 'candidate manifest', 'Candidate JavaScript exceeds 8-percent growth from U-05.')
  if (candidate && candidate.totals.cssBytes > 46080) add('U06-PER-002', 'candidate manifest', 'Candidate CSS exceeds 46,080 bytes.')
  if (candidate && baseline && candidate.totals.evidenceAssetBytes !== baseline.totals.evidenceAssetBytes) add('U06-PER-003', 'candidate manifest', 'U-06 changed the inherited evidence-asset byte inventory.')
}

if (phase === 'active') {
  const app = read('src/App.tsx')
  if (!app.includes('toolsFieldworkBodyRegistry') || !app.includes('composePortfolioBodyRegistries')) add('U06-ACT-001', 'src/App.tsx', 'Approved U-06 composed registry is not active.')
  const decision = exists('artifacts/portfolio/u06/candidate-decision.json') ? JSON.parse(read('artifacts/portfolio/u06/candidate-decision.json')) : undefined
  if (!decision?.canActivate) add('U06-GATE-004', 'artifacts/portfolio/u06/candidate-decision.json', 'Explicit candidate activation approval is missing.')
}

findings.sort((left, right) => left.code.localeCompare(right.code) || left.target.localeCompare(right.target))
const report = {
  schemaVersion: 1,
  check: 'tools-fieldwork',
  phase,
  expectedImpactFileCount: impactFiles.length,
  bodyKeys,
  u06EvidenceBytes: 0,
  findings,
  counts: { errors: findings.length, warnings: 0 },
  canProceed: findings.length === 0,
}
console.log(JSON.stringify(report, null, 2))
process.exitCode = report.canProceed ? 0 : 1
