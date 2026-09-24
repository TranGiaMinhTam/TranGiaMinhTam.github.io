import type { MediaDialogState } from './mediaViewer.types'

export type ExtractMediaState<Kind extends MediaDialogState['kind']> = Extract<MediaDialogState, { kind: Kind }>

