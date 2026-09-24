import fc from 'fast-check'
import { describe, it } from 'vitest'
import { createImageViewerGroup, resolveImageCapability, resolvePdfCapability } from './mediaCapability'
import { clampViewerIndex, closedMediaDialogState, mediaViewerReducer } from './mediaViewerReducer'
import type { ImageViewerCapability, MediaDialogEvent, MediaDialogState } from './mediaViewer.types'

const parameters = { numRuns: 120, seed: 20260924 }
const imageArbitrary: fc.Arbitrary<ImageViewerCapability> = fc.record({
  key: fc.stringMatching(/^[a-z][a-z0-9-]{0,18}$/),
  width: fc.integer({ min: 1, max: 8000 }),
  height: fc.integer({ min: 1, max: 8000 }),
}).map(({ key, width, height }) => {
  const result = resolveImageCapability({ id: `image-${key}`, title: key, description: 'Description', context: 'Generated group', href: `/assets/${key}.jpg`, width, height, alt: key })
  if (!result.ok) throw new Error('Generator produced invalid capability.')
  return result.capability
})
const groupArbitrary = fc.array(imageArbitrary, { minLength: 1, maxLength: 12 }).map((items) => createImageViewerGroup('generated', 'Generated', items)!)

describe('media viewer properties', () => {
  it('keeps every normalized and navigated index in bounds and preserves items', () => fc.assert(fc.property(
    groupArbitrary,
    fc.integer({ min: -100, max: 100 }),
    fc.array(fc.constantFrom<'PREVIOUS' | 'NEXT'>('PREVIOUS', 'NEXT'), { maxLength: 80 }),
    (group, index, commands) => {
      let state: MediaDialogState = mediaViewerReducer(closedMediaDialogState, { type: 'OPEN_IMAGE', group, index, triggerId: 'trigger' })
      for (const type of commands) state = mediaViewerReducer(state, { type })
      return state.kind === 'image'
        && state.index >= 0
        && state.index < group.items.length
        && state.group.items.every((item, itemIndex) => item === group.items[itemIndex])
    },
  ), parameters))

  it('matches a clamped-index oracle', () => fc.assert(fc.property(
    fc.integer({ min: -1000, max: 1000 }), fc.integer({ min: 0, max: 100 }),
    (index, length) => clampViewerIndex(index, length) === (length <= 0 ? 0 : Math.min(Math.max(Math.trunc(index), 0), length - 1)),
  ), parameters))

  it('CLOSE always produces exactly closed', () => fc.assert(fc.property(groupArbitrary, fc.integer(), (group, index) => {
    const state = mediaViewerReducer(closedMediaDialogState, { type: 'OPEN_IMAGE', group, index, triggerId: 'trigger' })
    return mediaViewerReducer(state, { type: 'CLOSE' }).kind === 'closed'
  }), parameters))

  it('random command sequences remain valid and failure states stay dismissible', () => fc.assert(fc.property(
    groupArbitrary,
    fc.array(fc.constantFrom<MediaDialogEvent['type']>('PREVIOUS', 'NEXT', 'MEDIA_FAILED', 'CLOSE'), { maxLength: 60 }),
    (group, types) => {
      let state: MediaDialogState = mediaViewerReducer(closedMediaDialogState, { type: 'OPEN_IMAGE', group, index: 0, triggerId: 'trigger' })
      for (const type of types) state = mediaViewerReducer(state, { type } as MediaDialogEvent)
      if (state.kind === 'image') return state.index >= 0 && state.index < state.group.items.length
      if (state.kind === 'failure') return mediaViewerReducer(state, { type: 'CLOSE' }).kind === 'closed'
      return state.kind === 'closed'
    },
  ), parameters))

  it('oversized PDFs preserve safe actions while disabling embed', () => fc.assert(fc.property(
    fc.integer({ min: 64 * 1024 * 1024 + 1, max: 128 * 1024 * 1024 }),
    (bytes) => {
      const result = resolvePdfCapability({ id: 'large', title: 'Large', description: 'Description', context: 'Generated', href: '/assets/large.pdf', bytes })
      return result.ok && !result.capability.embedAllowed && result.capability.actions.length === 2
    },
  ), parameters))
})
