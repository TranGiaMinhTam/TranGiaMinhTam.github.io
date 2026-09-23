import type { AnchorHTMLAttributes, ReactNode } from 'react'
import type { PublishedEvidence } from '../model/portfolio.types'

export type EvidenceActionProps = Readonly<{
  evidence: PublishedEvidence
  children?: ReactNode
  newTab?: boolean
}> & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'>

export function EvidenceAction({ evidence, children, newTab = true, ...props }: EvidenceActionProps) {
  return <a
    href={evidence.full.source}
    target={newTab ? '_blank' : undefined}
    rel={newTab ? 'noopener noreferrer' : undefined}
    aria-label={evidence.accessibleText}
    data-testid="evidence-open-action"
    {...props}
  >{children ?? `Open ${evidence.title}`}</a>
}
