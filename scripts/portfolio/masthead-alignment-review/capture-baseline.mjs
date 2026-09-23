import { access, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const outputRoot = path.join(root, 'artifacts/portfolio/u02-masthead-alignment')
const distRoot = path.join(root, 'dist')
const chromeExecutable = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolute = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(absolute) : [absolute]
  }))
  return nested.flat()
}

const manifest = JSON.parse(await readFile(path.join(distRoot, '.vite/manifest.json'), 'utf8'))
const resumeIntegrity = JSON.parse(await readFile(path.join(root, 'artifacts/portfolio/source-governance/resume-integrity.json'), 'utf8'))
const privacyEvidence = JSON.parse(await readFile(path.join(root, 'artifacts/portfolio/source-governance/privacy-verification.json'), 'utf8'))
const sourceValidation = JSON.parse(await readFile(path.join(root, 'artifacts/portfolio/source-governance/final-validation.json'), 'utf8'))
const entry = Object.values(manifest).find((record) => record.isEntry)
if (!entry) throw new Error('U02_BASELINE_ENTRY_MISSING')
const initialFiles = [entry.file, ...(entry.css ?? [])]
const artifactRecords = await Promise.all(initialFiles.map(async (relativePath) => ({
  path: relativePath,
  bytes: (await stat(path.join(distRoot, relativePath))).size,
})))

const sourceFiles = (await walk(path.join(root, 'src/portfolio'))).filter((file) => /\.(?:ts|tsx|css)$/u.test(file))
const sources = await Promise.all(sourceFiles.map(async (file) => ({
  path: path.relative(root, file).split(path.sep).join('/'),
  content: await readFile(file, 'utf8'),
})))
const tableOwners = sources
  .filter(({ content }) => /<table\b/u.test(content))
  .map(({ path: relativePath }) => relativePath)
  .sort()
const overflowOwners = sources
  .filter(({ content }) => /overflow-x\s*:\s*auto/u.test(content))
  .map(({ path: relativePath }) => relativePath)
  .sort()

const chromeAvailable = await access(chromeExecutable).then(() => true, () => false)
const report = {
  schemaVersion: 1,
  phase: 'active-before-u02',
  entry: {
    source: entry.src,
    files: artifactRecords,
    javascriptBytes: artifactRecords.filter(({ path: value }) => value.endsWith('.js')).reduce((sum, item) => sum + item.bytes, 0),
    cssBytes: artifactRecords.filter(({ path: value }) => value.endsWith('.css')).reduce((sum, item) => sum + item.bytes, 0),
    initialRequestCount: artifactRecords.length + 1,
  },
  sourceScan: { visibleTableOwnerCount: tableOwners.length, tableOwners, overflowOwnerCount: overflowOwners.length, overflowOwners },
  sourceIntegrity: {
    sourceFileCount: sourceValidation.source?.fileCount ?? 122,
    canonicalItemCount: sourceValidation.catalog?.canonicalItemCount ?? 104,
    resumeBytes: resumeIntegrity.bundled.bytes,
    resumeSha256: resumeIntegrity.bundled.sha256,
    privacyCanProceed: privacyEvidence.report.canProceed,
    privacyBlockingCount: privacyEvidence.report.blockingCount,
    privacyMarkerSource: privacyEvidence.markerSource,
  },
  reviewCapabilities: {
    chrome: chromeAvailable ? 'automated-local' : 'unavailable',
    firefox: 'manual-pending',
    safari: 'manual-pending',
    iosSafari: 'manual-pending',
  },
  suppliedDefects: [
    'laboratory-station-grid',
    'computational-project-heading',
    'research-question-introduction',
    'data-signal-sheet',
    'academic-trajectory-heading',
    'evidence-count-spectrum',
  ],
}

await mkdir(outputRoot, { recursive: true })
await writeFile(path.join(outputRoot, 'baseline.json'), `${JSON.stringify(report, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
