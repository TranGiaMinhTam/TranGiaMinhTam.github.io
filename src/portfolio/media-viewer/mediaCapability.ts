import {
  asViewerGroupId,
  asViewerMediaId,
  type ImageViewerCapability,
  type ImageViewerGroup,
  type PdfViewerCapability,
  type SafeViewerAction,
  type ViewerFailure,
  type ViewerResolution,
} from './mediaViewer.types'

export const PDF_EMBED_LIMIT_BYTES = 64 * 1024 * 1024
export const IMAGE_EMBED_LIMIT_BYTES = 16 * 1024 * 1024

export type ViewerSourcePolicy = Readonly<{ approvedHttpsOrigins: ReadonlySet<string> }>
export const defaultViewerSourcePolicy: ViewerSourcePolicy = Object.freeze({ approvedHttpsOrigins: new Set<string>() })

type CommonInput = Readonly<{
  id: string
  title: string
  description: string
  context: string
  href: string
  bytes?: number
  filename?: string
}>

export type PdfCapabilityInput = CommonInput & Readonly<{ mediaType?: string }>
export type ImageCapabilityInput = CommonInput & Readonly<{
  mediaType?: string
  width: number
  height: number
  alt: string
}>

const hasControlCharacter = (value: string): boolean => [...value].some((character) => {
  const codePoint = character.codePointAt(0) ?? 0
  return codePoint <= 31 || codePoint === 127
})

const safeHref = (href: string, policy: ViewerSourcePolicy): boolean => {
  if (!href || hasControlCharacter(href) || href.includes('\\') || href.split('/').includes('..')) return false
  if (href.startsWith('/') || href.startsWith('./')) return true
  try {
    const parsed = new URL(href)
    return parsed.protocol === 'https:' && policy.approvedHttpsOrigins.has(parsed.origin)
  } catch {
    return false
  }
}

const failure = (code: ViewerFailure['code'], input: CommonInput): ViewerFailure => Object.freeze({
  ok: false,
  code,
  publicMessage: 'Media unavailable.',
  title: input.title || 'Media',
  description: input.description || 'This item cannot be displayed.',
  actions: Object.freeze([]),
})

const validBytes = (bytes: number | undefined): boolean => bytes === undefined || (Number.isSafeInteger(bytes) && bytes > 0)
const actionsFor = (input: CommonInput): readonly SafeViewerAction[] => Object.freeze([
  Object.freeze({ kind: 'open', href: input.href, label: 'Open in new tab' }),
  Object.freeze({ kind: 'download', href: input.href, label: 'Download', ...(input.filename ? { filename: input.filename } : {}) }),
])

export const resolvePdfCapability = (
  input: PdfCapabilityInput,
  policy: ViewerSourcePolicy = defaultViewerSourcePolicy,
): ViewerResolution<PdfViewerCapability> => {
  if (!safeHref(input.href, policy)) return failure('VIEWER_SOURCE_INVALID', input)
  if ((input.mediaType ?? 'application/pdf') !== 'application/pdf') return failure('VIEWER_MEDIA_TYPE_INVALID', input)
  if (!validBytes(input.bytes)) return failure('VIEWER_BYTES_INVALID', input)
  return Object.freeze({
    ok: true,
    capability: Object.freeze({
      kind: 'pdf', id: asViewerMediaId(input.id), title: input.title, description: input.description,
      context: input.context, href: input.href, mediaType: 'application/pdf', actions: actionsFor(input),
      embedAllowed: input.bytes === undefined || input.bytes <= PDF_EMBED_LIMIT_BYTES,
      ...(input.bytes === undefined ? {} : { bytes: input.bytes }),
    }),
  })
}

export const resolveImageCapability = (
  input: ImageCapabilityInput,
  policy: ViewerSourcePolicy = defaultViewerSourcePolicy,
): ViewerResolution<ImageViewerCapability> => {
  if (!safeHref(input.href, policy)) return failure('VIEWER_SOURCE_INVALID', input)
  const mediaType = input.mediaType ?? 'image/jpeg'
  if (!mediaType.startsWith('image/')) return failure('VIEWER_MEDIA_TYPE_INVALID', input)
  if (!validBytes(input.bytes)) return failure('VIEWER_BYTES_INVALID', input)
  if (!Number.isSafeInteger(input.width) || input.width <= 0 || !Number.isSafeInteger(input.height) || input.height <= 0) return failure('VIEWER_GEOMETRY_INVALID', input)
  return Object.freeze({
    ok: true,
    capability: Object.freeze({
      kind: 'image', id: asViewerMediaId(input.id), title: input.title, description: input.description,
      context: input.context, href: input.href, mediaType: mediaType as `image/${string}`, width: input.width,
      height: input.height, alt: input.alt, actions: actionsFor(input),
      embedAllowed: input.bytes === undefined || input.bytes <= IMAGE_EMBED_LIMIT_BYTES,
      ...(input.bytes === undefined ? {} : { bytes: input.bytes }),
    }),
  })
}

export const createImageViewerGroup = (
  id: string,
  label: string,
  items: readonly ImageViewerCapability[],
): ImageViewerGroup | undefined => items.length === 0 ? undefined : Object.freeze({
  id: asViewerGroupId(id),
  label,
  items: Object.freeze([...items]),
})

