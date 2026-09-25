import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { printReport, root, writeReport } from './reports.mjs'

const findings = []
const evidenceDirectory = path.join(root, 'artifacts/portfolio/u06-security-delivery')
const evidenceFiles = (await readdir(evidenceDirectory, { withFileTypes: true })).filter((entry) => entry.isFile()).map((entry) => path.join(evidenceDirectory, entry.name))
const forbidden = [/\/Users\//u, /[A-Za-z]:\\/u, /(?:token|password|secret)\s*[:=]\s*["'][^"']+/iu, /\+?84[\s.-]?(?:\d[\s.-]?){8,10}/u]
for (const filename of evidenceFiles) {
  const text = await readFile(filename, 'utf8').catch(() => '')
  for (const pattern of forbidden) if (pattern.test(text)) findings.push({ code: 'U06-ARTIFACT-PRIVATE-CONTENT', severity: 'blocking', target: path.relative(root, filename), pattern: String(pattern) })
}

const catalog = JSON.parse(await readFile(path.join(root, 'artifacts/portfolio/source-governance/catalog-candidate.json'), 'utf8'))
for (const item of catalog.items ?? []) {
  for (const source of item.physicalSources ?? []) {
    const bytes = await readFile(path.join(root, source.relativePath)).catch(() => null)
    const actual = bytes ? createHash('sha256').update(bytes).digest('hex') : null
    if (actual !== source.sha256) findings.push({ code: 'U06-SOURCE-INTEGRITY', severity: 'blocking', target: source.relativePath })
  }
}
const resume = JSON.parse(await readFile(path.join(root, 'artifacts/portfolio/u03-resume-content/resume-authority.json'), 'utf8'))
const resumeBytes = await readFile(path.join(root, resume.canonicalBundled.relativePath)).catch(() => null)
if (!resumeBytes || createHash('sha256').update(resumeBytes).digest('hex') !== resume.canonicalBundled.sha256) findings.push({ code: 'U06-RESUME-INTEGRITY', severity: 'blocking', target: resume.canonicalBundled.relativePath })

const report = await writeReport('privacy-source-integrity.json', { schemaVersion: 1, scannedEvidenceFiles: evidenceFiles.length, canonicalSourceCount: (catalog.items ?? []).flatMap((item) => item.physicalSources ?? []).length, resumeAuthority: 'approved U-03 canonical bundle', resumeVerified: !findings.some(({ code }) => code === 'U06-RESUME-INTEGRITY'), findings, passed: findings.length === 0 })
printReport(report)
if (!report.passed) process.exitCode = 1
