import type { PortfolioTheme, ThemeResolution, ThemeState } from './shell.types'

export const THEME_STORAGE_KEY = 'portfolio-theme'

export function parseTheme(value: unknown): PortfolioTheme | undefined {
  return value === 'light' || value === 'dark' ? value : undefined
}

export function resolveTheme(
  storedValue: unknown,
  systemPrefersDark: boolean | undefined,
): ThemeResolution {
  const stored = parseTheme(storedValue)
  if (stored) return { state: { theme: stored, source: 'stored', explicit: true } }
  if (systemPrefersDark !== undefined) {
    return {
      state: {
        theme: systemPrefersDark ? 'dark' : 'light',
        source: 'system',
        explicit: false,
      },
    }
  }
  return { state: { theme: 'light', source: 'fallback', explicit: false } }
}

export function selectVisitorTheme(theme: PortfolioTheme): ThemeState {
  return {
    theme: theme === 'light' ? 'dark' : 'light',
    source: 'visitor',
    explicit: true,
  }
}

