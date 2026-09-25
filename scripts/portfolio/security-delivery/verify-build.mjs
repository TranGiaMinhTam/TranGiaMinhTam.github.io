import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { printReport, root, writeReport } from './reports.mjs'

const dist = path.join(root, 'dist')
const manifest = JSON.parse(await readFile(path.join(dist, '.vite/manifest.json'), 'utf8'))
const entry = Object.entries(manifest).find(([, record]) => record.isEntry)
if (!entry) throw new Error('U06_BUILD_ENTRY_MISSING')
const initialFiles = new Set(['index.html'])
const visit = (key) => {
  const record = manifest[key]
  if (!record) return
  initialFiles.add(record.file)
  for (const css of record.css ?? []) initialFiles.add(css)
  for (const imported of record.imports ?? []) if (!initialFiles.has(manifest[imported]?.file)) visit(imported)
}
visit(entry[0])
const sizeOf = async (relativePath) => (await stat(path.join(dist, relativePath))).size
const initialJavascript = [...initialFiles].filter((file) => file.endsWith('.js'))
const initialCss = [...initialFiles].filter((file) => file.endsWith('.css'))
const javascriptBytes = (await Promise.all(initialJavascript.map(sizeOf))).reduce((sum, bytes) => sum + bytes, 0)
const cssBytes = (await Promise.all(initialCss.map(sizeOf))).reduce((sum, bytes) => sum + bytes, 0)
const viewerFiles = [...new Set(Object.entries(manifest).filter(([key, record]) => key.includes('media-viewer/') || record.src?.includes('media-viewer/')).map(([, record]) => record.file).filter((file) => file.endsWith('.js') && !initialFiles.has(file)))]
const lazyViewerJavascriptBytes = (await Promise.all(viewerFiles.map(sizeOf))).reduce((sum, bytes) => sum + bytes, 0)
const initialRequestCount = initialJavascript.length + initialCss.length + 1
const indexHtml = await readFile(path.join(dist, 'index.html'), 'utf8')
const initialBundle = (await Promise.all([...initialFiles].filter((file) => file.endsWith('.js') || file.endsWith('.html')).map((file) => readFile(path.join(dist, file), 'utf8')))).join('\n')
const findings = []
if (javascriptBytes > 360448) findings.push({ code: 'U06-BUDGET-JAVASCRIPT', severity: 'blocking', observed: javascriptBytes, limit: 360448 })
if (cssBytes > 71680) findings.push({ code: 'U06-BUDGET-CSS', severity: 'blocking', observed: cssBytes, limit: 71680 })
if (lazyViewerJavascriptBytes > 32768) findings.push({ code: 'U06-BUDGET-LAZY-VIEWER', severity: 'blocking', observed: lazyViewerJavascriptBytes, limit: 32768 })
if (initialRequestCount > 3) findings.push({ code: 'U06-BUDGET-INITIAL-REQUESTS', severity: 'blocking', observed: initialRequestCount, limit: 3 })
if (/src\/assets\/minh-tam\/source|\.heic|\.docx/iu.test(initialBundle)) findings.push({ code: 'U06-EAGER-SOURCE-ASSET', severity: 'blocking' })
if (/\/Users\/|[A-Za-z]:\\/u.test(initialBundle)) findings.push({ code: 'U06-BUILD-ABSOLUTE-PATH', severity: 'blocking' })
if (!/<div id="root"><\/div>/u.test(indexHtml)) findings.push({ code: 'U06-BUILD-ROOT-MISSING', severity: 'blocking' })

const duplicateFiles = []
const walk = async (directory) => {
  for (const entryValue of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entryValue.name)
    if (entryValue.isDirectory()) await walk(target)
    else if (/(?:_new|_modified| copy)\.[^.]+$/iu.test(entryValue.name)) duplicateFiles.push(path.relative(root, target))
  }
}
await walk(path.join(root, 'src'))
if (duplicateFiles.length > 0) findings.push({ code: 'U06-DUPLICATE-REPLACEMENT-FILE', severity: 'blocking', targets: duplicateFiles })
const report = await writeReport('build-request-integrity.json', { schemaVersion: 1, initialFiles: [...initialFiles].sort(), initialJavascript, initialCss, viewerFiles, totals: { javascriptBytes, cssBytes, lazyViewerJavascriptBytes, initialRequestCount }, duplicateFiles, findings, passed: findings.length === 0 })
printReport(report)
if (!report.passed) process.exitCode = 1
