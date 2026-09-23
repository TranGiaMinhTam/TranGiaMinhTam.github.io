import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './portfolio/styles/tokens.css'
import './portfolio/styles/foundations.css'
import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
