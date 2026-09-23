import type { ReactNode } from 'react'
import type { SectionDefinition, SectionId } from '../model/portfolio.types'
import styles from './Shell.module.css'

export type SectionBodyContext = Readonly<{
  onNavigate: (sectionId: SectionId) => boolean
}>

export type SectionBodyFactory = (context: SectionBodyContext) => ReactNode
export type SectionBodyRegistry = Readonly<Partial<Record<SectionId, SectionBodyFactory>>>

export function TemporarySectionBody({ section }: Readonly<{ section: SectionDefinition }>) {
  return <div className={styles.slotBody} data-testid={`temporary-section-body-${section.id}`}>
    <span className={styles.sequenceMark} aria-hidden="true">
      {section.order % 2 === 0 ? 'A—T / C—G' : 'C—G / T—A'}
    </span>
    <p>Domain module scheduled for a future release.</p>
    <small>Stable target · {section.hash} · registry order {section.order}</small>
  </div>
}

export function SectionBodyResolver({
  section,
  bodies,
  onNavigate,
}: Readonly<{
  section: SectionDefinition
  bodies?: SectionBodyRegistry
  onNavigate: (sectionId: SectionId) => boolean
}>) {
  const Body = bodies?.[section.id]
  return Body ? <>{Body({ onNavigate })}</> : <TemporarySectionBody section={section} />
}
