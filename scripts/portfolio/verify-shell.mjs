import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const phaseIndex = process.argv.indexOf('--phase')
const phase = phaseIndex >= 0 ? process.argv[phaseIndex + 1] : 'candidate'
const findings = []
const add = (code, target, message) => findings.push({ code, severity: 'error', target, message })
const read = (target) => fs.readFileSync(path.join(root, target), 'utf8')
const sha256 = (target) => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, target))).digest('hex')

const expectedShellFiles = [
  'index.ts', 'shell.types.ts', 'sectionHash.ts', 'visibility.ts', 'progress.ts', 'theme.ts',
  'shellReducer.ts', 'browserAdapters.ts', 'useSectionProgress.ts', 'usePortfolioTheme.ts',
  'PortfolioExperience.tsx', 'ObservatoryShell.tsx', 'SpecimenMasthead.tsx', 'LocusNavigator.tsx',
  'SectionProgress.tsx', 'ThemeControl.tsx', 'RegisteredSectionSlot.tsx', 'ObservatoryFooter.tsx',
  'Shell.module.css',
].map((name) => `src/portfolio/shell/${name}`)

for (const target of expectedShellFiles) if (!fs.existsSync(path.join(root, target))) add('U02-FILE-001', target, 'Required shell file is missing.')

const preSwitch = JSON.parse(read('artifacts/portfolio/u02/pre-switch.json'))
if (sha256('package-lock.json') !== preSwitch.dependencies.lockfileSha256) add('U02-DEP-001', 'package-lock.json', 'Dependency lockfile changed during U-02.')
const registry = read('src/portfolio/model/sectionRegistry.ts')
const shell = read('src/portfolio/shell/ObservatoryShell.tsx')
const registryIds = [...registry.matchAll(/id: '([^']+)'/g)].map((match) => match[1])
if (registryIds.length !== 10) add('U02-REG-001', 'src/portfolio/model/sectionRegistry.ts', 'Expected exactly ten approved section definitions.')
if (!shell.includes('sectionRegistry.map')) add('U02-REG-002', 'src/portfolio/shell/ObservatoryShell.tsx', 'Shell does not render directly from the approved registry.')

const browserSource = expectedShellFiles.filter((target) => fs.existsSync(path.join(root, target))).map(read).join('\n')
for (const [code, pattern, message] of [
  ['U02-SEC-001', /\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/, 'Runtime network surface detected.'],
  ['U02-SEC-002', /dangerouslySetInnerHTML/, 'Unsafe HTML rendering detected.'],
  ['U02-BND-001', /(?:@chakra-ui|tailwindcss|templates\/|usePortfolioLayout|assets\/minh-tam\/source)/, 'Rejected or protected import detected.'],
]) if (pattern.test(browserSource)) add(code, 'src/portfolio/shell', message)

if (phase === 'active') {
  const active = `${read('src/App.tsx')}\n${read('src/main.tsx')}`
  if (!active.includes('PortfolioExperience')) add('U02-ACT-001', 'src/App.tsx', 'PortfolioExperience is not active.')
  if (/(?:Provider|App\.css|index\.css|getPortfolioTemplate|usePortfolioLayout)/.test(active)) add('U02-ACT-002', 'active-entry', 'Rejected active-entry composition remains reachable.')
}

if (phase === 'candidate') {
  for (const target of [
    'scripts/portfolio/candidate/index.html',
    'scripts/portfolio/candidate/main.tsx',
    'scripts/portfolio/candidate/vite.config.mjs',
  ]) if (!fs.existsSync(path.join(root, target))) add('U02-CAN-001', target, 'Candidate harness file is missing.')
  for (const [target, key] of [
    ['src/App.tsx', 'appSha256'],
    ['src/main.tsx', 'mainSha256'],
    ['index.html', 'htmlSha256'],
  ]) if (sha256(target) !== preSwitch.activeEntry[key]) add('U02-GATE-001', target, 'Active entry changed before candidate approval.')
}

findings.sort((left, right) => left.code.localeCompare(right.code) || left.target.localeCompare(right.target))
const report = {
  schemaVersion: 1,
  check: 'scientific-shell',
  phase,
  sectionCount: registryIds.length,
  expectedShellFileCount: expectedShellFiles.length,
  lockfileSha256: sha256('package-lock.json'),
  findings,
  counts: { errors: findings.length, warnings: 0 },
  canProceed: findings.length === 0,
}
console.log(JSON.stringify(report, null, 2))
process.exitCode = report.canProceed ? 0 : 1
