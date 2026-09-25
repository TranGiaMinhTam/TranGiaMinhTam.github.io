import { spawn } from 'node:child_process'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { printReport, root, writeReport } from './reports.mjs'

const lock = JSON.parse(await readFile(path.join(root, 'package-lock.json'), 'utf8'))
const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'))
const findings = []
const unexpectedSources = []
for (const [packagePath, metadata] of Object.entries(lock.packages ?? {})) {
  if (!packagePath || !metadata.resolved) continue
  let resolved
  try { resolved = new URL(metadata.resolved) } catch { unexpectedSources.push({ packagePath, resolved: 'invalid-url' }); continue }
  if (resolved.protocol !== 'https:' || resolved.hostname !== 'registry.npmjs.org') unexpectedSources.push({ packagePath, resolved: `${resolved.protocol}//${resolved.hostname}` })
}
if (unexpectedSources.length > 0) findings.push({ code: 'U06-DEPENDENCY-UNTRUSTED-SOURCE', severity: 'blocking', count: unexpectedSources.length })

const sourceFiles = []
const collect = async (directory) => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.git', 'artifacts', '.aidlc-recovery'].includes(entry.name)) continue
    const target = path.join(directory, entry.name)
    if (entry.isDirectory()) await collect(target)
    else if (/\.(?:[cm]?[jt]sx?|json|css|mjs)$/u.test(entry.name)) sourceFiles.push(target)
  }
}
for (const directory of ['src', 'scripts']) await collect(path.join(root, directory))
for (const filename of ['vite.config.ts', 'eslint.config.js', 'package.json']) sourceFiles.push(path.join(root, filename))
const corpus = (await Promise.all(sourceFiles.map((filename) => readFile(filename, 'utf8').catch(() => '')))).join('\n')
const declared = { ...(packageJson.dependencies ?? {}), ...(packageJson.devDependencies ?? {}) }
const unusedCandidates = Object.keys(declared).filter((name) => !corpus.includes(name))

const runAudit = (args) => new Promise((resolve) => {
  const child = spawn('npm', ['audit', ...args, '--json'], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] })
  let stdout = ''
  let stderr = ''
  child.stdout.on('data', (chunk) => { stdout += chunk })
  child.stderr.on('data', (chunk) => { stderr += chunk })
  child.on('error', (error) => resolve({ available: false, error: error.code ?? 'spawn-error' }))
  child.on('close', (code) => {
    try { resolve({ available: true, exitCode: code, result: JSON.parse(stdout) }) }
    catch { resolve({ available: false, error: stderr.trim() || 'invalid-audit-output' }) }
  })
})
const [productionAudit, allAudit] = await Promise.all([runAudit(['--omit=dev']), runAudit([])])
const productionVulnerabilities = productionAudit.available ? productionAudit.result.metadata?.vulnerabilities ?? {} : null
const allVulnerabilities = allAudit.available ? allAudit.result.metadata?.vulnerabilities ?? {} : null
if (!productionAudit.available || !allAudit.available) findings.push({ code: 'U06-DEPENDENCY-AUDIT-UNAVAILABLE', severity: 'blocking' })
if ((productionVulnerabilities?.critical ?? 0) > 0 || (productionVulnerabilities?.high ?? 0) > 0) findings.push({ code: 'U06-PRODUCTION-DEPENDENCY-HIGH-VULNERABILITY', severity: 'blocking', vulnerabilities: productionVulnerabilities })

const report = await writeReport('dependency-assessment.json', {
  schemaVersion: 1,
  node: process.version,
  npm: process.env.npm_config_user_agent ?? 'npm-cli',
  packageCount: Object.keys(lock.packages ?? {}).length - 1,
  trustedSources: unexpectedSources.length === 0,
  unexpectedSources,
  unusedCandidates,
  unusedReviewNote: 'Candidates require explicit build/config/script/CSS reconciliation and are not deletion authority.',
  productionAudit,
  allDependencyAudit: allAudit,
  productionVulnerabilities,
  allVulnerabilities,
  developmentClassification: {
    reachability: 'Build, lint, and test tooling is not shipped as browser runtime code.',
    exploitability: 'CI consumes repository-controlled inputs; local development servers must not be exposed to untrusted networks.',
    owner: 'Portfolio maintainer',
    remediation: 'Update affected development toolchains under a separately reviewed lockfile change; do not suppress advisories.',
  },
  findings,
  passed: findings.length === 0,
})
printReport(report)
if (!report.passed) process.exitCode = 1
