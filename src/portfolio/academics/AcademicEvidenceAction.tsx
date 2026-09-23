import type { EvidenceCapability } from './academic.types'
import styles from './AcademicEvidence.module.css'

export function AcademicEvidenceAction({ capability, label = 'Open evidence' }: Readonly<{
  capability: EvidenceCapability
  label?: string
}>) {
  const format = capability.evidence.full.mediaKind === 'pdf' ? 'PDF' : 'image'
  return <a
    className={styles.evidenceAction}
    href={capability.evidence.full.source}
    target="_blank"
    rel="noreferrer"
    data-testid={capability.testId}
    aria-label={`${label}: ${capability.purpose}, ${format}, opens in a new tab`}
  >
    <span>{label}</span>
    <span className={styles.actionMeta} aria-hidden="true">{format} ↗</span>
  </a>
}
