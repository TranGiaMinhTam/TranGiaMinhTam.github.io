import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../../src/portfolio/styles/tokens.css'
import '../../../src/portfolio/styles/foundations.css'
import { academicEvidenceBodyRegistry } from '../../../src/portfolio/academics/sectionBodies'
import { contactBodyRegistry } from '../../../src/portfolio/contact/sectionBodies'
import { identityQuestionBodyRegistry } from '../../../src/portfolio/identity/sectionBodies'
import { toolsFieldworkBodyRegistry } from '../../../src/portfolio/impact/sectionBodies'
import { JournalRoute } from '../../../src/portfolio/journal/JournalRoute'
import { composePortfolioBodyRegistries, researchDataBodyRegistry } from '../../../src/portfolio/research/sectionBodies'
import { PortfolioExperience } from '../../../src/portfolio/shell/PortfolioExperience'
import { configureCandidateProbe, scheduleCandidateProbe } from '../masthead-alignment-review/probe'

configureCandidateProbe()

const bodies = composePortfolioBodyRegistries(
  identityQuestionBodyRegistry,
  researchDataBodyRegistry,
  academicEvidenceBodyRegistry,
  toolsFieldworkBodyRegistry,
  contactBodyRegistry,
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JournalRoute><PortfolioExperience sectionBodies={bodies} /></JournalRoute>
  </StrictMode>,
)

scheduleCandidateProbe()
