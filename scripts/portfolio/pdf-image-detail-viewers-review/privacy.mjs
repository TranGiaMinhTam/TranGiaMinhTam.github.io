import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const evidenceRoot = path.join(root, 'artifacts/portfolio/u05-media-viewers')
const files = [
  'src/portfolio/media-viewer/MediaFailureBody.tsx',
  'src/portfolio/media-viewer/mediaCapability.ts',
  'src/portfolio/academics/AcademicEvidenceAction.tsx',
  'src/portfolio/research/ResearchEvidenceAction.tsx',
  'src/portfolio/resume/ResumeAction.tsx',
]
const findings = []
for (const relative of files) {
  const source = await readFile(path.join(root, relative), 'utf8')
  if (/Users\/|\\Users\\|stack trace|exception details|verified source|resume-sourced/iu.test(source)) findings.push({ code: 'U05-PRV-INTERNAL-COPY', target: relative })
}
const report = { schemaVersion: 1, scannedFileCount: files.length, findings, canProceed: findings.length === 0 }
await writeFile(path.join(evidenceRoot, 'privacy-verification.json'), `${JSON.stringify(report, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
if (!report.canProceed) process.exitCode = 1
