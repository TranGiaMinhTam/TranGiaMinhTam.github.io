import { evidenceManifest } from '../model/evidenceManifest'
import { verifiedPortfolioSource } from '../model/verifiedPortfolioSource'
import type { SectionBodyRegistry } from '../shell/SectionBodyResolver'
import { AcademicTrajectory } from './AcademicTrajectory'
import styles from './AcademicEvidence.module.css'
import { assembleAcademicEvidence } from './academicEvidenceModel'
import { EvidenceLibrary } from './EvidenceLibrary'

export const academicEvidenceSelection = assembleAcademicEvidence(verifiedPortfolioSource, evidenceManifest)

const unavailable = academicEvidenceSelection.ok ? null : <div className={styles.validationFailure} role="status">
  <p>Academic and project content is unavailable.</p>
  <small>{academicEvidenceSelection.findings.map((finding) => finding.code).join(' · ')}</small>
</div>

export const academicEvidenceBodyRegistry: SectionBodyRegistry = Object.freeze({
  'academic-trajectory': () => academicEvidenceSelection.ok
    ? <AcademicTrajectory model={academicEvidenceSelection.value.trajectory} />
    : unavailable,
  'evidence-library': () => academicEvidenceSelection.ok
    ? <EvidenceLibrary model={academicEvidenceSelection.value.library} />
    : unavailable,
})
