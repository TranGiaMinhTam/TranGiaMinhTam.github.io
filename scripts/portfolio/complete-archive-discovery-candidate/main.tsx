import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../../src/portfolio/styles/tokens.css'
import '../../../src/portfolio/styles/foundations.css'
import { completeArchiveCandidateRegistry } from '../../../src/portfolio/academics/candidateSectionBodies'
import { portfolioContactCandidateRegistry } from '../../../src/portfolio/contact/candidateSectionBodies'
import { createIdentityQuestionBodyRegistry } from '../../../src/portfolio/identity/sectionBodies'
import { toolsFieldworkBodyRegistry } from '../../../src/portfolio/impact/sectionBodies'
import { JournalRoute } from '../../../src/portfolio/journal/JournalRoute'
import { composePortfolioBodyRegistries, researchDataBodyRegistry } from '../../../src/portfolio/research/sectionBodies'
import { decorateRegistryWithResumeContent } from '../../../src/portfolio/resume/resumeRegistry'
import { resumeContentSelection, resumeDownload, toMastheadResumeAction } from '../../../src/portfolio/resume'
import { PortfolioExperience } from '../../../src/portfolio/shell/PortfolioExperience'
import { configureCandidateProbe, scheduleCandidateProbe } from '../complete-archive-discovery-review/probe'

if (!resumeContentSelection.ok) throw new Error('U04_COMPLETE_ARCHIVE_RESUME_NOT_ADMITTED')

configureCandidateProbe()
const candidateBodies = decorateRegistryWithResumeContent(composePortfolioBodyRegistries(
  createIdentityQuestionBodyRegistry(resumeDownload),
  researchDataBodyRegistry,
  completeArchiveCandidateRegistry,
  toolsFieldworkBodyRegistry,
  portfolioContactCandidateRegistry,
), resumeContentSelection.value.sections)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JournalRoute>
      <PortfolioExperience sectionBodies={candidateBodies} resumeAction={toMastheadResumeAction(resumeDownload)} />
    </JournalRoute>
  </StrictMode>,
)

scheduleCandidateProbe()
