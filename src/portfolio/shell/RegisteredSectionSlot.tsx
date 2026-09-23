import type { SectionDefinition, SectionId } from '../model/portfolio.types'
import { useCallback } from 'react'
import { SectionRegion } from '../shared/SectionRegion'
import { SectionBodyResolver, type SectionBodyRegistry } from './SectionBodyResolver'
import styles from './Shell.module.css'

export function RegisteredSectionSlot({
  section,
  onRegister,
  bodies,
  onNavigate,
}: Readonly<{
  section: SectionDefinition
  onRegister: (sectionId: SectionId, element: HTMLElement | null) => void
  bodies?: SectionBodyRegistry
  onNavigate: (sectionId: SectionId) => boolean
}>) {
  const register = useCallback((element: HTMLDivElement | null) => {
    onRegister(section.id, element)
  }, [onRegister, section.id])
  const hasCustomBody = Boolean(bodies?.[section.id])

  return <div
    className={styles.sectionAnchor}
    ref={register}
    data-testid={`section-target-${section.id}`}
  >
    <SectionRegion
      id={section.id}
      title={section.label}
      eyebrow={`Research locus ${String(section.order).padStart(2, '0')}`}
      className={styles.scanSection}
      data-custom-body={hasCustomBody || undefined}
    >
      <SectionBodyResolver section={section} bodies={bodies} onNavigate={onNavigate} />
    </SectionRegion>
  </div>
}
