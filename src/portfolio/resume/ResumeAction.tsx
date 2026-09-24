import type { AnchorHTMLAttributes } from 'react'
import { resolvePdfCapability, useMediaViewer } from '../media-viewer'
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
  const viewer = useMediaViewer()
  const preview = viewer ? <button
    className={props.className}
    type="button"
    aria-label={`Preview: ${download.title}`}
    data-testid={`${testId}-preview-button`}
    onClick={(event) => {
      const result = resolvePdfCapability({ id: 'portfolio-resume', title: download.title, description: 'Two-page resume.', context: 'Resume', href: download.source.href, mediaType: 'application/pdf', filename: download.filename })
      if (result.ok) viewer.openPdf(result.capability, event.currentTarget)
    }}
  >Preview resume</button> : null
  return <>{preview}<a
    href={download.source.href}
    download={download.filename}
    aria-label={`${label}: ${download.title}`}
    data-testid={testId}
    {...props}
  >{label}</a></>
}
