import { describe, expect, it } from 'vitest'
import { createResumeDownload } from './resumeSource'

describe('resume source contract', () => {
  it('creates the stable local PDF download capability', () => {
    expect(createResumeDownload('/assets/resume.pdf')).toMatchObject({
      filename: 'Tran-Gia-Minh-Tam-Resume.pdf',
      source: { kind: 'local', mediaType: 'application/pdf' },
    })
  })

  it.each(['https://example.test/resume.pdf', '../resume.pdf', '/assets/resume.txt'])(
    'rejects non-bundled or non-PDF input %s',
    (href) => expect(() => createResumeDownload(href)).toThrow('RESUME_SOURCE_INVALID'),
  )
})
