import { runProcess } from '../derivatives.mjs'

export const probeImageMagick = async () => {
  const result = await runProcess({ executable: 'magick', args: ['-version'], timeoutMs: 10_000 })
  const version = result.ok ? result.stdout.match(/Version: ImageMagick ([^ ]+)/u)?.[1] ?? 'unknown' : 'unavailable'
  return Object.freeze({ id: 'imagemagick', version, available: result.ok })
}

export const createImageMagickAdapter = async () => {
  const capability = await probeImageMagick()
  return Object.freeze({
    ...capability,
    supports: (request) => request.purpose !== 'document-preview',
    extensionFor: () => 'webp',
    convert: ({ inputPath, outputPath, purpose }) => {
      const size = purpose === 'thumbnail' ? '640x640>' : purpose === 'pdf-first-page' ? '1600x2200>' : '1920x1920>'
      const input = purpose === 'pdf-first-page' ? `${inputPath}[0]` : inputPath
      const density = purpose === 'pdf-first-page' ? ['-density', '144'] : []
      return runProcess({ executable: 'magick', args: [...density, input, '-auto-orient', '-resize', size, '-strip', '-define', 'webp:method=6', '-quality', '82', outputPath] })
    },
  })
}

export const inspectWithImageMagick = async (file, mediaType) => {
  const format = mediaType === 'application/pdf' ? '%w %h %n' : '%w %h 1'
  const result = await runProcess({ executable: 'magick', args: ['identify', '-format', format, file], timeoutMs: 30_000 })
  if (!result.ok) throw new Error('IDENTIFY_FAILED')
  const [width, height, pages] = result.stdout.trim().split(/\s+/u).map(Number)
  return Object.freeze({ width, height, pages })
}
