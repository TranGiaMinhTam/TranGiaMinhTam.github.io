import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../../src/portfolio/styles/tokens.css'
import '../../../src/portfolio/styles/foundations.css'
import { PortfolioApp } from '../../../src/App'
import { MediaViewerProvider } from '../../../src/portfolio/media-viewer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MediaViewerProvider>
      <PortfolioApp />
    </MediaViewerProvider>
  </StrictMode>,
)
