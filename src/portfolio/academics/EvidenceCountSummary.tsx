import type { EvidenceSpectrumEntry } from './academic.types'
import styles from './AcademicEvidence.module.css'

export function EvidenceCountSummary({ entries }: Readonly<{ entries: readonly EvidenceSpectrumEntry[] }>) {
  const max = Math.max(1, ...entries.map(({ count }) => count))
  return <div className={styles.spectrumBlock} data-testid="evidence-spectrum-summary">
    <div className={styles.spectrumVisual} aria-hidden="true">
      {entries.map((entry) => <div className={styles.spectrumTrack} key={entry.id}>
        <span>{entry.marker}</span>
        <i style={{ inlineSize: `${Math.max(12, (entry.count / max) * 100)}%` }} />
        <b>{entry.count}</b>
      </div>)}
    </div>
    <dl className={styles.spectrumSemantic} aria-label="Evidence library counts">
      {entries.map((entry) => <div key={entry.id} data-spectrum-id={entry.id}>
        <dt>{entry.label}</dt>
        <dd>{entry.count} {entry.count === 1 ? 'record' : 'records'}</dd>
      </div>)}
    </dl>
  </div>
}
