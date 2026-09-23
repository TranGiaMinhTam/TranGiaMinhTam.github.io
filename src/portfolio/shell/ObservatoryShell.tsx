import { sectionRegistry } from '../model/sectionRegistry'
import type { SectionId } from '../model/portfolio.types'
import type { MastheadResumeAction, ProgressState, ShellFinding, ThemeState } from './shell.types'
import { LocusNavigator } from './LocusNavigator'
import { ObservatoryFooter } from './ObservatoryFooter'
import { RegisteredSectionSlot } from './RegisteredSectionSlot'
import { SectionProgress } from './SectionProgress'
import type { SectionBodyRegistry } from './SectionBodyResolver'
import { SpecimenMasthead } from './SpecimenMasthead'
import styles from './Shell.module.css'

type Props = Readonly<{
  activeSectionId: SectionId
  progress: ProgressState
  theme: ThemeState
  findings: readonly ShellFinding[]
  onNavigate: (sectionId: SectionId) => boolean
  onRegister: (sectionId: SectionId, element: HTMLElement | null) => void
  onToggleTheme: () => void
  sectionBodies?: SectionBodyRegistry
  resumeAction?: MastheadResumeAction
}>

export function ObservatoryShell(props: Props) {
  return <div className={styles.observatory} data-testid="portfolio-observatory">
    <a className={styles.skipLink} href="#scan-field" data-testid="skip-to-scan-field">Skip to research field</a>
    <SpecimenMasthead theme={props.theme} onToggleTheme={props.onToggleTheme} resumeAction={props.resumeAction} />
    <div className={styles.navigationBand}>
      <LocusNavigator activeSectionId={props.activeSectionId} onNavigate={props.onNavigate} />
    </div>
    <SectionProgress progress={props.progress} />
    <main id="scan-field" className={styles.scanField} data-testid="portfolio-main">
      <h1 className={styles.visuallyHidden}>Tran Gia Minh Tam scientific portfolio</h1>
      {sectionRegistry.map((section) => <RegisteredSectionSlot
        key={section.id}
        section={section}
        onRegister={props.onRegister}
        bodies={props.sectionBodies}
        onNavigate={props.onNavigate}
      />)}
    </main>
    {props.findings.length > 0 ? <div className={styles.capabilityNote} role="status">
      {props.findings.at(-1)?.message}
    </div> : null}
    <ObservatoryFooter />
  </div>
}
