import type { ThemeState } from './shell.types'
import { createMastheadPresentation } from './mastheadModel'
import styles from './Shell.module.css'

export function ThemeControl({ theme, onToggle }: Readonly<{ theme: ThemeState; onToggle: () => void }>) {
  const presentation = createMastheadPresentation(theme.theme)
  return <button
    className={styles.themeControl}
    type="button"
    onClick={onToggle}
    data-testid="theme-control-button"
    aria-label={presentation.themeActionLabel}
  >
    <span aria-hidden="true">{theme.theme === 'light' ? '◐' : '◑'}</span>
    <span className={styles.themeControlLabel}>{presentation.nextTheme} mode</span>
  </button>
}
