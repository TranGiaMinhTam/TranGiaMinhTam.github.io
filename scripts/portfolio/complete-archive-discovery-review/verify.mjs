import { createHash } from 'node:crypto'
import { access, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const activeMode = process.argv.includes('--active')
const phase = activeMode ? 'active' : 'candidate'
const output = path.join(root, `artifacts/portfolio/u04-complete-archive/${activeMode ? 'active-' : ''}integrity-verification.json`)
const candidateDist = activeMode ? path.join(root, 'dist') : '/private/tmp/portfolio-u04-complete-archive-candidate-dist'
const manifest = JSON.parse(await readFile(path.join(root, 'src/portfolio/archive/generated/archive-manifest.json'), 'utf8'))
const findings = []
const exists = (target) => stat(target).then(() => true, () => false)
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex')

if (manifest.physicalFileCount !== 127 || manifest.items.length !== 110) findings.push({ code: 'U04A-INT-INVENTORY', target: 'archive-manifest.json' })
const sourceMembershipCount = manifest.items.flatMap(({ physicalSources }) => physicalSources).filter(({ sourceRelativePath }) => sourceRelativePath.startsWith('source/')).length
if (sourceMembershipCount !== 109) findings.push({ code: 'U04A-INT-SOURCE-COVERAGE', target: 'archive-manifest.json' })
const publicCopy = JSON.stringify(manifest.items.map(({ metadata }) => metadata))
if (/Archive record|src\/assets|verified source|resume source/iu.test(publicCopy)) findings.push({ code: 'U04A-INT-PUBLIC-COPY', target: 'archive-manifest.json' })

const groupRoot = path.join(root, 'src/portfolio/archive/generated/groups')
const groupFiles = (await readdir(groupRoot)).filter((file) => file.endsWith('.ts')).sort()
const groupText = (await Promise.all(groupFiles.map((file) => readFile(path.join(groupRoot, file), 'utf8')))).join('\n')
if (groupFiles.length !== 6) findings.push({ code: 'U04A-INT-GROUP-COUNT', target: 'generated/groups' })
if (/asset-0857163ebd922f5c0723|asset-1fa6103b2d5218d4582b/gu.test(groupText)) findings.push({ code: 'U04A-INT-TRANSCRIPT', target: 'generated/groups' })
for (const id of ['asset-02ed8286ffa69acd6cd0']) {
  if (groupText.includes(id)) findings.push({ code: 'U04A-INT-DOCKING-DUPLICATE', target: id })
}
for (const id of ['asset-2e7f7799ff0ac20929d2', 'asset-2fe544898047bc141c69', 'asset-33f273994f6986d06291', 'asset-6ac9d9b9698aa3b2310a']) {
  if (!groupText.includes(id)) findings.push({ code: 'U04A-INT-DOCKING-ARCHIVE-MISSING', target: id })
}

const sourceProteinRoot = path.join(root, 'src/assets/minh-tam/source/Science research /2026 Protein Docking')
for (const file of ['7381606024551.jpg', 'IMG_4206.JPG', 'IMG_4207.JPG', 'IMG_4208.JPG', 'IMG_4213.JPG']) {
  if (!(await exists(path.join(sourceProteinRoot, file)))) findings.push({ code: 'U04A-INT-DOCKING-MISSING', target: file })
}
if (await exists(path.join(root, 'src/assets/minh-tam/gallery/2026 Protein Docking'))) findings.push({ code: 'U04A-INT-DOCKING-FOLDER', target: 'gallery/2026 Protein Docking' })

const lockHash = sha256(await readFile(path.join(root, 'package-lock.json')))
if (lockHash !== '46c5271e0ef6101dbe3dd45399c3c615a2755c4e8139d80c3efb0a71c6389971') findings.push({ code: 'U04A-INT-LOCKFILE', target: 'package-lock.json' })

let candidate = { checked: false, dynamicGroupCount: 0, initialGroupImportCount: 0 }
const candidateManifestPath = path.join(candidateDist, '.vite/manifest.json')
if (await exists(candidateManifestPath)) {
  const buildManifest = JSON.parse(await readFile(candidateManifestPath, 'utf8'))
  const entries = Object.entries(buildManifest)
  const entry = entries.find(([, record]) => record.isEntry)
  const groups = entries.filter(([key, record]) => key.includes('/generated/groups/') || record.src?.includes('/generated/groups/'))
  if (!entry) findings.push({ code: 'U04A-INT-CANDIDATE-ENTRY', target: '.vite/manifest.json' })
  if (groups.length !== 6) findings.push({ code: 'U04A-INT-CANDIDATE-GROUPS', target: '.vite/manifest.json' })
  const initialImports = new Set(entry?.[1].imports ?? [])
  const initialGroupImportCount = groups.filter(([key]) => initialImports.has(key)).length
  if (initialGroupImportCount !== 0) findings.push({ code: 'U04A-INT-EAGER-GROUP', target: '.vite/manifest.json' })
  candidate = { checked: true, dynamicGroupCount: groups.length, initialGroupImportCount }
}

const report = {
  schemaVersion: 1,
  phase,
  inventory: { physicalFileCount: manifest.physicalFileCount, canonicalItemCount: manifest.items.length, sourceMembershipCount },
  generatedGroups: { count: groupFiles.length, sha256: sha256(Buffer.from(groupText)) },
  candidate,
  lockHash,
  findings,
  canProceed: findings.length === 0,
}
await access(path.dirname(output))
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
if (!report.canProceed) process.exitCode = 1
