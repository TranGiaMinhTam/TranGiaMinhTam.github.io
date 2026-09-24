import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const phase = process.argv.includes('--active') ? 'active' : process.argv.includes('--candidate') ? 'candidate' : 'source'
const evidenceRoot = path.join(root, 'artifacts/portfolio/u05-media-viewers')
const governed = [
  'src/portfolio/media-viewer/mediaCapability.ts',
  'src/portfolio/media-viewer/MediaViewerContext.tsx',
  'src/portfolio/media-viewer/MediaViewerHost.tsx',
  'src/portfolio/academics/AcademicEvidenceAction.tsx',
  'src/portfolio/research/ResearchEvidenceAction.tsx',
  'src/portfolio/shared/EvidenceAction.tsx',
  'src/portfolio/resume/ResumeAction.tsx',
]
const findings = []
for (const relative of governed) {
  const source = await readFile(path.join(root, relative), 'utf8')
  if (/javascript:|data:text\/html|http:\/\//iu.test(source)) findings.push({ code: 'U05-BND-UNSAFE-SCHEME', target: relative })
  if (/from ['"](?:react-pdf|pdfjs-dist|@react-pdf|.*modal.*)['"]/iu.test(source)) findings.push({ code: 'U05-BND-DEPENDENCY', target: relative })
}
const app = await readFile(path.join(root, 'src/App.tsx'), 'utf8')
const candidate = await readFile(path.join(root, 'scripts/portfolio/pdf-image-detail-viewers-candidate/main.tsx'), 'utf8').catch(() => '')
const appProviders = (app.match(/<MediaViewerProvider\b/gu) ?? []).length
const candidateProviders = (candidate.match(/<MediaViewerProvider\b/gu) ?? []).length
if (phase === 'source' && appProviders !== 0) findings.push({ code: 'U05-BND-EARLY-ACTIVATION', target: 'src/App.tsx' })
if (phase === 'candidate' && candidateProviders !== 1) findings.push({ code: 'U05-BND-HOST-COUNT', target: 'candidate/main.tsx' })
if (phase === 'active' && appProviders !== 1) findings.push({ code: 'U05-BND-HOST-COUNT', target: 'src/App.tsx' })
const report = { schemaVersion: 1, phase, appProviders, candidateProviders, findings, canProceed: findings.length === 0 }
await writeFile(path.join(evidenceRoot, `${phase}-boundary.json`), `${JSON.stringify(report, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
if (!report.canProceed) process.exitCode = 1
