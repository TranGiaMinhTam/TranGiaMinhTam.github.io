import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { resolvePdfCapability, useMediaViewer } from '../media-viewer'
import type { PublishedEvidence } from '../model/portfolio.types'

export type EvidenceActionProps = Readonly<{
  evidence: PublishedEvidence
  children?: ReactNode
  newTab?: boolean
}> & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'>

export function EvidenceAction({ evidence, children, newTab = true, ...props }: EvidenceActionProps) {
  const viewer = useMediaViewer()
  if (viewer && evidence.full.mediaKind === 'pdf') return <button
    className={props.className}
    type="button"
    aria-label={evidence.accessibleText}
    data-testid="evidence-open-action"
    onClick={(event) => {
      const result = resolvePdfCapability({ id: evidence.id, title: evidence.title, description: evidence.caption, context: evidence.kind, href: evidence.full.source, mediaType: 'application/pdf' })
      if (result.ok) viewer.openPdf(result.capability, event.currentTarget)
    }}
  >{children ?? `Open ${evidence.title}`}</button>
  return <a
    href={evidence.full.source}
    target={newTab ? '_blank' : undefined}
    rel={newTab ? 'noopener noreferrer' : undefined}
    aria-label={evidence.accessibleText}
    data-testid="evidence-open-action"
    {...props}
  >{children ?? `Open ${evidence.title}`}</a>
}
