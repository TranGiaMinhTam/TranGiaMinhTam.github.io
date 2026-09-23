import type { MastheadResumeAction, ThemeState } from './shell.types'
import { createMastheadPresentation } from './mastheadModel'
import { ThemeControl } from './ThemeControl'
import styles from './Shell.module.css'

export function SpecimenMasthead({ theme, onToggleTheme, resumeAction }: Readonly<{
  theme: ThemeState
  onToggleTheme: () => void
  resumeAction?: MastheadResumeAction
}>) {
  const presentation = createMastheadPresentation(theme.theme)
  return <header className={styles.masthead} data-testid="observatory-masthead">
    <div className={styles.brandLockup}>
      <span className={styles.specimenCode}>SPECIMEN / TGMT-01</span>
      <strong className={styles.brandName}>Minh Tam</strong>
    </div>
    <div className={styles.mastheadField}>
      <span className={styles.fieldRule} aria-hidden="true" />
      <p className={styles.fieldLabel}>Computational biology · data inquiry · field observation</p>
    </div>
    <div className={styles.mastheadMeta}>
      <div className={styles.statusSignal} aria-label={presentation.statusLabel}>
        <span aria-hidden="true" /> Active profile
      </div>
      <div className={styles.mastheadActions}>
        {resumeAction ? <a
          className={styles.resumeAction}
          href={resumeAction.href}
          download={resumeAction.download}
          data-testid="resume-download-masthead"
        >{resumeAction.label}</a> : null}
        <ThemeControl theme={theme} onToggle={onToggleTheme} />
      </div>
    </div>
  </header>
}
