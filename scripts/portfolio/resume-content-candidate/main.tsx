import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../../src/portfolio/styles/tokens.css'
import '../../../src/portfolio/styles/foundations.css'
import { academicEvidenceBodyRegistry } from '../../../src/portfolio/academics'
import { contactBodyRegistry } from '../../../src/portfolio/contact'
import { createIdentityQuestionBodyRegistry } from '../../../src/portfolio/identity'
import { toolsFieldworkBodyRegistry } from '../../../src/portfolio/impact'
import { JournalRoute } from '../../../src/portfolio/journal'
import { composePortfolioBodyRegistries, researchDataBodyRegistry } from '../../../src/portfolio/research'
import {
  decorateRegistryWithResumeContent,
  resumeContentSelection,
  resumeDownload,
  toMastheadResumeAction,
} from '../../../src/portfolio/resume'
import { PortfolioExperience } from '../../../src/portfolio/shell/PortfolioExperience'
import { configureCandidateProbe, scheduleCandidateProbe } from '../resume-content-review/probe'

configureCandidateProbe()

if (!resumeContentSelection.ok) throw new Error('U03_RESUME_CONTENT_NOT_ADMITTED')

const baseBodies = composePortfolioBodyRegistries(
  createIdentityQuestionBodyRegistry(resumeDownload),
  researchDataBodyRegistry,
  academicEvidenceBodyRegistry,
  toolsFieldworkBodyRegistry,
  contactBodyRegistry,
)
const candidateBodies = decorateRegistryWithResumeContent(baseBodies, resumeContentSelection.value.sections)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JournalRoute>
      <PortfolioExperience
        sectionBodies={candidateBodies}
        resumeAction={toMastheadResumeAction(resumeDownload)}
      />
    </JournalRoute>
  </StrictMode>,
)

scheduleCandidateProbe()
