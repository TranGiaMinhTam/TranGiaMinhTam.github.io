import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import {
  applyRootTheme,
  persistTheme,
  readMediaPreference,
  readStoredTheme,
} from './browserAdapters'
import type { ShellFinding, ThemeState } from './shell.types'
import { resolveTheme, selectVisitorTheme } from './theme'

export type PortfolioThemeController = Readonly<{
  theme: ThemeState
  finding?: ShellFinding
  toggleTheme: () => void
}>

export function usePortfolioTheme(): PortfolioThemeController {
  const [theme, setTheme] = useState<ThemeState>(() => resolveTheme(
    readStoredTheme(),
    readMediaPreference('(prefers-color-scheme: dark)'),
  ).state)
  const [finding, setFinding] = useState<ShellFinding>()

  useLayoutEffect(() => applyRootTheme(theme.theme), [theme.theme])

  useEffect(() => {
    if (theme.explicit || typeof window.matchMedia !== 'function') return
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => setTheme({
      theme: event.matches ? 'dark' : 'light',
      source: 'system',
      explicit: false,
    })
    query.addEventListener?.('change', onChange)
    return () => query.removeEventListener?.('change', onChange)
  }, [theme.explicit])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = selectVisitorTheme(current.theme)
      applyRootTheme(next.theme)
      if (!persistTheme(next.theme)) {
        setFinding({
          code: 'SHL-THEME-MEMORY-ONLY',
          severity: 'warning',
          capability: 'storage',
          message: 'Theme changed for this visit; persistent storage is unavailable.',
        })
      }
      return next
    })
  }, [])

  return { theme, finding, toggleTheme }
}

