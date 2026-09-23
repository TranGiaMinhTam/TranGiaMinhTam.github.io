import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { createConfig } from '../source-governance/config.mjs'
import { extractPrivateMarkerFromPdf, scanPhonePrivacy } from '../source-governance/privacy.mjs'

const config = createConfig()
const evidenceRoot = path.join(config.workspaceRoot, 'artifacts/portfolio/u02-masthead-alignment')
const resumeEvidence = JSON.parse(await readFile(path.join(config.evidenceRoot, 'resume-integrity.json'), 'utf8'))
const marker = await extractPrivateMarkerFromPdf({ resumePath: config.resumeTarget })
const result = await scanPhonePrivacy({
  workspaceRoot: config.workspaceRoot,
  roots: [
    path.join(config.workspaceRoot, 'src'),
    path.join(config.workspaceRoot, 'scripts'),
    evidenceRoot,
    '/private/tmp/portfolio-u02-masthead-candidate-dist',
  ],
  resumePath: config.resumeTarget,
  resumeSha256: resumeEvidence.bundled.sha256,
  marker,
})
const evidence = {
  schemaVersion: 1,
  markerProvided: Boolean(marker),
  markerSource: marker ? 'ephemeral-local-extraction' : 'unavailable',
  scannedFileCount: result.scannedFileCount,
  report: result.report,
}
await mkdir(evidenceRoot, { recursive: true })
await writeFile(path.join(evidenceRoot, 'privacy-verification.json'), `${JSON.stringify(evidence, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(evidence, null, 2)}\n`)
if (!marker || !result.report.canProceed) process.exitCode = 1
