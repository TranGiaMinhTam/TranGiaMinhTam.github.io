import { readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const activeMode = process.argv.includes('--active')
const phase = activeMode ? 'active' : 'candidate'
const dist = activeMode ? path.join(root, 'dist') : '/private/tmp/portfolio-u04-complete-archive-candidate-dist'
const evidenceRoot = path.join(root, 'artifacts/portfolio/u04-complete-archive')
const manifest = JSON.parse(await readFile(path.join(dist, '.vite/manifest.json'), 'utf8'))
const baseline = JSON.parse(await readFile(path.join(evidenceRoot, 'baseline.json'), 'utf8'))
const entries = Object.entries(manifest)
const entry = entries.find(([, record]) => record.isEntry)
if (!entry) throw new Error('U04A_MEASURE_ENTRY_MISSING')
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
const fileBytes = async (files, suffix) => (await Promise.all([...files].filter((file) => file.endsWith(suffix)).map(async (file) => (await stat(path.join(dist, file))).size))).reduce((sum, value) => sum + value, 0)
const initialFiles = collect(entry[0])
const javascriptBytes = await fileBytes(initialFiles, '.js')
const cssBytes = await fileBytes(initialFiles, '.css')
const groupEntries = entries.filter(([key, record]) => key.includes('/generated/groups/') || record.src?.includes('/generated/groups/'))
const groups = await Promise.all(groupEntries.map(async ([key, record]) => {
  const incrementalFiles = collect(key)
  for (const file of initialFiles) incrementalFiles.delete(file)
  return {
    id: path.basename(key, path.extname(key)),
    javascriptBytes: await fileBytes(incrementalFiles, '.js'),
    emittedAssetCount: (record.assets ?? []).length,
  }
}))
const budgets = { javascriptBytes: 327680, cssBytes: 61440, javascriptRegressionPercent: 8, cssRegressionPercent: 12, groupJavascriptBytes: 24576 }
const findings = []
if (javascriptBytes > budgets.javascriptBytes || javascriptBytes > baseline.entryGraph.javascript.bytes * 1.08) findings.push({ code: 'U04A-PER-JS', target: 'initial-javascript' })
if (cssBytes > budgets.cssBytes || cssBytes > baseline.entryGraph.css.bytes * 1.12) findings.push({ code: 'U04A-PER-CSS', target: 'initial-css' })
if (groupEntries.length !== 6) findings.push({ code: 'U04A-PER-GROUP-COUNT', target: '.vite/manifest.json' })
for (const group of groups) if (group.javascriptBytes > budgets.groupJavascriptBytes) findings.push({ code: 'U04A-PER-GROUP-JS', target: group.id })
if ([...initialFiles].some((file) => /\.(?:pdf|jpe?g|png|webp|heic|docx)$/iu.test(file))) findings.push({ code: 'U04A-PER-EAGER-ORIGINAL', target: 'initial-entry-graph' })
const report = {
  schemaVersion: 1,
  phase,
  baseline: baseline.entryGraph,
  candidate: { javascriptBytes, cssBytes, initialRequestCount: initialFiles.size + 1, initialFiles: [...initialFiles].sort() },
  groups: groups.sort((left, right) => left.id.localeCompare(right.id)),
  budgets,
  findings,
  canProceed: findings.length === 0,
}
await writeFile(path.join(evidenceRoot, `${phase}-measurement.json`), `${JSON.stringify(report, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
if (!report.canProceed) process.exitCode = 1
