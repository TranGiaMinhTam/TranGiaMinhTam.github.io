import {
  identityQuestionEvidenceManifest,
  verifiedIdentityQuestionsSource,
} from '../model/verifiedIdentityQuestionsSource'
import type { SectionBodyRegistry } from '../shell/SectionBodyResolver'
import type { DownloadableResume } from '../resume/resume.types'
import { assembleIdentityQuestions } from './identityQuestionsModel'
import { ResearchIdentity } from './ResearchIdentity'
import { ResearchQuestions } from './ResearchQuestions'
import styles from './IdentityQuestions.module.css'

export const identityQuestionsSelection = assembleIdentityQuestions(
  verifiedIdentityQuestionsSource,
  identityQuestionEvidenceManifest,
)

const unavailable = identityQuestionsSelection.ok ? null : <div className={styles.validationFailure} role="status">
  <p>Section content is unavailable.</p>
  <small>{identityQuestionsSelection.findings.map((finding) => finding.code).join(' · ')}</small>
</div>

export const createIdentityQuestionBodyRegistry = (resumeDownload?: DownloadableResume): SectionBodyRegistry => Object.freeze({
  identity: ({ onNavigate }) => identityQuestionsSelection.ok
    ? <ResearchIdentity identity={identityQuestionsSelection.value.identity} resumeDownload={resumeDownload} onNavigate={onNavigate} />
    : unavailable,
  questions: () => identityQuestionsSelection.ok
    ? <ResearchQuestions model={identityQuestionsSelection.value.questions} />
    : unavailable,
})

export const identityQuestionBodyRegistry = createIdentityQuestionBodyRegistry()
