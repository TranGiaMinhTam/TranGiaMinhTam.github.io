import type { MouseEvent } from 'react'
import type { SectionId } from '../model/portfolio.types'
import { ResumeAction } from '../resume/ResumeAction'
import type { DownloadableResume } from '../resume/resume.types'
import type { PendingCurriculumVitae } from './identity.types'
import styles from './IdentityQuestions.module.css'

export function IdentityActions({
  curriculumVitae,
  resumeDownload,
  questionsTarget,
  onNavigate,
}: Readonly<{
  curriculumVitae: PendingCurriculumVitae
  resumeDownload?: DownloadableResume
  questionsTarget: 'questions'
  onNavigate: (sectionId: SectionId) => boolean
}>) {
  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate(questionsTarget)) event.preventDefault()
  }

  return <nav className={styles.identityActions} aria-label="Research identity actions">
    {resumeDownload
      ? <ResumeAction
          className={styles.primaryAction}
          download={resumeDownload}
          label="Download resume"
          testId="resume-download-identity"
        />
      : <span
          className={styles.pendingAction}
          role="status"
          aria-label={`${curriculumVitae.label}. ${curriculumVitae.statusText}.`}
          aria-disabled="true"
          data-testid="identity-cv-status"
        >
          <span>{curriculumVitae.label}</span>
          <span>{curriculumVitae.statusText}</span>
        </span>}
    <a
      className={styles.secondaryAction}
      href={`#${questionsTarget}`}
      onClick={navigate}
      data-testid="identity-questions-link"
    >
      <span>Explore research questions</span>
      <span aria-hidden="true">↘ locus 02</span>
    </a>
  </nav>
}
