import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  applyRootTheme,
  createVisibilityController,
  persistTheme,
  readStoredTheme,
  writeSectionHistory,
} from './browserAdapters'

afterEach(() => vi.restoreAllMocks())

describe('browser adapters', () => {
  it('deduplicates identical history writes', () => {
    window.history.replaceState(null, '', '#identity')
    const push = vi.spyOn(window.history, 'pushState')
    expect(writeSectionHistory('push', '#identity')).toBe(false)
    expect(push).not.toHaveBeenCalled()
    expect(writeSectionHistory('push', '#questions')).toBe(true)
    expect(push).toHaveBeenCalledOnce()
  })

  it('contains storage errors and writes only a theme value', () => {
    const failing = {
      getItem: vi.fn(() => { throw new Error('private value') }),
      setItem: vi.fn(() => { throw new Error('private value') }),
    } as unknown as Storage
    expect(readStoredTheme(failing)).toBeUndefined()
    expect(persistTheme('dark', failing)).toBe(false)
  })

  it('applies one root attribute', () => {
    applyRootTheme('dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('uses one-frame geometry scheduling and complete cleanup without an observer', () => {
    const requests: FrameRequestCallback[] = []
    vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => {
      requests.push(callback)
      return requests.length
    }))
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
    const add = vi.spyOn(window, 'addEventListener')
    const remove = vi.spyOn(window, 'removeEventListener')
    const onFacts = vi.fn()
    const controller = createVisibilityController(onFacts, vi.fn())
    const element = document.createElement('section')
    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      top: 10, bottom: 110, height: 100, left: 0, right: 100, width: 100, x: 0, y: 10, toJSON: () => ({}),
    })
    controller.register('identity', element)
    window.dispatchEvent(new Event('scroll'))
    window.dispatchEvent(new Event('scroll'))
    expect(requestAnimationFrame).toHaveBeenCalledOnce()
    requests[0](0)
    expect(onFacts).toHaveBeenCalledOnce()
    controller.disconnect()
    expect(add.mock.calls.filter(([type]) => type === 'scroll')).toHaveLength(1)
    expect(remove.mock.calls.filter(([type]) => type === 'scroll')).toHaveLength(1)
  })
})

