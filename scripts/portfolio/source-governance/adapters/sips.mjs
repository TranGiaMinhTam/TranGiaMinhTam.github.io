import { runProcess } from '../derivatives.mjs'

export const createSipsAdapter = async () => {
  const probe = await runProcess({ executable: 'sips', args: ['--version'], timeoutMs: 10_000 })
  const version = probe.ok ? probe.stdout.trim().split(/\s+/u).at(-1) ?? 'unknown' : 'unavailable'
  return Object.freeze({
    id: 'sips',
    version,
    available: probe.ok,
    supports: (request) => request.purpose === 'thumbnail' || request.purpose === 'web-display',
    extensionFor: () => 'jpeg',
    convert: ({ inputPath, outputPath, purpose }) => runProcess({
      executable: 'sips',
      args: ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', '--resampleHeightWidthMax', purpose === 'thumbnail' ? '640' : '1920', inputPath, '--out', outputPath],
    }),
  })
}
