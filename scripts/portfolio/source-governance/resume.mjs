import { open, copyFile, mkdir, rename, rm, stat } from 'node:fs/promises'
import path from 'node:path'
import { hashFile } from './hash.mjs'
import { isWithinRoot } from './paths.mjs'

const hasPdfSignature = async (file) => {
  const handle = await open(file, 'r')
  try {
    const buffer = Buffer.alloc(5)
    const { bytesRead } = await handle.read(buffer, 0, 5, 0)
    return bytesRead === 5 && buffer.toString('ascii') === '%PDF-'
  } finally {
    await handle.close()
  }
}

export const copyVerifiedResume = async ({ workspaceRoot, source, target }) => {
  if (!source) return Object.freeze({ ok: false, code: 'U01-RES-SOURCE-REQUIRED' })
  if (!isWithinRoot(workspaceRoot, target)) return Object.freeze({ ok: false, code: 'U01-RES-TARGET-ESCAPE' })
  try {
    const sourceInfo = await stat(source)
    if (!sourceInfo.isFile() || !(await hasPdfSignature(source))) return Object.freeze({ ok: false, code: 'U01-RES-SOURCE-INVALID' })
    const before = await hashFile(source)
    await mkdir(path.dirname(target), { recursive: true })
    const temporary = `${target}.candidate-${process.pid}`
    try {
      await copyFile(source, temporary)
      const candidate = await hashFile(temporary)
      const after = await hashFile(source)
      if (candidate.sha256 !== before.sha256 || candidate.bytes !== before.bytes || after.sha256 !== before.sha256 || after.bytes !== before.bytes) {
        await rm(temporary, { force: true })
        return Object.freeze({ ok: false, code: 'U01-RES-COPY-MISMATCH' })
      }
      await rename(temporary, target)
      return Object.freeze({
        ok: true,
        source: Object.freeze({ bytes: before.bytes, sha256: before.sha256 }),
        bundled: Object.freeze({
          bytes: candidate.bytes,
          sha256: candidate.sha256,
          relativePath: path.relative(workspaceRoot, target).split(path.sep).join('/'),
          mediaType: 'application/pdf',
          filename: 'Tran-Gia-Minh-Tam-Resume.pdf',
        }),
      })
    } catch (error) {
      await rm(temporary, { force: true })
      throw error
    }
  } catch {
    return Object.freeze({ ok: false, code: 'U01-RES-COPY-FAILED' })
  }
}
