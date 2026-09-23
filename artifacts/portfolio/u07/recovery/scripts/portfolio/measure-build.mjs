import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const root = process.cwd()
const argument = (name, fallback) => {
  const index = process.argv.indexOf(name)
  return index >= 0 ? process.argv[index + 1] : fallback
}
const dist = path.resolve(root, argument('--dist', 'dist'))
const baselinePath = path.resolve(root, argument('--baseline', 'artifacts/portfolio/u01/baseline.json'))
const outputValue = argument('--output')
const outputPath = outputValue ? path.resolve(root, outputValue) : undefined
const javascriptBudget = Number(argument('--javascript-budget', '460800'))
const cssBudget = Number(argument('--css-budget', '76800'))
const regressionPercent = Number(argument('--regression-percent', '10'))
const javascriptRegressionPercent = Number(argument('--javascript-regression-percent', String(regressionPercent)))
const cssRegressionValue = argument('--css-regression-percent', String(regressionPercent))
const cssRegressionPercent = cssRegressionValue === 'none' ? undefined : Number(cssRegressionValue)
const manifestPath = path.join(dist, '.vite/manifest.json')

if (!fs.existsSync(manifestPath)) throw new Error('Missing dist/.vite/manifest.json; run npm run build first.')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'))
const entry = Object.values(manifest).find((item) => item.isEntry)
if (!entry) throw new Error('Vite manifest has no entry record.')

const initial = new Set([entry.file, ...(entry.css ?? [])])
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((item) => {
  const resolved = path.join(directory, item.name)
  return item.isDirectory() ? walk(resolved) : [resolved]
})
const artifacts = walk(dist).map((file) => {
  const relative = path.relative(dist, file).replaceAll('\\', '/')
  const bytes = fs.readFileSync(file)
  const isInitial = initial.has(relative) || relative === 'index.html'
  const category = isInitial && relative.endsWith('.js') ? 'initial-javascript'
    : isInitial && relative.endsWith('.css') ? 'initial-css'
      : isInitial ? 'other-initial'
        : /\.(?:pdf|png|jpe?g|webp|avif)$/i.test(relative) ? 'evidence-asset'
          : relative.endsWith('.js') ? 'lazy-javascript' : 'other-deployable'
  return { path: relative, category, initial: isInitial, bytes: bytes.length, gzipBytes: zlib.gzipSync(bytes, { level: 9, mtime: 0 }).length }
}).sort((a, b) => a.path.localeCompare(b.path))

const total = (category) => artifacts.filter((item) => item.category === category).reduce((sum, item) => sum + item.bytes, 0)
const javascriptBytes = total('initial-javascript')
const cssBytes = total('initial-css')
const baselineJs = baseline.entryGraph.javascript.bytes
const baselineCss = baseline.entryGraph.css.bytes
const percent = (current, previous) => previous === 0 ? (current === 0 ? 0 : null) : Number((((current - previous) / previous) * 100).toFixed(4))
const findings = []
if (javascriptBytes > javascriptBudget) findings.push({ code: 'PER-001', severity: 'error', target: 'initial-javascript', message: `Initial JavaScript exceeds ${javascriptBudget.toLocaleString('en-US')} bytes.` })
if (cssBytes > cssBudget) findings.push({ code: 'PER-002', severity: 'error', target: 'initial-css', message: `Initial CSS exceeds ${cssBudget.toLocaleString('en-US')} bytes.` })
if (javascriptBytes > baselineJs * (1 + javascriptRegressionPercent / 100)) findings.push({ code: 'PER-004', severity: 'error', target: 'initial-javascript', message: `Initial JavaScript regressed by more than ${javascriptRegressionPercent} percent.` })
if (cssRegressionPercent !== undefined && cssBytes > baselineCss * (1 + cssRegressionPercent / 100)) findings.push({ code: 'PER-004', severity: 'error', target: 'initial-css', message: `Initial CSS regressed by more than ${cssRegressionPercent} percent.` })
const report = {
  schemaVersion: 1, measuredAt: new Date().toISOString(), manifest: '.vite/manifest.json', artifacts,
  totals: { javascriptBytes, cssBytes, otherInitialBytes: total('other-initial'), evidenceAssetBytes: total('evidence-asset'), deployableBytes: artifacts.reduce((sum, item) => sum + item.bytes, 0) },
  budgets: { javascriptBytes: javascriptBudget, cssBytes: cssBudget, javascriptRegressionPercent, cssRegressionPercent: cssRegressionPercent ?? 'not-applicable' },
  comparison: { baselineJavascriptBytes: baselineJs, baselineCssBytes: baselineCss, javascriptChangePercent: percent(javascriptBytes, baselineJs), cssChangePercent: percent(cssBytes, baselineCss) },
  findings, absoluteBudgetsPass: findings.every((item) => !['PER-001', 'PER-002'].includes(item.code)), noRegression: findings.every((item) => item.code !== 'PER-004'),
}
const serialized = `${JSON.stringify(report, null, 2)}\n`
if (outputPath) fs.writeFileSync(outputPath, serialized)
console.log(serialized.trimEnd())
process.exitCode = findings.length === 0 ? 0 : 1
