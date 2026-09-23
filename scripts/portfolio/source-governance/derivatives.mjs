import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdir, readFile, rm, stat } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import { CONVERSION_CONCURRENCY, CONVERSION_TIMEOUT_MS, DERIVATIVE_LIMITS } from './config.mjs'
import { hashFile } from './hash.mjs'
import { isWithinRoot } from './paths.mjs'

const executeFile = promisify(execFile)

export const runProcess = async ({ executable, args, timeoutMs = CONVERSION_TIMEOUT_MS }) => {
  try {
    const result = await executeFile(executable, args, { timeout: timeoutMs, windowsHide: true, maxBuffer: 1024 * 1024 })
    return Object.freeze({ ok: true, stdout: result.stdout, stderr: result.stderr })
  } catch (error) {
    return Object.freeze({ ok: false, reason: error.killed || error.signal ? 'timeout' : 'conversion-failed', exitCode: Number.isInteger(error.code) ? error.code : null })
  }
}

export const derivativeTarget = ({ derivativeRoot, canonicalId, sourceSha256, purpose, extension }) => {
  if (!(purpose in DERIVATIVE_LIMITS)) throw new TypeError('DERIVATIVE_PURPOSE_INVALID')
  const safeId = canonicalId.replace(/[^a-zA-Z0-9-]/gu, '-')
  const filename = `${safeId}-${sourceSha256.slice(0, 12)}-${purpose}.${extension}`
  const target = path.resolve(derivativeRoot, purpose, filename)
  if (!isWithinRoot(derivativeRoot, target)) throw new TypeError('DERIVATIVE_TARGET_ESCAPE')
  return target
}

const signatureType = async (file) => {
  const bytes = (await readFile(file)).subarray(0, 16)
  if (bytes.subarray(0, 5).toString('ascii') === '%PDF-') return 'application/pdf'
  if (bytes.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) return 'image/jpeg'
  if (bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png'
  if (bytes.subarray(0, 4).toString('ascii') === 'RIFF' && bytes.subarray(8, 12).toString('ascii') === 'WEBP') return 'image/webp'
  return null
}

export const validateDerivativeOutput = async ({ request, outputPath, adapter, inspectOutput }) => {
  const limit = DERIVATIVE_LIMITS[request.purpose]
  try {
    if (!isWithinRoot(request.derivativeRoot, outputPath)) throw new Error('escape')
    const info = await stat(outputPath)
    if (!info.isFile() || info.size <= 0 || info.size > limit.maxBytes) throw new Error('bytes')
    const mediaType = await signatureType(outputPath)
    if (!mediaType || (request.purpose === 'document-preview' ? mediaType !== 'application/pdf' : !mediaType.startsWith('image/'))) throw new Error('type')
    const details = await inspectOutput(outputPath, mediaType)
    if (limit.maxWidth && (!details.width || details.width > limit.maxWidth)) throw new Error('width')
    if (limit.maxHeight && (!details.height || details.height > limit.maxHeight)) throw new Error('height')
    if (limit.maxPages && (!details.pages || details.pages > limit.maxPages)) throw new Error('pages')
    const hashed = await hashFile(outputPath)
    return Object.freeze({
      canonicalId: request.canonicalId,
      status: 'ready',
      purpose: request.purpose,
      sourceSha256: request.sourceSha256,
      outputSha256: hashed.sha256,
      relativeOutput: path.relative(request.workspaceRoot, outputPath).split(path.sep).join('/'),
      mediaType,
      bytes: hashed.bytes,
      ...details,
      adapter: Object.freeze({ id: adapter.id, version: adapter.version }),
    })
  } catch {
    await rm(outputPath, { force: true })
    return Object.freeze({ canonicalId: request.canonicalId, status: 'unavailable', purpose: request.purpose, reason: 'invalid-output', safeFallback: request.safeFallback })
  }
}

export const scheduleDerivatives = async ({ requests, adapters, concurrency = CONVERSION_CONCURRENCY, inspectOutput }) => {
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > CONVERSION_CONCURRENCY) throw new TypeError('DERIVATIVE_CONCURRENCY_INVALID')
  const ordered = [...requests].sort((left, right) => left.key.localeCompare(right.key))
  const results = new Array(ordered.length)
  let cursor = 0
  const worker = async () => {
    while (cursor < ordered.length) {
      const index = cursor++
      const request = ordered[index]
      const adapter = adapters.find((candidate) => candidate.available && candidate.supports(request))
      if (!adapter) {
        results[index] = Object.freeze({ canonicalId: request.canonicalId, status: 'unavailable', purpose: request.purpose, reason: 'tool-unavailable', safeFallback: request.safeFallback })
        continue
      }
      const outputPath = derivativeTarget({ ...request, extension: adapter.extensionFor(request) })
      await mkdir(path.dirname(outputPath), { recursive: true })
      const conversion = await adapter.convert({ ...request, outputPath })
      results[index] = conversion.ok
        ? await validateDerivativeOutput({ request, outputPath, adapter, inspectOutput })
        : Object.freeze({ canonicalId: request.canonicalId, status: 'unavailable', purpose: request.purpose, reason: conversion.reason, safeFallback: request.safeFallback })
      if (!conversion.ok) await rm(outputPath, { force: true })
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, ordered.length) }, worker))
  return Object.freeze(results)
}

export const stableDerivativeRequestKey = ({ canonicalId, sourceSha256, purpose }) => createHash('sha256').update(`${canonicalId}\u0000${sourceSha256}\u0000${purpose}`).digest('hex')

export const buildDerivativeRequests = ({ workspaceRoot, derivativeRoot, canonicalItems }) => {
  const requests = []
  for (const item of canonicalItems) {
    const source = [...item.physicalSources].sort((left, right) => left.relativePath.localeCompare(right.relativePath))[0]
    if (!source) continue
    const common = {
      workspaceRoot,
      derivativeRoot,
      canonicalId: item.id,
      sourceSha256: source.sha256,
      inputPath: path.resolve(workspaceRoot, source.relativePath),
      safeFallback: 'original-download',
    }
    const purposes = source.mediaType === 'application/pdf'
      ? ['pdf-first-page']
      : source.mediaType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ? ['document-preview']
        : source.mediaType === 'image/heic' || (source.relativePath.endsWith('.png') && source.mediaType === 'image/webp')
          ? ['thumbnail', 'web-display']
          : source.mediaType.startsWith('image/') ? ['thumbnail'] : []
    for (const purpose of purposes) {
      const request = Object.freeze({ ...common, purpose })
      requests.push(Object.freeze({ ...request, key: stableDerivativeRequestKey(request) }))
    }
  }
  return Object.freeze(requests.sort((left, right) => left.key.localeCompare(right.key)))
}
