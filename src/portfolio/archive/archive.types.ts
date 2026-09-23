type Brand<Value, Name extends string> = Value & { readonly __brand: Name }

export type PhysicalAssetId = Brand<string, 'PhysicalAssetId'>
export type ContentHash = Brand<string, 'ContentHash'>
export type CanonicalAssetId = Brand<string, 'CanonicalAssetId'>
export type ArchiveGroupId = Brand<string, 'ArchiveGroupId'>

export type ArchiveMediaType =
  | 'application/pdf'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'image/heic'
  | 'image/jpeg'
  | 'image/png'
  | 'image/svg+xml'
  | 'image/webp'

export type PublicationDisposition =
  | 'document-collection'
  | 'gallery'
  | 'honest-fallback'
  | 'narrative'
  | 'original-download'

export type PhysicalAssetFact = Readonly<{
  id: PhysicalAssetId
  relativePath: string
  category: string
  disposition: 'review-required' | 'reviewed'
  mediaType: ArchiveMediaType
  bytes: number
  sha256: ContentHash
}>

export type CuratedArchiveMetadata = Readonly<{
  canonicalId: CanonicalAssetId
  title: string
  caption: string
  groupId: ArchiveGroupId
  order: number
  authority: 'evidence' | 'owner-reviewed' | 'resume'
  accessibility: Readonly<
    | { kind: 'description'; text: string }
    | { kind: 'decorative' }
  >
  disposition: PublicationDisposition
}>

export type ReadyDerivative = Readonly<{
  status: 'ready'
  purpose: 'document-preview' | 'pdf-first-page' | 'thumbnail' | 'web-display'
  sourceSha256: ContentHash
  outputSha256: ContentHash
  mediaType: 'application/pdf' | 'image/webp'
  href: string
  bytes: number
  width?: number
  height?: number
  pages?: number
  adapter: Readonly<{ id: string; version: string }>
}>

export type UnavailableDerivative = Readonly<{
  status: 'unavailable'
  purpose: ReadyDerivative['purpose']
  reason: 'invalid-output' | 'not-required' | 'timeout' | 'tool-unavailable' | 'unsupported'
  safeFallback: 'metadata-only' | 'original-download' | null
}>

export type DerivativeOutcome = ReadyDerivative | UnavailableDerivative

export type LocalMediaCandidate = Readonly<{
  kind: 'local'
  assetId: CanonicalAssetId | PhysicalAssetId
  href: string
  mediaType: ArchiveMediaType | 'image/webp'
}>

export type HttpsMediaCandidate = Readonly<{
  kind: 'https'
  href: string
  mediaType: ArchiveMediaType | 'image/webp'
}>

export type MediaSourceCandidate = LocalMediaCandidate | HttpsMediaCandidate

export type SafeMediaSource = Readonly<
  | { kind: 'local'; href: string; mediaType: LocalMediaCandidate['mediaType'] }
  | { kind: 'https'; href: string; mediaType: HttpsMediaCandidate['mediaType'] }
>

export type MediaSourceResolution = Readonly<
  | { ok: true; source: SafeMediaSource }
  | { ok: false; code: 'MEDIA_LOCAL_UNOWNED' | 'MEDIA_SOURCE_INVALID' | 'MEDIA_SOURCE_UNAPPROVED'; publicMessage: 'Media unavailable.' }
>

export type CanonicalArchiveItem = Readonly<{
  id: CanonicalAssetId
  contentHashes: readonly ContentHash[]
  physicalSources: readonly PhysicalAssetFact[]
  metadata: CuratedArchiveMetadata
  derivatives: readonly DerivativeOutcome[]
}>

export type ArchiveManifest = Readonly<{
  schemaVersion: 1
  physicalFileCount: number
  totalBytes: number
  items: readonly CanonicalArchiveItem[]
}>

export const asPhysicalAssetId = (value: string): PhysicalAssetId => value as PhysicalAssetId
export const asContentHash = (value: string): ContentHash => value as ContentHash
export const asCanonicalAssetId = (value: string): CanonicalAssetId => value as CanonicalAssetId
export const asArchiveGroupId = (value: string): ArchiveGroupId => value as ArchiveGroupId
