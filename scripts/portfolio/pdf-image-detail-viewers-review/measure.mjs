import { readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const active = process.argv.includes('--active')
const baselineMode = process.argv.includes('--baseline')
const phase = baselineMode ? 'baseline' : active ? 'active' : 'candidate'
const dist = baselineMode ? '/private/tmp/portfolio-u05-media-viewers-active-baseline-dist' : active ? path.join(root, 'dist') : '/private/tmp/portfolio-u05-media-viewers-candidate-dist'
const evidenceRoot = path.join(root, 'artifacts/portfolio/u05-media-viewers')
const manifest = JSON.parse(await readFile(path.join(dist, '.vite/manifest.json'), 'utf8'))
const entries = Object.entries(manifest)
const entry = entries.find(([, record]) => record.isEntry)
if (!entry) throw new Error('U05_MEASURE_ENTRY_MISSING')

const collect = (key, files = new Set(), visited = new Set()) => {
  if (visited.has(key)) return files
  visited.add(key)
  const record = manifest[key]
  if (!record) return files
  files.add(record.file)
  for (const css of record.css ?? []) files.add(css)
  for (const imported of record.imports ?? []) collect(imported, files, visited)
  return files
}
const bytesFor = async (files, suffix) => (await Promise.all([...files].filter((file) => file.endsWith(suffix)).map(async (file) => (await stat(path.join(dist, file))).size))).reduce((sum, value) => sum + value, 0)
const initialFiles = collect(entry[0])
const viewerEntries = entries.filter(([key, record]) => /(?:PdfViewerBody|ImageViewerBody|MediaFailureBody)/u.test(`${key} ${record.src ?? ''}`))
const lazyFiles = new Set(viewerEntries.flatMap(([, record]) => [record.file, ...(record.css ?? [])]))
const measurement = {
  javascriptBytes: await bytesFor(initialFiles, '.js'),
  cssBytes: await bytesFor(initialFiles, '.css'),
  initialRequestCount: initialFiles.size + 1,
  lazyViewerJavascriptBytes: await bytesFor(lazyFiles, '.js'),
  lazyViewerRequestCount: lazyFiles.size,
  initialFiles: [...initialFiles].sort(),
  lazyFiles: [...lazyFiles].sort(),
}
const findings = []
if (measurement.javascriptBytes > 360448) findings.push({ code: 'U05-PER-JS-CEILING', target: 'initial-javascript' })
if (measurement.cssBytes > 71680) findings.push({ code: 'U05-PER-CSS-CEILING', target: 'initial-css' })
if (measurement.lazyViewerJavascriptBytes > 32768) findings.push({ code: 'U05-PER-LAZY-CEILING', target: 'viewer-lazy-javascript' })
if (!baselineMode) {
  const baseline = JSON.parse(await readFile(path.join(evidenceRoot, 'baseline-measurement.json'), 'utf8'))
  if (measurement.javascriptBytes > baseline.measurement.javascriptBytes * 1.08) findings.push({ code: 'U05-PER-JS-REGRESSION', target: 'initial-javascript' })
  if (measurement.cssBytes > baseline.measurement.cssBytes * 1.15) findings.push({ code: 'U05-PER-CSS-REGRESSION', target: 'initial-css' })
}
const report = { schemaVersion: 1, phase, measurement, budgets: { javascriptBytes: 360448, cssBytes: 71680, lazyViewerJavascriptBytes: 32768, javascriptRegressionPercent: 8, cssRegressionPercent: 15 }, findings, canProceed: findings.length === 0 }
await writeFile(path.join(evidenceRoot, `${phase}-measurement.json`), `${JSON.stringify(report, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
if (!report.canProceed) process.exitCode = 1
