# Domain Entities - U-05 PDF and Image Detail Viewers

## Value Types

```ts
type MediaGroupId = string & { readonly __brand: 'MediaGroupId' }
type MediaItemId = string & { readonly __brand: 'MediaItemId' }
type MediaTriggerId = string & { readonly __brand: 'MediaTriggerId' }

type PositivePixels = number & { readonly __brand: 'PositivePixels' }
type MediaIndex = number & { readonly __brand: 'MediaIndex' }
```

Branded identifiers are non-empty stable strings. Pixel values are finite positive numbers. A `MediaIndex` is created only after validation against its owning non-empty group.

## Safe Media Actions

```ts
type SafeMediaAction = Readonly<{
  kind: 'download' | 'new-tab' | 'original'
  label: string
  href: string
  downloadName?: string
}>
```

Every action stores a previously admitted local or approved HTTPS URL. The action label is reviewed visitor copy. Repository and local filesystem paths are never members of this entity.

## Layout and Crop Policy

```ts
type MediaFit = 'cover' | 'contain'

type MediaFramePolicy = Readonly<{
  aspectRatio: '4 / 3' | '3 / 4' | 'intrinsic'
  fit: MediaFit
  crop: 'center' | 'none'
  maxInlineSize: string
  maxBlockSize: string
}>

type ViewerLayoutPolicy = Readonly<{
  imageThumbnail: MediaFramePolicy
  documentPreview: MediaFramePolicy
  imageDetail: MediaFramePolicy
  minimumTarget: '2.75rem'
  desktopInlineLimit: string
  desktopBlockLimit: string
  narrowBreakpoint: '48rem'
}>
```

The approved policy fixes image thumbnails to `4 / 3`, `cover`, centered crop; document previews to `3 / 4`, `contain`, no crop; and full image detail to intrinsic ratio, `contain`, no crop. Concrete CSS uses existing design tokens and clamped viewport-aware values rather than unbounded fixed pixels.

## PDF Capabilities

```ts
type PdfPreviewCapability = Readonly<{
  id: MediaItemId
  title: string
  description: string
  context: string
  previewHref?: string
  previewWidth?: PositivePixels
  previewHeight?: PositivePixels
  viewerHref: string
  mediaType: 'application/pdf'
  actions: readonly SafeMediaAction[]
}>

type PdfViewerCapability = Readonly<{
  kind: 'pdf'
  id: MediaItemId
  title: string
  description: string
  context: string
  viewerHref: string
  mediaType: 'application/pdf'
  actions: readonly SafeMediaAction[]
}>
```

`previewHref` is optional because a document remains publishable when its derivative is unavailable. `viewerHref` is admitted before a capability is created. The supplied resume uses the same capability shape and retains its stable download filename.

## Image Capabilities and Groups

```ts
type ImageViewerCapability = Readonly<{
  kind: 'image'
  id: MediaItemId
  title: string
  caption: string
  context: string
  thumbnailHref: string
  fullHref: string
  width: PositivePixels
  height: PositivePixels
  accessibleText: string
  actions: readonly SafeMediaAction[]
}>

type ImageViewerGroup = Readonly<{
  id: MediaGroupId
  label: string
  items: readonly [ImageViewerCapability, ...ImageViewerCapability[]]
}>
```

Group order is the existing validated catalog order. Archive activity groups and narrative project galleries are separate group identities. Empty arrays cannot become `ImageViewerGroup` values.

## Capability Results and Findings

```ts
type MediaCapabilityFindingCode =
  | 'MEDIA_VIEWER_SOURCE_REJECTED'
  | 'MEDIA_VIEWER_PREVIEW_UNAVAILABLE'
  | 'MEDIA_VIEWER_DIMENSIONS_INVALID'
  | 'MEDIA_VIEWER_GROUP_EMPTY'
  | 'MEDIA_VIEWER_INDEX_INVALID'
  | 'MEDIA_VIEWER_ACTION_REJECTED'

type MediaCapabilityFinding = Readonly<{
  code: MediaCapabilityFindingCode
  severity: 'blocking' | 'fallback'
  target: string
  publicMessage: 'Media unavailable.' | 'Preview unavailable.'
}>

type MediaCapabilityResult<Value> = Readonly<
  | { ok: true; value: Value; findings: readonly MediaCapabilityFinding[] }
  | { ok: false; findings: readonly MediaCapabilityFinding[] }
>
```

Findings contain stable IDs or safe logical targets, never URLs, local paths, stack traces, private document text, or parser details.

## Dialog State and Events

```ts
type MediaDialogState =
  | Readonly<{ kind: 'closed' }>
  | Readonly<{ kind: 'pdf'; item: PdfViewerCapability; triggerId: MediaTriggerId }>
  | Readonly<{
      kind: 'image'
      group: ImageViewerGroup
      index: MediaIndex
      triggerId: MediaTriggerId
    }>
  | Readonly<{
      kind: 'failure'
      title: string
      publicMessage: 'Media unavailable.'
      eligibleActions: readonly SafeMediaAction[]
      triggerId: MediaTriggerId
    }>

type MediaDialogEvent =
  | Readonly<{ type: 'OPEN_PDF'; item: PdfViewerCapability; triggerId: MediaTriggerId }>
  | Readonly<{ type: 'OPEN_IMAGE'; group: ImageViewerGroup; index: number; triggerId: MediaTriggerId }>
  | Readonly<{ type: 'PREVIOUS' }>
  | Readonly<{ type: 'NEXT' }>
  | Readonly<{ type: 'MEDIA_FAILED' }>
  | Readonly<{ type: 'CLOSE' }>
```

## Derived Navigation Model

```ts
type ImageNavigationModel = Readonly<{
  item: ImageViewerCapability
  index: MediaIndex
  positionLabel: string
  previousDisabled: boolean
  nextDisabled: boolean
}>
```

The model is derived only from a valid image state. `positionLabel` uses one-based visitor language. A one-item group has both directions disabled.

## Controller Contract

```ts
type MediaDialogController = Readonly<{
  state: MediaDialogState
  openPdf: (item: PdfViewerCapability, triggerId: MediaTriggerId) => void
  openImage: (group: ImageViewerGroup, index: number, triggerId: MediaTriggerId) => void
  previous: () => void
  next: () => void
  mediaFailed: () => void
  close: () => void
}>
```

The controller owns reducer state and stable callbacks only. DOM focus, inertness, scrolling, and portal/dialog lifecycle belong exclusively to the host.

## Existing Contract Adaptations

- `ArchiveDetailTrigger` expands from a single item locator to a validated viewer request containing safe context and either one PDF capability or an image group plus selected index.
- `SectionBodyContext` gains typed `openPdf` and `openImage` callbacks so domain sections do not import dialog state.
- Academic evidence actions and resume actions may request PDF detail while preserving direct download/new-tab fallbacks.
- Narrative galleries adapt their existing ordered evidence arrays into independent `ImageViewerGroup` values.

## Entity Invariants

1. Every open state has one non-empty stable trigger ID.
2. Every PDF viewer state contains exactly one validated PDF capability.
3. Every image viewer state owns a non-empty immutable group and an in-range index.
4. Every full image has positive declared intrinsic dimensions.
5. Every safe action URL has already passed media-source policy.
6. Failure state retains no rejected URL.
7. Layout policy never permits crop in document or full-detail surfaces.
8. Public entities contain reviewed context only and no unsafe provenance.
