import type { ResearchEvidenceCapability } from './research.types'
import styles from './ResearchData.module.css'

export function ResearchEvidenceAction({ capability }: Readonly<{ capability: ResearchEvidenceCapability }>) {
  const type = capability.evidence.full.mediaKind === 'pdf' ? 'PDF' : 'image'
  return <a
    className={styles.evidenceAction}
    href={capability.evidence.full.source}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${capability.purpose} for this project, ${type}; opens in a new tab`}
    data-testid={capability.testId}
  >
    <span>{capability.purpose}</span>
    <small>{type} · open evidence ↗</small>
  </a>
}
