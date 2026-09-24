import { describe, expect, it } from 'vitest'
import { createImageViewerGroup, resolveImageCapability, resolvePdfCapability } from './mediaCapability'
import { clampViewerIndex, closedMediaDialogState, mediaViewerReducer } from './mediaViewerReducer'

const image = (id: string) => {
  const result = resolveImageCapability({ id, title: id, description: 'Description', context: 'Research', href: `/assets/${id}.jpg`, width: 640, height: 480, alt: id })
  if (!result.ok) throw new Error('Expected valid image.')
  return result.capability
}

describe('media viewer reducer', () => {
  it('clamps navigation and closes from every open state', () => {
    const group = createImageViewerGroup('group', 'Group', [image('one'), image('two')])
    if (!group) throw new Error('Expected group.')
    let state = mediaViewerReducer(closedMediaDialogState, { type: 'OPEN_IMAGE', group, index: 99, triggerId: 'trigger' })
    expect(state.kind === 'image' && state.index).toBe(1)
    state = mediaViewerReducer(state, { type: 'NEXT' })
    expect(state.kind === 'image' && state.index).toBe(1)
    state = mediaViewerReducer(state, { type: 'CLOSE' })
    expect(state).toEqual({ kind: 'closed' })
  })

  it('downgrades a failed PDF to an operable safe state', () => {
    const result = resolvePdfCapability({ id: 'paper', title: 'Paper', description: 'Description', context: 'Research', href: '/assets/paper.pdf' })
    if (!result.ok) throw new Error('Expected PDF.')
    const open = mediaViewerReducer(closedMediaDialogState, { type: 'OPEN_PDF', item: result.capability, triggerId: 'trigger' })
    expect(mediaViewerReducer(open, { type: 'MEDIA_FAILED' })).toMatchObject({ kind: 'failure', publicMessage: 'Media unavailable.', triggerId: 'trigger' })
  })

  it.each([[-10, 4, 0], [0, 4, 0], [3, 4, 3], [10, 4, 3], [Number.NaN, 4, 0], [2, 0, 0]])('clamps index %s in length %s', (index, length, expected) => {
    expect(clampViewerIndex(index, length)).toBe(expected)
  })
})

