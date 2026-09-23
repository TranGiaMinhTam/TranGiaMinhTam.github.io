import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../../src/portfolio/styles/tokens.css'
import '../../../src/portfolio/styles/foundations.css'
import { academicEvidenceBodyRegistry } from '../../../src/portfolio/academics/sectionBodies'
import { identityQuestionBodyRegistry } from '../../../src/portfolio/identity/sectionBodies'
import { toolsFieldworkBodyRegistry } from '../../../src/portfolio/impact/sectionBodies'
import { composePortfolioBodyRegistries, researchDataBodyRegistry } from '../../../src/portfolio/research/sectionBodies'
import { PortfolioExperience } from '../../../src/portfolio/shell/PortfolioExperience'

const candidateBodies = composePortfolioBodyRegistries(
  identityQuestionBodyRegistry,
  researchDataBodyRegistry,
  academicEvidenceBodyRegistry,
  toolsFieldworkBodyRegistry,
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioExperience sectionBodies={candidateBodies} />
  </StrictMode>,
)
