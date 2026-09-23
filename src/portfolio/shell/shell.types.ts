import type { SectionId } from '../model/portfolio.types'

export type PortfolioTheme = 'light' | 'dark'
export type ThemeSource = 'stored' | 'system' | 'visitor' | 'fallback'

export type HashResolution =
  | Readonly<{ kind: 'section'; sectionId: SectionId; normalizedHash: `#${SectionId}` }>
  | Readonly<{ kind: 'journal'; hash: string }>
  | Readonly<{ kind: 'invalid'; sectionId: 'identity'; replacementHash: '#identity' }>

export type NavigationIntent = Readonly<{
  sectionId: SectionId
  sequence: number
}>

export type VisibilityFact = Readonly<{
  sectionId: SectionId
  isIntersecting: boolean
  ratio: number
  anchorDistance: number
  sequence: number
}>

export type ProgressState = Readonly<{
  sectionId: SectionId
  activeIndex: number
  ordinal: number
  count: number
  locusRatio: number
  completionRatio: number
  label: string
  semanticText: string
}>

export type ThemeState = Readonly<{
  theme: PortfolioTheme
  source: ThemeSource
  explicit: boolean
}>

export type MastheadResumeAction = Readonly<{
  href: string
  label: string
  download: string
}>

export type CapabilityName =
  | 'history'
  | 'intersection-observer'
  | 'geometry'
  | 'storage'
  | 'media'

export type ShellFinding = Readonly<{
  code: string
  severity: 'warning' | 'error'
  capability?: CapabilityName
  message: string
}>

export type ShellEffect =
  | Readonly<{ type: 'history-push'; hash: `#${SectionId}` }>
  | Readonly<{ type: 'history-replace'; hash: `#${SectionId}` }>
  | Readonly<{ type: 'scroll'; sectionId: SectionId; behavior: ScrollBehavior }>
  | Readonly<{ type: 'apply-theme'; theme: PortfolioTheme }>
  | Readonly<{ type: 'persist-theme'; theme: PortfolioTheme }>

export type ShellState = Readonly<{
  activeSectionId: SectionId
  pendingIntent?: NavigationIntent
  lastVisibilitySequence: number
  theme: ThemeState
  findings: readonly ShellFinding[]
}>

export type ShellEvent =
  | Readonly<{ type: 'navigate'; sectionId: SectionId; sequence: number; reducedMotion: boolean }>
  | Readonly<{ type: 'visible'; sectionId: SectionId; sequence: number }>
  | Readonly<{ type: 'location'; resolution: HashResolution; sequence: number; reducedMotion: boolean }>
  | Readonly<{ type: 'toggle-theme' }>
  | Readonly<{ type: 'capability-failed'; finding: ShellFinding }>

export type ShellTransition = Readonly<{
  state: ShellState
  effects: readonly ShellEffect[]
}>

export type ThemeResolution = Readonly<{
  state: ThemeState
  finding?: ShellFinding
}>
