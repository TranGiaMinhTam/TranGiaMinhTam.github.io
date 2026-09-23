import type { SectionId } from '../model/portfolio.types'
import type { PortfolioTheme, ShellFinding, VisibilityFact } from './shell.types'
import { THEME_STORAGE_KEY, parseTheme } from './theme'

export type VisibilityController = Readonly<{
  register: (sectionId: SectionId, element: HTMLElement) => void
  unregister: (element: HTMLElement) => void
  disconnect: () => void
}>

export function canEnhanceHistory(browser: Window = window): boolean {
  const history = browser.history as Partial<History> | undefined
  return typeof history?.pushState === 'function' && typeof history.replaceState === 'function'
}

export function writeSectionHistory(
  mode: 'push' | 'replace',
  hash: string,
  browser: Window = window,
): boolean {
  if (!canEnhanceHistory(browser) || browser.location.hash === hash) return false
  const method = mode === 'push' ? 'pushState' : 'replaceState'
  try {
    browser.history[method](null, '', hash)
    return true
  } catch {
    return false
  }
}

export function readStoredTheme(storage: Storage | undefined = safeStorage()): PortfolioTheme | undefined {
  try {
    return parseTheme(storage?.getItem(THEME_STORAGE_KEY))
  } catch {
    return undefined
  }
}

export function persistTheme(
  theme: PortfolioTheme,
  storage: Storage | undefined = safeStorage(),
): boolean {
  try {
    storage?.setItem(THEME_STORAGE_KEY, theme)
    return Boolean(storage)
  } catch {
    return false
  }
}

export function readMediaPreference(query: string, browser: Window = window): boolean | undefined {
  try {
    return typeof browser.matchMedia === 'function' ? browser.matchMedia(query).matches : undefined
  } catch {
    return undefined
  }
}

export function applyRootTheme(theme: PortfolioTheme, root: HTMLElement = document.documentElement) {
  root.dataset.theme = theme
}

export function createVisibilityController(
  onFacts: (facts: readonly VisibilityFact[]) => void,
  onFinding: (finding: ShellFinding) => void,
  browser: Window = window,
): VisibilityController {
  const targets = new Map<HTMLElement, SectionId>()
  let sequence = 0
  let frame: number | undefined
  let disconnected = false

  const emitGeometry = () => {
    frame = undefined
    if (disconnected) return
    try {
      const anchor = Math.max(64, browser.innerHeight * 0.28)
      const facts = [...targets].map(([element, sectionId]) => {
        const rect = element.getBoundingClientRect()
        const visiblePixels = Math.max(0, Math.min(rect.bottom, browser.innerHeight) - Math.max(rect.top, 0))
        return {
          sectionId,
          isIntersecting: visiblePixels > 0,
          ratio: rect.height > 0 ? Math.min(1, visiblePixels / rect.height) : 0,
          anchorDistance: rect.top - anchor,
          sequence,
        }
      })
      sequence += 1
      onFacts(facts)
    } catch {
      onFinding({
        code: 'SHL-GEOMETRY-UNAVAILABLE',
        severity: 'warning',
        capability: 'geometry',
        message: 'Section geometry is unavailable; native anchor navigation remains active.',
      })
    }
  }

  const scheduleGeometry = () => {
    if (frame === undefined && !disconnected) frame = browser.requestAnimationFrame(emitGeometry)
  }

  let observer: IntersectionObserver | undefined
  const Observer = (browser as Window & { IntersectionObserver?: typeof IntersectionObserver }).IntersectionObserver
  if (typeof Observer === 'function') {
    try {
      observer = new Observer((entries: IntersectionObserverEntry[]) => {
        const facts = entries.flatMap((entry) => {
          const sectionId = targets.get(entry.target as HTMLElement)
          return sectionId
            ? [{
                sectionId,
                isIntersecting: entry.isIntersecting,
                ratio: entry.intersectionRatio,
                anchorDistance: entry.boundingClientRect.top - Math.max(64, browser.innerHeight * 0.28),
                sequence,
              }]
            : []
        })
        sequence += 1
        if (facts.length) onFacts(facts)
      }, { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.15, 0.5, 1] })
    } catch {
      observer = undefined
    }
  }

  if (!observer) {
    browser.addEventListener('scroll', scheduleGeometry, { passive: true })
    browser.addEventListener('resize', scheduleGeometry, { passive: true })
    onFinding({
      code: 'SHL-OBSERVER-FALLBACK',
      severity: 'warning',
      capability: 'intersection-observer',
      message: 'IntersectionObserver is unavailable; one-frame geometry tracking is active.',
    })
  }

  return {
    register(sectionId, element) {
      targets.set(element, sectionId)
      observer?.observe(element)
      if (!observer) scheduleGeometry()
    },
    unregister(element) {
      observer?.unobserve(element)
      targets.delete(element)
    },
    disconnect() {
      disconnected = true
      observer?.disconnect()
      browser.removeEventListener('scroll', scheduleGeometry)
      browser.removeEventListener('resize', scheduleGeometry)
      if (frame !== undefined) browser.cancelAnimationFrame(frame)
      targets.clear()
    },
  }
}

function safeStorage(): Storage | undefined {
  try {
    return window.localStorage
  } catch {
    return undefined
  }
}
