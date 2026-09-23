type ProbeTheme = 'light' | 'dark'

const query = new URLSearchParams(window.location.search)
const enabled = query.get('u02-probe') === '1'
const theme = query.get('theme') === 'dark' ? 'dark' : 'light'
let cumulativeLayoutShift = 0

type LayoutShiftEntry = PerformanceEntry & Readonly<{ value: number; hadRecentInput: boolean }>
if (enabled && 'PerformanceObserver' in window) {
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as LayoutShiftEntry[]) if (!entry.hadRecentInput) cumulativeLayoutShift += entry.value
    }).observe({ type: 'layout-shift', buffered: true })
  } catch { /* unsupported metric is reported as zero by the local candidate probe */ }
}

export function configureCandidateProbe() {
  if (!enabled) return
  window.localStorage.setItem('portfolio-theme', theme)
  if (query.get('textSpacing') === '1') {
    const style = document.createElement('style')
    style.dataset.u02Probe = 'text-spacing'
    style.textContent = '*{letter-spacing:.12em!important;word-spacing:.16em!important;line-height:1.8!important}'
    document.head.append(style)
  }
  const zoom = Number(query.get('zoom') ?? '1')
  if (Number.isFinite(zoom) && zoom > 1) document.documentElement.style.fontSize = `${zoom * 100}%`
}

const parseRgb = (value: string) => (value.match(/[\d.]+/gu) ?? []).slice(0, 3).map(Number)
const luminance = ([red = 0, green = 0, blue = 0]: number[]) => {
  const channels = [red, green, blue].map((channel) => {
    const normalized = channel / 255
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
  })
  return channels[0]! * 0.2126 + channels[1]! * 0.7152 + channels[2]! * 0.0722
}
const contrast = (foreground: string, background: string) => {
  const first = luminance(parseRgb(foreground))
  const second = luminance(parseRgb(background))
  return Number(((Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)).toFixed(2))
}

export function scheduleCandidateProbe() {
  if (!enabled) return
  window.setTimeout(() => {
    const requestedSection = window.location.hash.slice(1)
    if (requestedSection === 'top') window.scrollTo(0, 0)
    else document.getElementById(requestedSection)?.scrollIntoView({ block: 'start' })
    const themeControl = document.querySelector<HTMLElement>('[data-testid="theme-control-button"]')
    const masthead = document.querySelector<HTMLElement>('[data-testid="observatory-masthead"]')
    const defectSelectors = [
      '[data-testid="laboratory-research-body"]',
      '[data-testid="computational-projects-body"]',
      '[data-testid="research-questions-body"]',
      '[data-testid="data-stories-body"]',
      '[data-testid="academic-trajectory-body"]',
      '[data-testid="evidence-spectrum-summary"]',
    ]
    const defectOverflow = defectSelectors.map((selector) => {
      const element = document.querySelector<HTMLElement>(selector)
      return { selector, present: Boolean(element), overflowPixels: element ? Math.max(0, element.scrollWidth - element.clientWidth) : null }
    })
    const controlStyle = themeControl ? getComputedStyle(themeControl) : null
    const rect = themeControl?.getBoundingClientRect()
    const report = {
      caseId: query.get('case') ?? 'unknown',
      theme: theme as ProbeTheme,
      width: window.innerWidth,
      height: window.innerHeight,
      documentOverflowPixels: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
      cumulativeLayoutShift: Number(cumulativeLayoutShift.toFixed(4)),
      tableCount: document.querySelectorAll('table').length,
      semanticSummaryCount: document.querySelectorAll('[data-testid$="relationship-summary"]').length,
      sectionCount: document.querySelectorAll('main section[aria-labelledby]').length,
      themeControl: {
        inMasthead: Boolean(themeControl && masthead?.contains(themeControl)),
        label: themeControl?.getAttribute('aria-label') ?? null,
        width: rect ? Number(rect.width.toFixed(2)) : null,
        height: rect ? Number(rect.height.toFixed(2)) : null,
        contrast: controlStyle ? contrast(controlStyle.color, controlStyle.backgroundColor) : null,
      },
      resumeActionCount: masthead?.querySelectorAll('a[download]').length ?? 0,
      defectOverflow,
    }
    const result = document.createElement('script')
    result.id = 'u02-probe-results'
    result.type = 'application/json'
    result.textContent = JSON.stringify(report)
    document.body.append(result)
    document.documentElement.dataset.u02ProbeComplete = 'true'
  }, 250)
}
