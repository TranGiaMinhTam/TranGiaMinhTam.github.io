import { describe, expect, it } from 'vitest'
import { parseTheme, resolveTheme, selectVisitorTheme } from './theme'

describe('theme decisions', () => {
  it('accepts only exact public values', () => {
    expect(parseTheme('light')).toBe('light')
    expect(parseTheme('dark')).toBe('dark')
    expect(parseTheme('DARK')).toBeUndefined()
    expect(parseTheme({ theme: 'dark' })).toBeUndefined()
  })

  it('uses stored, system, then light fallback precedence', () => {
    expect(resolveTheme('dark', false).state).toEqual({ theme: 'dark', source: 'stored', explicit: true })
    expect(resolveTheme(undefined, true).state).toEqual({ theme: 'dark', source: 'system', explicit: false })
    expect(resolveTheme(undefined, undefined).state).toEqual({ theme: 'light', source: 'fallback', explicit: false })
  })

  it('marks visitor changes as explicit', () => {
    expect(selectVisitorTheme('light')).toEqual({ theme: 'dark', source: 'visitor', explicit: true })
  })
})

