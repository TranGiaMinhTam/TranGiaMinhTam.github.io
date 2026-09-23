// @vitest-environment node
import { mkdtemp, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { createLibreOfficeAdapter } from '../adapters/libreoffice.mjs'
import { derivativeTarget, runProcess, scheduleDerivatives, stableDerivativeRequestKey } from '../derivatives.mjs'

const temporaryRoots = []

afterEach(async () => Promise.all(temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true }))))

describe('bounded derivative infrastructure', () => {
  it('creates stable confined targets and request keys', async () => {
    const derivativeRoot = await mkdtemp(path.join(os.tmpdir(), 'u01-derivative-'))
    temporaryRoots.push(derivativeRoot)
    const request = { derivativeRoot, canonicalId: 'asset-001', sourceSha256: 'a'.repeat(64), purpose: 'thumbnail' }
    expect(derivativeTarget({ ...request, extension: 'webp' })).toBe(path.join(derivativeRoot, 'thumbnail', `asset-001-${'a'.repeat(12)}-thumbnail.webp`))
    expect(stableDerivativeRequestKey(request)).toBe(stableDerivativeRequestKey(request))
  })

  it('converts a process timeout into a typed failure', async () => {
    const result = await runProcess({ executable: process.execPath, args: ['-e', 'setTimeout(() => {}, 1000)'], timeoutMs: 20 })
    expect(result).toMatchObject({ ok: false, reason: 'timeout' })
  })

  it('never schedules more than two conversions and keeps stable result order', async () => {
    const derivativeRoot = await mkdtemp(path.join(os.tmpdir(), 'u01-derivative-'))
    temporaryRoots.push(derivativeRoot)
    let active = 0
    let maximum = 0
    const adapter = {
      id: 'test', version: '1', available: true, supports: () => true, extensionFor: () => 'webp',
      convert: async () => { active += 1; maximum = Math.max(maximum, active); await new Promise((resolve) => setTimeout(resolve, 5)); active -= 1; return { ok: false, reason: 'conversion-failed' } },
    }
    const requests = [3, 1, 2].map((number) => ({ key: String(number), workspaceRoot: derivativeRoot, derivativeRoot, canonicalId: `asset-${number}`, sourceSha256: String(number).repeat(64), purpose: 'thumbnail', safeFallback: 'original-download', inputPath: 'unused' }))
    const results = await scheduleDerivatives({ requests, adapters: [adapter], inspectOutput: async () => ({ width: 1, height: 1, pages: 1 }) })
    expect(maximum).toBeLessThanOrEqual(2)
    expect(results.map(({ canonicalId }) => canonicalId)).toEqual(['asset-1', 'asset-2', 'asset-3'])
  })

  it('reports DOCX conversion unavailable when the optional tool is absent', async () => {
    const adapter = await createLibreOfficeAdapter()
    if (!adapter.available) {
      expect(await adapter.convert({ inputPath: 'input.docx', outputPath: 'output.pdf' })).toEqual({ ok: false, reason: 'tool-unavailable' })
    } else {
      expect(adapter.id).toBe('libreoffice')
    }
  })
})
