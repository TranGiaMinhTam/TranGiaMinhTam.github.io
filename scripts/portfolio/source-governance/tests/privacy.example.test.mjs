// @vitest-environment node
import { createHash } from 'node:crypto'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { scanPhonePrivacy, selectPrivatePhoneMarker } from '../privacy.mjs'

const roots = []
afterEach(async () => Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true }))))

const fixture = async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'u01-privacy-'))
  roots.push(root)
  const sourceRoot = path.join(root, 'src')
  await mkdir(sourceRoot)
  const resumePath = path.join(sourceRoot, 'resume.pdf')
  const resumeBytes = Buffer.from('%PDF-1.7\nprivate fixture\n')
  await writeFile(resumePath, resumeBytes)
  return { root, sourceRoot, resumePath, resumeSha256: createHash('sha256').update(resumeBytes).digest('hex') }
}

describe('non-echoing phone privacy scan', () => {
  it('selects one phone-like marker and rejects ambiguous extraction', () => {
    expect(selectPrivatePhoneMarker('Telephone: +84 98 765 4321')).toBe('0987654321')
    expect(selectPrivatePhoneMarker('Telephone: 0987654321; alternate 0912345678')).toBeNull()
  })

  it('fails closed when the private marker is absent', async () => {
    const input = await fixture()
    const result = await scanPhonePrivacy({ workspaceRoot: input.root, roots: [input.sourceRoot], resumePath: input.resumePath, resumeSha256: input.resumeSha256, marker: null })
    expect(result.report).toMatchObject({ canProceed: false, findings: [{ code: 'U01-PRI-MARKER-REQUIRED' }] })
  })

  it('detects exact and formatted leakage without echoing the value', async () => {
    const input = await fixture()
    const marker = '0987654321'
    await writeFile(path.join(input.sourceRoot, 'public.ts'), `export const contact = '098 765 4321'`)
    const result = await scanPhonePrivacy({ workspaceRoot: input.root, roots: [input.sourceRoot], resumePath: input.resumePath, resumeSha256: input.resumeSha256, marker })
    expect(result.report.findings).toMatchObject([{ code: 'U01-PRI-PHONE-LEAK', target: 'src/public.ts' }])
    expect(JSON.stringify(result)).not.toContain(marker)
    expect(JSON.stringify(result)).not.toContain('098 765 4321')
  })

  it('allows a clean boundary and the hash-verified resume exception', async () => {
    const input = await fixture()
    await writeFile(path.join(input.sourceRoot, 'public.ts'), 'export const contact = null')
    const result = await scanPhonePrivacy({ workspaceRoot: input.root, roots: [input.sourceRoot], resumePath: input.resumePath, resumeSha256: input.resumeSha256, marker: '0987654321' })
    expect(result.report.canProceed).toBe(true)
  })
})
