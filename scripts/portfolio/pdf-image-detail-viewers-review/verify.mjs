import { readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const active = process.argv.includes('--active')
const candidate = process.argv.includes('--candidate')
const phase = active ? 'active' : candidate ? 'candidate' : 'source'
const dist = active ? path.join(root, 'dist') : '/private/tmp/portfolio-u05-media-viewers-candidate-dist'
const evidenceRoot = path.join(root, 'artifacts/portfolio/u05-media-viewers')
const findings = []
const manifestSource = await readFile(path.join(root, 'src/portfolio/model/evidenceManifest.ts'), 'utf8')
const sourceModel = await readFile(path.join(root, 'src/portfolio/model/verifiedPortfolioSource.ts'), 'utf8')
const researchCatalog = await readFile(path.join(root, 'src/portfolio/research/projectCatalog.ts'), 'utf8')

if (!/dockingConferencePoster[\s\S]*IMG_4208\.JPG/u.test(manifestSource)) findings.push({ code: 'U05-INT-PRIMARY-IMAGE', target: 'evidenceManifest.ts' })
if (!/\['evidence-protein-docking-publication', 'evidence-docking-conference-poster'\]/u.test(sourceModel)) findings.push({ code: 'U05-INT-PROJECT-EVIDENCE', target: 'verifiedPortfolioSource.ts' })
const dockingGeometryCount = [...researchCatalog.matchAll(/'evidence-docking-[^']+':/gu)].length
if (dockingGeometryCount !== 5) findings.push({ code: 'U05-INT-SCIENTIFIC-IMAGE-COUNT', target: 'projectCatalog.ts', actual: dockingGeometryCount })
for (const file of ['7381606024551.jpg', 'IMG_4206.JPG', 'IMG_4207.JPG', 'IMG_4208.JPG', 'IMG_4213.JPG']) {
  await stat(path.join(root, 'src/assets/minh-tam/source/Science research /2026 Protein Docking', file)).catch(() => findings.push({ code: 'U05-INT-SOURCE-IMAGE', target: file }))
}

let requestReport = { checked: false }
if (candidate || active) {
  const manifest = JSON.parse(await readFile(path.join(dist, '.vite/manifest.json'), 'utf8'))
  const entries = Object.entries(manifest)
  const entry = entries.find(([, record]) => record.isEntry)
  const lazyBodies = entries.filter(([key, record]) => /(?:PdfViewerBody|ImageViewerBody|MediaFailureBody)/u.test(`${key} ${record.src ?? ''}`))
  if (!entry) findings.push({ code: 'U05-REQ-ENTRY', target: '.vite/manifest.json' })
  if (lazyBodies.length !== 3) findings.push({ code: 'U05-REQ-LAZY-BODIES', target: '.vite/manifest.json', actual: lazyBodies.length })
  const initial = entry ? [entry[1].file, ...(entry[1].css ?? [])] : []
  if (initial.some((file) => /\.(?:pdf|jpe?g|png|webp|heic)$/iu.test(file))) findings.push({ code: 'U05-REQ-EAGER-MEDIA', target: 'initial-entry' })
  requestReport = { checked: true, lazyBodyCount: lazyBodies.length, initialFiles: initial }
}
const report = { schemaVersion: 1, phase, dockingGeometryCount, requestReport, findings, canProceed: findings.length === 0 }
await writeFile(path.join(evidenceRoot, `${phase}-integrity-request.json`), `${JSON.stringify(report, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
if (!report.canProceed) process.exitCode = 1
