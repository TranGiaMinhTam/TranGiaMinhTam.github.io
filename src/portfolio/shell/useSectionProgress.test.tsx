import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useSectionProgress } from './useSectionProgress'

beforeEach(() => {
  window.history.replaceState(null, '', '/')
})

afterEach(() => vi.restoreAllMocks())

describe('useSectionProgress', () => {
  it('updates navigation state synchronously and writes a valid hash', () => {
    const { result } = renderHook(() => useSectionProgress())
    const target = document.createElement('div')
    target.scrollIntoView = vi.fn()
    act(() => result.current.registerTarget('questions', target))
    const started = performance.now()
    act(() => expect(result.current.navigate('questions')).toBe(true))
    expect(performance.now() - started).toBeLessThan(100)
    expect(result.current.activeSectionId).toBe('questions')
    expect(window.location.hash).toBe('#questions')
  })

  it('reports a missing target without changing history', () => {
    const { result } = renderHook(() => useSectionProgress())
    act(() => expect(result.current.navigate('contact')).toBe(false))
    expect(result.current.findings.at(-1)?.code).toBe('SHL-TARGET-MISSING')
    expect(window.location.hash).toBe('')
  })
})

