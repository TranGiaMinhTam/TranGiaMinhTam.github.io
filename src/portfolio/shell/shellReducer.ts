import type { ShellEvent, ShellState, ShellTransition } from './shell.types'
import { sectionHash } from './sectionHash'
import { selectVisitorTheme } from './theme'

export function transitionShell(state: ShellState, event: ShellEvent): ShellTransition {
  switch (event.type) {
    case 'navigate':
      return {
        state: {
          ...state,
          activeSectionId: event.sectionId,
          pendingIntent: { sectionId: event.sectionId, sequence: event.sequence },
        },
        effects: [
          { type: 'history-push', hash: sectionHash(event.sectionId) },
          { type: 'scroll', sectionId: event.sectionId, behavior: event.reducedMotion ? 'auto' : 'smooth' },
        ],
      }
    case 'visible':
      if (event.sequence < state.lastVisibilitySequence) return { state, effects: [] }
      if (event.sectionId === state.activeSectionId && !state.pendingIntent) {
        return { state: { ...state, lastVisibilitySequence: event.sequence }, effects: [] }
      }
      return {
        state: {
          ...state,
          activeSectionId: event.sectionId,
          pendingIntent: undefined,
          lastVisibilitySequence: event.sequence,
        },
        effects: event.sectionId === state.activeSectionId
          ? []
          : [{ type: 'history-replace', hash: sectionHash(event.sectionId) }],
      }
    case 'location':
      if (event.resolution.kind === 'journal') return { state, effects: [] }
      if (event.resolution.kind === 'invalid') {
        return {
          state: { ...state, activeSectionId: 'identity', pendingIntent: undefined },
          effects: [{ type: 'history-replace', hash: '#identity' }],
        }
      }
      return {
        state: {
          ...state,
          activeSectionId: event.resolution.sectionId,
          pendingIntent: { sectionId: event.resolution.sectionId, sequence: event.sequence },
        },
        effects: [{
          type: 'scroll',
          sectionId: event.resolution.sectionId,
          behavior: event.reducedMotion ? 'auto' : 'smooth',
        }],
      }
    case 'toggle-theme': {
      const theme = selectVisitorTheme(state.theme.theme)
      return {
        state: { ...state, theme },
        effects: [
          { type: 'apply-theme', theme: theme.theme },
          { type: 'persist-theme', theme: theme.theme },
        ],
      }
    }
    case 'capability-failed':
      return {
        state: { ...state, findings: [...state.findings, event.finding] },
        effects: [],
      }
  }
}

