import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../../src/portfolio/styles/tokens.css'
import '../../../src/portfolio/styles/foundations.css'
import { PortfolioExperience } from '../../../src/portfolio/shell/PortfolioExperience'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioExperience />
  </StrictMode>,
)
