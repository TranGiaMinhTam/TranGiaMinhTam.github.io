import type { MediaDialogEvent, MediaDialogState } from './mediaViewer.types'

export const closedMediaDialogState: MediaDialogState = Object.freeze({ kind: 'closed' })

export const clampViewerIndex = (index: number, length: number): number => {
  if (length <= 0) return 0
  return Math.min(Math.max(Number.isFinite(index) ? Math.trunc(index) : 0, 0), length - 1)
}

const failureFrom = (state: Exclude<MediaDialogState, { kind: 'closed' }>): MediaDialogState => {
  if (state.kind === 'failure') return state
  const item = state.kind === 'pdf' ? state.item : state.group.items[state.index]
  return Object.freeze({
    kind: 'failure',
    title: item?.title ?? 'Media',
    description: item?.description ?? 'This item cannot be displayed.',
    publicMessage: 'Media unavailable.',
    actions: item?.actions ?? Object.freeze([]),
    triggerId: state.triggerId,
  })
}

export const mediaViewerReducer = (state: MediaDialogState, event: MediaDialogEvent): MediaDialogState => {
  switch (event.type) {
    case 'CLOSE': return closedMediaDialogState
    case 'OPEN_PDF': return Object.freeze({ kind: 'pdf', item: event.item, triggerId: event.triggerId })
    case 'OPEN_IMAGE': {
      if (event.group.items.length === 0) return Object.freeze({
        kind: 'failure', title: event.group.label, description: 'No images are available.', publicMessage: 'Media unavailable.',
        actions: Object.freeze([]), triggerId: event.triggerId,
      })
      return Object.freeze({ kind: 'image', group: event.group, index: clampViewerIndex(event.index, event.group.items.length), triggerId: event.triggerId })
    }
    case 'PREVIOUS': return state.kind === 'image'
      ? Object.freeze({ ...state, index: clampViewerIndex(state.index - 1, state.group.items.length) })
      : state
    case 'NEXT': return state.kind === 'image'
      ? Object.freeze({ ...state, index: clampViewerIndex(state.index + 1, state.group.items.length) })
      : state
    case 'MEDIA_FAILED': return state.kind === 'closed' ? state : failureFrom(state)
  }
}

