type ProbeTheme = 'light' | 'dark'

const query = new URLSearchParams(window.location.search)
const enabled = query.get('u03-resume-probe') === '1'
const theme = query.get('theme') === 'dark' ? 'dark' : 'light'
let cumulativeLayoutShift = 0

type LayoutShiftEntry = PerformanceEntry & Readonly<{ value: number; hadRecentInput: boolean }>
if (enabled && 'PerformanceObserver' in window) {
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as LayoutShiftEntry[]) if (!entry.hadRecentInput) cumulativeLayoutShift += entry.value
    }).observe({ type: 'layout-shift', buffered: true })
  } catch { /* unsupported metrics are recorded by the review adapter */ }
}

export function configureCandidateProbe() {
  if (!enabled) return
  window.localStorage.setItem('portfolio-theme', theme)
  if (query.get('textSpacing') === '1') {
    const style = document.createElement('style')
    style.dataset.u03ResumeProbe = 'text-spacing'
    style.textContent = '*{letter-spacing:.12em!important;word-spacing:.16em!important;line-height:1.8!important}'
    document.head.append(style)
  }
  const zoom = Number(query.get('zoom') ?? '1')
  if (Number.isFinite(zoom) && zoom > 1) document.documentElement.style.fontSize = `${zoom * 100}%`
}

export function scheduleCandidateProbe() {
  if (!enabled) return
  window.setTimeout(() => {
    const requestedSection = window.location.hash.slice(1)
    document.getElementById(requestedSection)?.scrollIntoView({ block: 'start' })
    const mastheadDownload = document.querySelector<HTMLAnchorElement>('[data-testid="resume-download-masthead"]')
    const identityDownload = document.querySelector<HTMLAnchorElement>('[data-testid="resume-download-identity"]')
    const groups = [...document.querySelectorAll<HTMLElement>('[data-testid^="resume-content-"]')]
    const resources = performance.getEntriesByType('resource').map(({ name }) => name)
    const report = {
      caseId: query.get('case') ?? 'unknown',
      theme: theme as ProbeTheme,
      width: window.innerWidth,
      height: window.innerHeight,
      documentOverflowPixels: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
      cumulativeLayoutShift: Number(cumulativeLayoutShift.toFixed(4)),
      sectionCount: document.querySelectorAll('main [data-testid^="section-target-"]').length,
      visibleTableCount: [...document.querySelectorAll('table')].filter((table) => getComputedStyle(table).display !== 'none').length,
      resumeGroupCount: groups.length,
      resumeClaimCount: document.querySelectorAll('[data-resume-claim]').length,
      authorityLabelCount: document.querySelectorAll('[data-authority]').length,
      downloadCount: document.querySelectorAll('[data-testid^="resume-download-"]').length,
      downloadsMatch: Boolean(mastheadDownload && identityDownload
        && mastheadDownload.href === identityDownload.href
        && mastheadDownload.download === identityDownload.download),
      eagerResumeRequestCount: resources.filter((name) => /Tran-Gia-Minh-Tam-Resume[^/]*\.pdf(?:$|\?)/u.test(name)).length,
    }
    const result = document.createElement('script')
    result.id = 'u03-resume-probe-results'
    result.type = 'application/json'
    result.textContent = JSON.stringify(report)
    document.body.append(result)
    document.documentElement.dataset.u03ResumeProbeComplete = 'true'
  }, 300)
}
