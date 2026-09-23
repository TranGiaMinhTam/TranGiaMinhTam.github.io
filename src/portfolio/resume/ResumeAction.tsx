import type { AnchorHTMLAttributes } from 'react'
import type { DownloadableResume } from './resume.types'

export type ResumeActionProps = Readonly<{
  download: DownloadableResume
  label?: string
  testId?: string
}> & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'download' | 'href'>

export function ResumeAction({
  download,
  label = 'Download resume',
  testId = 'resume-download-action',
  ...props
}: ResumeActionProps) {
  return <a
    href={download.source.href}
    download={download.filename}
    aria-label={`${label}: ${download.title}`}
    data-testid={testId}
    {...props}
  >{label}</a>
}
