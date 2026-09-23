// @vitest-environment node
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { copyVerifiedResume } from '../resume.mjs'

const roots = []
afterEach(async () => Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true }))))

describe('resume integrity adapter', () => {
  it('copies a PDF byte-for-byte and returns only safe capability facts', async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), 'u01-resume-'))
    roots.push(root)
    const source = path.join(root, 'source.pdf')
    const target = path.join(root, 'public', 'resume.pdf')
    const bytes = Buffer.from('%PDF-1.7\nexample\n%%EOF\n')
    await writeFile(source, bytes)
    const result = await copyVerifiedResume({ workspaceRoot: root, source, target })
    expect(result).toMatchObject({ ok: true, bundled: { relativePath: 'public/resume.pdf', filename: 'Tran-Gia-Minh-Tam-Resume.pdf' } })
    expect(await readFile(target)).toEqual(bytes)
    expect(JSON.stringify(result)).not.toContain(root)
  })

  it('rejects a non-PDF input without creating a capability', async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), 'u01-resume-'))
    roots.push(root)
    const source = path.join(root, 'source.pdf')
    await writeFile(source, 'not a pdf')
    await expect(copyVerifiedResume({ workspaceRoot: root, source, target: path.join(root, 'resume.pdf') })).resolves.toEqual({ ok: false, code: 'U01-RES-SOURCE-INVALID' })
  })
})
