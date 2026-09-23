import type { SectionId } from '../model/portfolio.types'
import type { DownloadableResume } from '../resume/resume.types'
import { ExplorationSpectrum } from './ExplorationSpectrum'
import { IdentityActions } from './IdentityActions'
import type { ResearchIdentityViewModel } from './identity.types'
import { PortraitAperture } from './PortraitAperture'
import styles from './IdentityQuestions.module.css'

export function ResearchIdentity({
  identity,
  resumeDownload,
  onNavigate,
}: Readonly<{
  identity: ResearchIdentityViewModel
  resumeDownload?: DownloadableResume
  onNavigate: (sectionId: SectionId) => boolean
}>) {
  return <div className={styles.identityField} data-testid="research-identity-body">
    <div className={styles.identityWordmark}>
      <p className={styles.fieldCode}>BIO · DATA · INQUIRY / 01</p>
      <p className={styles.identityName}>{identity.name}</p>
      <p className={styles.identityRole}>{identity.role}</p>
    </div>

    <div className={styles.identityMeta} aria-label="Identity metadata">
      <span>Based in {identity.location}</span>
      <span>Student-led inquiry</span>
      <span>Science and data portfolio</span>
    </div>

    <p className={styles.identitySummary}>{identity.summary}</p>
    <PortraitAperture portrait={identity.portrait} />
    <ExplorationSpectrum direction={identity.direction} topics={identity.fieldsInExploration} />
    <IdentityActions
      curriculumVitae={identity.curriculumVitae}
      resumeDownload={resumeDownload}
      questionsTarget={identity.questionsTarget}
      onNavigate={onNavigate}
    />
  </div>
}
