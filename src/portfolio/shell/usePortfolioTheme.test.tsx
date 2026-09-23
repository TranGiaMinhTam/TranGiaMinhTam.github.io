import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { THEME_STORAGE_KEY } from './theme'
import { usePortfolioTheme } from './usePortfolioTheme'

beforeEach(() => {
  window.localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

afterEach(() => vi.restoreAllMocks())

describe('usePortfolioTheme', () => {
  it('applies and persists a visitor selection immediately', () => {
    const { result } = renderHook(() => usePortfolioTheme())
    act(() => result.current.toggleTheme())
    expect(document.documentElement.dataset.theme).toBe(result.current.theme.theme)
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe(result.current.theme.theme)
    expect(result.current.theme.explicit).toBe(true)
  })

  it('keeps the selected theme when persistence throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked') })
    const { result } = renderHook(() => usePortfolioTheme())
    act(() => result.current.toggleTheme())
    expect(document.documentElement.dataset.theme).toBe(result.current.theme.theme)
    expect(result.current.finding?.capability).toBe('storage')
  })
})

