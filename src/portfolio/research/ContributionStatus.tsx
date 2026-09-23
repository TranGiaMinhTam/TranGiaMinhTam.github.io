import type { ContributionDisclosure } from './research.types'
import styles from './ResearchData.module.css'

export function ContributionStatus({ contribution }: Readonly<{ contribution: ContributionDisclosure }>) {
  return <p className={styles.contribution} data-contribution={contribution.kind}>
    <span aria-hidden="true">{contribution.kind === 'verified-context' ? '●' : '○'}</span>
    <strong>Contribution</strong>
    <span>{contribution.label}</span>
  </p>
}
