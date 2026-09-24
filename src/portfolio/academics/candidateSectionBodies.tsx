import type { SectionBodyRegistry } from '../shell/SectionBodyResolver'
import { AcademicTrajectory } from './AcademicTrajectory'
import styles from './AcademicEvidence.module.css'
import { academicEvidenceSelection } from './sectionBodies'
import { CompleteEvidenceLibrary } from './CompleteEvidenceLibrary'

const unavailable = <div className={styles.validationFailure} role="status">
  <p>Academic and project content is unavailable.</p>
</div>

export const completeArchiveCandidateRegistry: SectionBodyRegistry = Object.freeze({
  'academic-trajectory': () => academicEvidenceSelection.ok
    ? <AcademicTrajectory model={academicEvidenceSelection.value.trajectory} />
    : unavailable,
  'evidence-library': () => <CompleteEvidenceLibrary />,
})
