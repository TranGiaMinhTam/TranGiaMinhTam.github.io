import { createConfig } from './config.mjs'
import { writeCanonicalJson } from './evidence.mjs'
import { extractPrivateMarkerFromPdf, readPrivateMarker, scanPhonePrivacy } from './privacy.mjs'
import { readFile } from 'node:fs/promises'

export const verifyPrivacy = async ({ config = createConfig(), extractFromResume = process.env.PORTFOLIO_PRIVACY_EXTRACT_FROM_RESUME === '1' } = {}) => {
  const resumeEvidence = JSON.parse(await readFile(`${config.evidenceRoot}/resume-integrity.json`, 'utf8'))
  const suppliedMarker = await readPrivateMarker({ direct: config.phoneMarker, markerFile: config.phoneMarkerFile, workspaceRoot: config.workspaceRoot })
  const marker = suppliedMarker ?? (extractFromResume ? await extractPrivateMarkerFromPdf({ resumePath: config.resumeTarget }) : null)
  const result = await scanPhonePrivacy({
    workspaceRoot: config.workspaceRoot,
    roots: [`${config.workspaceRoot}/src`, `${config.workspaceRoot}/scripts`, config.evidenceRoot, `${config.workspaceRoot}/dist`],
    resumePath: config.resumeTarget,
    resumeSha256: resumeEvidence.bundled.sha256,
    marker,
    markerFile: config.phoneMarkerFile,
  })
  const safeEvidence = Object.freeze({ schemaVersion: 1, markerProvided: Boolean(marker), markerSource: suppliedMarker ? 'approved-local-input' : marker ? 'ephemeral-local-extraction' : 'unavailable', scannedFileCount: result.scannedFileCount, report: result.report })
  await writeCanonicalJson(`${config.evidenceRoot}/privacy-verification.json`, safeEvidence)
  return safeEvidence
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  verifyPrivacy().then((result) => {
    console.log(JSON.stringify(result, null, 2))
    process.exitCode = result.report.canProceed ? 0 : 1
  }).catch(() => {
    console.error('U01_PRIVACY_VERIFICATION_FAILED')
    process.exitCode = 1
  })
}
