import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const dist = '/private/tmp/portfolio-u04-complete-archive-active-baseline-dist'
const manifest = JSON.parse(await readFile(path.join(dist, '.vite/manifest.json'), 'utf8'))
const entry = Object.entries(manifest).find(([, record]) => record.isEntry)
if (!entry) throw new Error('U04A_BASELINE_ENTRY_MISSING')
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
const files = [...collect(entry[0])]
const bytes = async (filter) => (await Promise.all(files.filter(filter).map(async (file) => (await stat(path.join(dist, file))).size))).reduce((sum, value) => sum + value, 0)
const report = {
  schemaVersion: 1,
  phase: 'active-before-u04-complete-archive',
  entryGraph: {
    javascript: { bytes: await bytes((file) => file.endsWith('.js')) },
    css: { bytes: await bytes((file) => file.endsWith('.css')) },
    initialRequestCount: files.length + 1,
  },
}
const output = path.join(root, 'artifacts/portfolio/u04-complete-archive/baseline.json')
await mkdir(path.dirname(output), { recursive: true })
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
