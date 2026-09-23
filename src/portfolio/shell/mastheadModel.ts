import type { PortfolioTheme } from './shell.types'

export type MastheadPresentation = Readonly<{
  nextTheme: PortfolioTheme
  themeActionLabel: string
  statusLabel: string
}>

export const createMastheadPresentation = (theme: PortfolioTheme): MastheadPresentation => {
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  return Object.freeze({
    nextTheme,
    themeActionLabel: `Switch to ${nextTheme} mode`,
    statusLabel: 'Portfolio status: active research profile',
  })
}
