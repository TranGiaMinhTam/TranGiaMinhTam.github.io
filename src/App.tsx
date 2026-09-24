import { completeArchiveCandidateRegistry } from './portfolio/academics/candidateSectionBodies'
import { portfolioContactCandidateRegistry } from './portfolio/contact/candidateSectionBodies'
import { createIdentityQuestionBodyRegistry } from './portfolio/identity'
import { toolsFieldworkBodyRegistry } from './portfolio/impact'
import { JournalRoute } from './portfolio/journal'
import { MediaViewerProvider } from './portfolio/media-viewer'
import { composePortfolioBodyRegistries, researchDataBodyRegistry } from './portfolio/research'
import {
  decorateRegistryWithResumeContent,
  resumeContentSelection,
  resumeDownload,
  toMastheadResumeAction,
} from './portfolio/resume'
import { PortfolioExperience } from './portfolio/shell/PortfolioExperience'

if (!resumeContentSelection.ok) throw new Error('U03_RESUME_CONTENT_NOT_ADMITTED')

const baseBodyRegistry = composePortfolioBodyRegistries(
  createIdentityQuestionBodyRegistry(resumeDownload),
  researchDataBodyRegistry,
  completeArchiveCandidateRegistry,
  toolsFieldworkBodyRegistry,
  portfolioContactCandidateRegistry,
)
const portfolioBodyRegistry = decorateRegistryWithResumeContent(
  baseBodyRegistry,
  resumeContentSelection.value.sections,
)

export function PortfolioApp() {
  return <JournalRoute>
    <PortfolioExperience
      sectionBodies={portfolioBodyRegistry}
      resumeAction={toMastheadResumeAction(resumeDownload)}
    />
  </JournalRoute>
}

function App() {
  return <MediaViewerProvider>
    <PortfolioApp />
  </MediaViewerProvider>
}

export default App
