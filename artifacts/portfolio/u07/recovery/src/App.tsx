import { academicEvidenceBodyRegistry } from './portfolio/academics'
import { identityQuestionBodyRegistry } from './portfolio/identity'
import { toolsFieldworkBodyRegistry } from './portfolio/impact'
import { composePortfolioBodyRegistries, researchDataBodyRegistry } from './portfolio/research'
import { PortfolioExperience } from './portfolio/shell/PortfolioExperience'

const portfolioBodyRegistry = composePortfolioBodyRegistries(
  identityQuestionBodyRegistry,
  researchDataBodyRegistry,
  academicEvidenceBodyRegistry,
  toolsFieldworkBodyRegistry,
)

export function PortfolioApp() {
  return <PortfolioExperience sectionBodies={portfolioBodyRegistry} />
}

function App() {
  return <PortfolioApp />
}

export default App
