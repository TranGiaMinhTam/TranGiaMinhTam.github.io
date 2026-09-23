import type { ProgressState } from './shell.types'
import styles from './Shell.module.css'

export function SectionProgress({ progress }: Readonly<{ progress: ProgressState }>) {
  return <div className={styles.progressBand} data-testid="section-progress">
    <div className={styles.progressReadout}>
      <span className={styles.progressCode}>LOCUS {String(progress.ordinal).padStart(2, '0')}</span>
      <strong>{progress.label}</strong>
      <span role="status" aria-live="polite" data-testid="section-progress-status">
        Section {progress.ordinal} of {progress.count}
      </span>
    </div>
    <div className={styles.progressTrack} aria-hidden="true">
      <span className={styles.progressFill} style={{ width: `${progress.completionRatio * 100}%` }} />
      <span className={styles.progressMarker} style={{ left: `${progress.locusRatio * 100}%` }} />
    </div>
  </div>
}

