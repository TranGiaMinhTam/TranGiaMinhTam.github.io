import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const dist = '/private/tmp/portfolio-u03-resume-content-active-baseline-dist'
const manifest = JSON.parse(await readFile(path.join(dist, '.vite/manifest.json'), 'utf8'))
const entry = Object.values(manifest).find(({ isEntry }) => isEntry)
if (!entry) throw new Error('U03_BASELINE_ENTRY_MISSING')
const total = async (files) => (await Promise.all(files.map(async (file) => (await stat(path.join(dist, file))).size))).reduce((sum, value) => sum + value, 0)
const report = {
  schemaVersion: 1,
  phase: 'active-before-u03-resume-content',
  entryGraph: {
    javascript: { bytes: await total([entry.file]) },
    css: { bytes: await total(entry.css ?? []) },
    initialRequestCount: 3,
  },
}
const output = path.join(root, 'artifacts/portfolio/u03-resume-content/baseline.json')
await mkdir(path.dirname(output), { recursive: true })
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
