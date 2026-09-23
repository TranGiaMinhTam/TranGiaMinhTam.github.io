import path from 'node:path'
import { access, rename } from 'node:fs/promises'
import { runProcess } from '../derivatives.mjs'

const probeExecutable = async (executable) => {
  const result = await runProcess({ executable, args: ['--version'], timeoutMs: 10_000 })
  return result.ok ? Object.freeze({ executable, version: result.stdout.trim().split('\n')[0] }) : null
}

export const createLibreOfficeAdapter = async () => {
  const capability = await probeExecutable('libreoffice') ?? await probeExecutable('soffice')
  return Object.freeze({
    id: 'libreoffice',
    version: capability?.version ?? 'unavailable',
    available: Boolean(capability),
    supports: (request) => request.purpose === 'document-preview',
    extensionFor: () => 'pdf',
    convert: async ({ inputPath, outputPath }) => {
      if (!capability) return Object.freeze({ ok: false, reason: 'tool-unavailable' })
      const outputDirectory = path.dirname(outputPath)
      const result = await runProcess({ executable: capability.executable, args: ['--headless', '--convert-to', 'pdf', '--outdir', outputDirectory, inputPath] })
      if (!result.ok) return result
      const produced = path.join(outputDirectory, `${path.basename(inputPath, path.extname(inputPath))}.pdf`)
      try {
        await access(produced)
        if (produced !== outputPath) await rename(produced, outputPath)
        return result
      } catch {
        return Object.freeze({ ok: false, reason: 'conversion-failed' })
      }
    },
  })
}
