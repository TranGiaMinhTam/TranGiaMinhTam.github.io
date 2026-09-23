import { describe, expect, it } from 'vitest'
import type { ShellState } from './shell.types'
import { transitionShell } from './shellReducer'

const initial: ShellState = {
  activeSectionId: 'identity',
  lastVisibilitySequence: 0,
  theme: { theme: 'light', source: 'fallback', explicit: false },
  findings: [],
}

describe('shell transition reducer', () => {
  it('emits push and reduced-motion-aware scroll for deliberate navigation', () => {
    const result = transitionShell(initial, { type: 'navigate', sectionId: 'tools', sequence: 2, reducedMotion: true })
    expect(result.state.activeSectionId).toBe('tools')
    expect(result.effects).toEqual([
      { type: 'history-push', hash: '#tools' },
      { type: 'scroll', sectionId: 'tools', behavior: 'auto' },
    ])
  })

  it('ignores stale visibility and avoids identical history effects', () => {
    const newer = { ...initial, lastVisibilitySequence: 8 }
    expect(transitionShell(newer, { type: 'visible', sectionId: 'contact', sequence: 7 })).toEqual({ state: newer, effects: [] })
    expect(transitionShell(initial, { type: 'visible', sectionId: 'identity', sequence: 1 }).effects).toEqual([])
  })

  it('normalizes invalid locations once and preserves journal routes', () => {
    expect(transitionShell(initial, {
      type: 'location',
      resolution: { kind: 'invalid', sectionId: 'identity', replacementHash: '#identity' },
      sequence: 1,
      reducedMotion: false,
    }).effects).toEqual([{ type: 'history-replace', hash: '#identity' }])
    expect(transitionShell(initial, {
      type: 'location',
      resolution: { kind: 'journal', hash: '#/journal/research-note' },
      sequence: 1,
      reducedMotion: false,
    })).toEqual({ state: initial, effects: [] })
  })

  it('returns equal results for equal event sequences', () => {
    const event = { type: 'toggle-theme' } as const
    expect(transitionShell(initial, event)).toEqual(transitionShell(initial, event))
  })
})

