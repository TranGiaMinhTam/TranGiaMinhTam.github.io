export type ViewerMediaId = string & { readonly __brand: 'ViewerMediaId' }
export type ViewerGroupId = string & { readonly __brand: 'ViewerGroupId' }

export type SafeViewerAction = Readonly<{
  kind: 'download' | 'open'
  href: string
  label: string
  filename?: string
}>

type ViewerCapabilityBase = Readonly<{
  id: ViewerMediaId
  title: string
  description: string
  context: string
  href: string
  bytes?: number
  actions: readonly SafeViewerAction[]
}>

export type PdfViewerCapability = ViewerCapabilityBase & Readonly<{
  kind: 'pdf'
  mediaType: 'application/pdf'
  embedAllowed: boolean
}>

export type ImageViewerCapability = ViewerCapabilityBase & Readonly<{
  kind: 'image'
  mediaType: `image/${string}`
  width: number
  height: number
  alt: string
  embedAllowed: boolean
}>

export type ImageViewerGroup = Readonly<{
  id: ViewerGroupId
  label: string
  items: readonly ImageViewerCapability[]
}>

export type MediaViewerCapability = PdfViewerCapability | ImageViewerCapability

export type ViewerFindingCode =
  | 'VIEWER_BYTES_INVALID'
  | 'VIEWER_EMPTY_GROUP'
  | 'VIEWER_GEOMETRY_INVALID'
  | 'VIEWER_MEDIA_TYPE_INVALID'
  | 'VIEWER_SOURCE_INVALID'
  | 'VIEWER_SOURCE_UNAPPROVED'

export type ViewerFailure = Readonly<{
  ok: false
  code: ViewerFindingCode
  publicMessage: 'Media unavailable.'
  title: string
  description: string
  actions: readonly SafeViewerAction[]
}>

export type ViewerResolution<T extends MediaViewerCapability> = Readonly<
  | { ok: true; capability: T }
  | ViewerFailure
>

export type MediaDialogState = Readonly<
  | { kind: 'closed' }
  | { kind: 'pdf'; item: PdfViewerCapability; triggerId: string }
  | { kind: 'image'; group: ImageViewerGroup; index: number; triggerId: string }
  | { kind: 'failure'; title: string; description: string; publicMessage: string; actions: readonly SafeViewerAction[]; triggerId: string }
>

export type MediaDialogEvent = Readonly<
  | { type: 'OPEN_PDF'; item: PdfViewerCapability; triggerId: string }
  | { type: 'OPEN_IMAGE'; group: ImageViewerGroup; index: number; triggerId: string }
  | { type: 'PREVIOUS' }
  | { type: 'NEXT' }
  | { type: 'MEDIA_FAILED' }
  | { type: 'CLOSE' }
>

export const asViewerMediaId = (value: string): ViewerMediaId => value as ViewerMediaId
export const asViewerGroupId = (value: string): ViewerGroupId => value as ViewerGroupId

