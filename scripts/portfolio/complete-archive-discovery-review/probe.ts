const query = new URLSearchParams(window.location.search)
const enabled = query.get('u04-archive-probe') === '1'

export function configureCandidateProbe() {
  if (!enabled) return
  window.localStorage.setItem('portfolio-theme', query.get('theme') === 'dark' ? 'dark' : 'light')
  if (query.get('textSpacing') === '1') {
    const style = document.createElement('style')
    style.textContent = '*{letter-spacing:.12em;word-spacing:.16em;line-height:1.8}'
    document.head.append(style)
  }
  const zoom = Number(query.get('zoom') ?? '1')
  if (Number.isFinite(zoom) && zoom > 1) document.documentElement.style.fontSize = `${zoom * 100}%`
}

export function scheduleCandidateProbe() {
  if (!enabled) return
  window.setTimeout(() => {
    const section = query.get('section')
    const sectionTarget = section ? document.getElementById(section) : null
    if (sectionTarget) {
      document.documentElement.style.scrollBehavior = 'auto'
      sectionTarget.scrollIntoView({ block: 'start', behavior: 'auto' })
    }
    const group = query.get('group')
    if (group) document.querySelector<HTMLButtonElement>(`[data-archive-summary="${CSS.escape(group)}"]`)?.click()
    window.setTimeout(() => {
      if (group) document.querySelector<HTMLElement>('[data-archive-group]')?.scrollIntoView({ block: 'start', behavior: 'auto' })
      if (query.get('focusAction') === '1') {
        const action = [...document.querySelectorAll<HTMLButtonElement>('button')].find(({ textContent }) => /open email draft/i.test(textContent ?? ''))
        action?.scrollIntoView({ block: 'center', behavior: 'auto' })
      }
      const resources = performance.getEntriesByType('resource').map(({ name }) => name)
      const sectionRect = sectionTarget?.getBoundingClientRect()
      const report = {
        caseId: query.get('case') ?? 'unknown',
        width: window.innerWidth,
        theme: query.get('theme') === 'dark' ? 'dark' : 'light',
        overflowPixels: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
        summaryCount: document.querySelectorAll('[data-archive-summary]').length,
        expandedSummaryCount: document.querySelectorAll('[data-archive-summary][aria-expanded="true"]').length,
        loadedItemCount: document.querySelectorAll('[data-archive-item]').length,
        dialogCount: document.querySelectorAll('dialog,[role="dialog"],iframe,object,embed').length,
        contactHeadingCount: [...document.querySelectorAll('h1,h2,h3')].filter(({ textContent }) => textContent?.trim() === 'Let us connect.').length,
        openDraftActionCount: [...document.querySelectorAll('button')].filter(({ textContent }) => /open email draft/i.test(textContent ?? '')).length,
        requestedPdfCount: resources.filter((name) => /\.pdf(?:$|\?)/iu.test(name)).length,
        sectionTargetFound: Boolean(sectionTarget),
        sectionTop: sectionRect ? Math.round(sectionRect.top) : null,
        sectionInViewport: Boolean(sectionRect && sectionRect.top <= 100 && sectionRect.bottom > 100),
      }
      const output = document.createElement('script')
      output.id = 'u04-archive-probe-results'
      output.type = 'application/json'
      output.textContent = JSON.stringify(report)
      document.body.append(output)
    }, group ? 800 : 250)
  }, 350)
}
