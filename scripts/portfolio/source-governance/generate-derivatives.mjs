import { createImageMagickAdapter, inspectWithImageMagick } from './adapters/imagemagick.mjs'
import { createLibreOfficeAdapter } from './adapters/libreoffice.mjs'
import { createSipsAdapter } from './adapters/sips.mjs'
import { canonicalizeAssets } from './canonicalize.mjs'
import { createConfig } from './config.mjs'
import { buildDerivativeRequests, scheduleDerivatives } from './derivatives.mjs'
import { writeCanonicalJson } from './evidence.mjs'
import { inventoryArchive } from './inventory.mjs'

export const generateDerivatives = async ({ config = createConfig() } = {}) => {
  const inventory = await inventoryArchive({ workspaceRoot: config.workspaceRoot, sourceRoot: config.sourceRoot })
  const canonical = canonicalizeAssets(inventory.facts)
  if (!inventory.report.canProceed || !canonical.report.canProceed) throw new Error('DERIVATIVE_INPUT_BLOCKED')
  const adapters = [await createImageMagickAdapter(), await createSipsAdapter(), await createLibreOfficeAdapter()]
  const requests = buildDerivativeRequests({ workspaceRoot: config.workspaceRoot, derivativeRoot: config.derivativeRoot, canonicalItems: canonical.items })
  const started = performance.now()
  const outcomes = await scheduleDerivatives({ requests, adapters, inspectOutput: inspectWithImageMagick })
  const elapsedMs = Math.round(performance.now() - started)
  const report = Object.freeze({
    schemaVersion: 1,
    adapters: adapters.map(({ id, version, available }) => ({ id, version, available })),
    requestCount: requests.length,
    readyCount: outcomes.filter(({ status }) => status === 'ready').length,
    unavailableCount: outcomes.filter(({ status }) => status === 'unavailable').length,
    elapsedMs,
    outcomes,
  })
  await writeCanonicalJson(`${config.evidenceRoot}/derivative-manifest.json`, report)
  return report
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  generateDerivatives().then((report) => {
    console.log(JSON.stringify({ requestCount: report.requestCount, readyCount: report.readyCount, unavailableCount: report.unavailableCount, elapsedMs: report.elapsedMs, adapters: report.adapters }, null, 2))
  }).catch(() => {
    console.error('U01_DERIVATIVE_GENERATION_FAILED')
    process.exitCode = 1
  })
}
