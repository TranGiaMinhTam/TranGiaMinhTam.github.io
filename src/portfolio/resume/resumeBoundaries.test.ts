import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { approvedResumeIntegrity } from './resumeContentModel'

const root = process.cwd()
const canonical = path.resolve(root, 'src/assets/documents/Tran-Gia-Minh-Tam-Resume.pdf')
const stale = path.resolve(root, 'src/assets/documents/resume.pdf')

describe('U-03 resume source and activation boundaries', () => {
  it('keeps the selected canonical bytes exact and the stale asset unreferenced', () => {
    const bytes = fs.readFileSync(canonical)
    const sourceFiles = fs.readdirSync(path.resolve(root, 'src'), { recursive: true })
      .filter((item): item is string => typeof item === 'string'
        && /\.(?:ts|tsx|css)$/u.test(item)
        && !/\.test\.(?:ts|tsx)$/u.test(item))
      .map((item) => fs.readFileSync(path.resolve(root, 'src', item), 'utf8'))
      .join('\n')

    expect(bytes).toHaveLength(approvedResumeIntegrity.bytes)
    expect(crypto.createHash('sha256').update(bytes).digest('hex')).toBe(approvedResumeIntegrity.sha256)
    expect(sourceFiles).not.toMatch(/assets\/documents\/resume\.pdf/u)
    expect(fs.existsSync(stale)).toBe(true)
  })

  it('requires every approved U-03 activation contract in the active entry', () => {
    const activeEntry = fs.readFileSync(path.resolve(root, 'src/App.tsx'), 'utf8')
    for (const contract of [
      'resumeContentSelection',
      'resumeDownload',
      'decorateRegistryWithResumeContent',
      'toMastheadResumeAction',
      'createIdentityQuestionBodyRegistry',
    ]) expect(activeEntry).toContain(contract)
  })
})
