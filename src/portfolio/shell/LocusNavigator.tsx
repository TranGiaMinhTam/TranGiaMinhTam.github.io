import { sectionRegistry } from '../model/sectionRegistry'
import type { SectionId } from '../model/portfolio.types'
import styles from './Shell.module.css'

type Props = Readonly<{
  activeSectionId: SectionId
  onNavigate: (sectionId: SectionId) => boolean
}>

export function LocusNavigator({ activeSectionId, onNavigate }: Props) {
  return <nav className={styles.locusNavigation} aria-label="Research domains" data-testid="locus-navigation">
    <div className={styles.coordinateRail}>
      {sectionRegistry.map((section) => <a
        key={section.id}
        className={styles.locusLink}
        href={section.hash}
        aria-current={activeSectionId === section.id ? 'location' : undefined}
        data-testid={`locus-link-${section.id}`}
        onClick={(event) => {
          if (onNavigate(section.id)) event.preventDefault()
        }}
      >
        <span className={styles.locusIndex}>{String(section.order).padStart(2, '0')}</span>
        <span>{section.shortLabel}</span>
      </a>)}
    </div>
  </nav>
}

