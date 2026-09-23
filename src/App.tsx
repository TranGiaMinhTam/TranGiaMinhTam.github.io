import { academicEvidenceBodyRegistry } from './portfolio/academics'
import { contactBodyRegistry } from './portfolio/contact'
import { createIdentityQuestionBodyRegistry } from './portfolio/identity'
import { toolsFieldworkBodyRegistry } from './portfolio/impact'
import { JournalRoute } from './portfolio/journal'
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
  academicEvidenceBodyRegistry,
  toolsFieldworkBodyRegistry,
  contactBodyRegistry,
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
  return <PortfolioApp />
}

export default App
