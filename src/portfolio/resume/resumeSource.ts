import type { DownloadableResume } from './resume.types'

const PDF_PATH = /\.pdf(?:\?.*)?$/iu

export const createResumeDownload = (href: string): DownloadableResume => {
  if (!(href.startsWith('/') || href.startsWith('./')) || href.includes('..') || href.includes('\\') || !PDF_PATH.test(href)) {
    throw new TypeError('RESUME_SOURCE_INVALID')
  }
  return Object.freeze({
    kind: 'resume-download',
    source: Object.freeze({ kind: 'local', href, mediaType: 'application/pdf' }),
    filename: 'Tran-Gia-Minh-Tam-Resume.pdf',
    title: 'Resume of Tran Gia Minh Tam',
  })
}
