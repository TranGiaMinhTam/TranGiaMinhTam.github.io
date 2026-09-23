import {
  createReviewCases,
  sections,
  supplementalCases as alignmentCases,
  themes,
  widths,
} from '../masthead-alignment-review/cases.mjs'

export { createReviewCases, sections, themes, widths }

export const supplementalCases = Object.freeze([
  ...alignmentCases,
  { id: 'resume-keyboard', section: 'identity', width: 1440, height: 1000, theme: 'light', textSpacing: false, zoom: 1, keyboard: true },
  { id: 'resume-forced-colors', section: 'academic-trajectory', width: 760, height: 900, theme: 'dark', textSpacing: false, zoom: 1, forcedColors: true },
  { id: 'resume-request-audit', section: 'identity', width: 1100, height: 1000, theme: 'light', textSpacing: false, zoom: 1, requestAudit: true },
  { id: 'resume-academic-content', section: 'academic-trajectory', width: 1100, height: 1000, theme: 'light', textSpacing: false, zoom: 1, screenshotTarget: '[data-testid="resume-content-academic-trajectory"]' },
  { id: 'resume-fieldwork-content', section: 'fieldwork-leadership', width: 760, height: 1000, theme: 'dark', textSpacing: false, zoom: 1, screenshotTarget: '[data-testid="resume-content-fieldwork-leadership"]' },
  { id: 'protein-docking-gallery', section: 'computational-projects', width: 1440, height: 1000, theme: 'light', textSpacing: false, zoom: 1, screenshotTarget: '[aria-label="2026 protein docking project visuals"]' },
])
