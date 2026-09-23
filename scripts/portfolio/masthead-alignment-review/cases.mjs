export const sections = Object.freeze([
  'identity', 'questions', 'computational-projects', 'laboratory-research', 'data-stories',
  'academic-trajectory', 'evidence-library', 'tools', 'fieldwork-leadership', 'contact',
])
export const widths = Object.freeze([320, 760, 1100, 1440])
export const themes = Object.freeze(['light', 'dark'])

export const createReviewCases = () => Object.freeze(sections.flatMap((section) => widths.flatMap((width) => themes.map((theme) => Object.freeze({
  id: `${section}-${width}-${theme}`,
  section,
  width,
  height: width <= 760 ? 900 : 1000,
  theme,
  textSpacing: false,
  zoom: 1,
})))))

export const supplementalCases = Object.freeze([
  { id: 'masthead-1440-light', section: 'top', width: 1440, height: 900, theme: 'light', textSpacing: false, zoom: 1 },
  { id: 'masthead-1440-dark', section: 'top', width: 1440, height: 900, theme: 'dark', textSpacing: false, zoom: 1 },
  { id: 'questions-zoom-200', section: 'questions', width: 1440, height: 1000, theme: 'light', textSpacing: false, zoom: 2 },
  { id: 'academics-text-spacing', section: 'academic-trajectory', width: 1100, height: 1000, theme: 'dark', textSpacing: true, zoom: 1 },
])
