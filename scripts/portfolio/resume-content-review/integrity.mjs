import { createHash } from 'node:crypto'
import { readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const evidenceRoot = path.join(root, 'artifacts/portfolio/u03-resume-content')
const approved = { bytes: 113775, sha256: '8de5fc42ca8c443a7dcad6daa2766d7cd5f3a596369a463e54a74b101ec49282' }
const targets = {
  canonical: path.join(root, 'src/assets/documents/Tran-Gia-Minh-Tam-Resume.pdf'),
  external: '/Users/nhamhhung/ASEAN/Resume_Minh Tam.pdf',
  stale: path.join(root, 'src/assets/documents/resume.pdf'),
}
const fact = async (target) => {
  const bytes = await readFile(target)
  return { bytes: bytes.byteLength, sha256: createHash('sha256').update(bytes).digest('hex'), pdfSignature: bytes.subarray(0, 5).toString() === '%PDF-' }
}
const facts = Object.fromEntries(await Promise.all(Object.entries(targets).map(async ([name, target]) => [name, await fact(target)])))
const staleApproved = { bytes: 103033, sha256: '7ca0d97a208bbb9fd0e026ae51a164792e2efa6b2388c303141c1466853874dd' }
const findings = []
for (const name of ['canonical', 'external']) if (facts[name].bytes !== approved.bytes || facts[name].sha256 !== approved.sha256 || !facts[name].pdfSignature) findings.push({ code: 'U03-INT-SELECTED', target: name })
if (facts.stale.bytes !== staleApproved.bytes || facts.stale.sha256 !== staleApproved.sha256) findings.push({ code: 'U03-INT-STALE', target: 'stale' })
const candidateManifest = '/private/tmp/portfolio-u03-resume-content-candidate-dist/.vite/manifest.json'
if (await stat(candidateManifest).catch(() => null)) {
  const manifest = JSON.parse(await readFile(candidateManifest, 'utf8'))
  const serialized = JSON.stringify(manifest)
  if (!/Tran-Gia-Minh-Tam-Resume[^"/]*\.pdf/u.test(serialized)) findings.push({ code: 'U03-INT-CANDIDATE-ASSET', target: '.vite/manifest.json' })
  if (/(?:^|[/"-])resume[^/"-]*\.pdf/u.test(serialized.replaceAll('Tran-Gia-Minh-Tam-Resume', 'canonical'))) findings.push({ code: 'U03-INT-STALE-ACTIVE', target: '.vite/manifest.json' })
}
const report = { schemaVersion: 1, approved, facts, findings, canProceed: findings.length === 0 }
await writeFile(path.join(evidenceRoot, 'integrity-verification.json'), `${JSON.stringify(report, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
if (!report.canProceed) process.exitCode = 1
