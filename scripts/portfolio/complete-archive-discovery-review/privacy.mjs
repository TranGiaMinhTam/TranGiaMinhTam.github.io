import { execFile } from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import { scanPhonePrivacy, selectPrivatePhoneMarker } from '../source-governance/privacy.mjs'

const executeFile = promisify(execFile)
const root = process.cwd()
const resumePath = path.join(root, 'src/assets/documents/Tran-Gia-Minh-Tam-Resume.pdf')
const evidenceRoot = path.join(root, 'artifacts/portfolio/u04-complete-archive')
const resumeSha256 = '8de5fc42ca8c443a7dcad6daa2766d7cd5f3a596369a463e54a74b101ec49282'

const extractMarker = async () => {
  try {
    const { stdout } = await executeFile('strings', ['-a', resumePath], { maxBuffer: 4 * 1024 * 1024 })
    const decoded = [...stdout.matchAll(/<(?:FEFF)?([0-9A-F]{16,})>/giu)].map((match) => {
      const units = match[1].match(/.{4}/gu) ?? []
      return String.fromCharCode(...units.map((unit) => Number.parseInt(unit, 16)))
    }).join('\n')
    const direct = selectPrivatePhoneMarker(decoded)
    if (direct) return direct
    return [...stdout.matchAll(/\(([^\n]{4,})\)/gu)].map((match) => selectPrivatePhoneMarker(match[1])).find(Boolean) ?? null
  } catch {
    return null
  }
}

const marker = await extractMarker()
const result = await scanPhonePrivacy({
  workspaceRoot: root,
  roots: [path.join(root, 'src'), path.join(root, 'scripts'), evidenceRoot, '/private/tmp/portfolio-u04-complete-archive-candidate-dist'],
  resumePath,
  resumeSha256,
  marker,
})
const report = { schemaVersion: 1, markerProvided: Boolean(marker), markerSource: marker ? 'ephemeral-local-extraction' : 'unavailable', scannedFileCount: result.scannedFileCount, report: result.report }
await writeFile(path.join(evidenceRoot, 'privacy-verification.json'), `${JSON.stringify(report, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
if (!marker || !result.report.canProceed) process.exitCode = 1
