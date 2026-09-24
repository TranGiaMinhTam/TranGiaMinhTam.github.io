import type {
  ArchiveCard,
  ArchiveGroupData,
  ArchiveGroupId,
  ArchiveGroupLoadResult,
  ArchiveGroupSummary,
} from './archive.types'

const safeFailure = (
  code: Extract<ArchiveGroupLoadResult, { ok: false }>['code'],
  publicMessage: string,
): ArchiveGroupLoadResult => Object.freeze({ ok: false, code, publicMessage })

export const orderArchiveCards = (items: readonly ArchiveCard[]): readonly ArchiveCard[] =>
  Object.freeze([...items].sort((left, right) => left.order - right.order || left.id.localeCompare(right.id)))

export const selectArchiveGroupMembers = (
  items: readonly ArchiveCard[],
  subcollection: string,
): readonly ArchiveCard[] => orderArchiveCards(items.filter((item) => item.subcollection === subcollection))

export const buildArchiveGroupSummary = (group: ArchiveGroupData): ArchiveGroupSummary => Object.freeze({
  id: group.id,
  label: group.label,
  description: group.description,
  order: group.order,
  count: group.items.length,
  imageCount: group.items.filter(({ kind }) => kind === 'image').length,
  documentCount: group.items.filter(({ kind }) => kind === 'document').length,
  originalCount: group.items.filter(({ kind }) => kind === 'original').length,
})

const isSafeBundledHref = (href: string): boolean =>
  href.startsWith('/') && !href.includes('\\') && !href.split('/').includes('..')

export const hasAdmittedArchiveCapabilities = (item: ArchiveCard): boolean => {
  if (!isSafeBundledHref(item.originalHref)) return false
  if (item.kind === 'image') return isSafeBundledHref(item.thumbnailHref) && item.width > 0 && item.height > 0
  if (item.kind === 'document' && item.previewHref) {
    return isSafeBundledHref(item.previewHref) && Boolean(item.previewWidth && item.previewWidth > 0 && item.previewHeight && item.previewHeight > 0)
  }
  return true
}

export const validateArchiveGroupData = (
  summary: ArchiveGroupSummary,
  group: ArchiveGroupData,
): ArchiveGroupLoadResult => {
  const ids = new Set(group.items.map(({ id }) => id))
  const valid = group.id === summary.id
    && group.label === summary.label
    && group.items.length === summary.count
    && ids.size === group.items.length
    && group.items.every((item) => item.title.trim().length > 0 && item.caption.trim().length > 0)
    && group.items.every(hasAdmittedArchiveCapabilities)
  return valid
    ? Object.freeze({ ok: true, group: Object.freeze({ ...group, items: orderArchiveCards(group.items) }), cached: false })
    : safeFailure('ARCHIVE_GROUP_INVALID', 'This archive group is unavailable.')
}

export type ArchiveGroupImporter = () => Promise<Readonly<{ archiveGroup: ArchiveGroupData }>>
export type ArchiveGroupImporterRegistry = Readonly<Record<string, ArchiveGroupImporter>>

export const createArchiveGroupLoader = (
  summaries: readonly ArchiveGroupSummary[],
  importers: ArchiveGroupImporterRegistry,
) => {
  const summariesById = new Map(summaries.map((summary) => [summary.id, summary]))
  const cache = new Map<ArchiveGroupId, ArchiveGroupData>()
  return async (id: string): Promise<ArchiveGroupLoadResult> => {
    const summary = summariesById.get(id as ArchiveGroupId)
    const importer = importers[id]
    if (!summary || !importer) return safeFailure('ARCHIVE_GROUP_UNKNOWN', 'This archive group is unavailable.')
    const cached = cache.get(summary.id)
    if (cached) return Object.freeze({ ok: true, group: cached, cached: true })
    try {
      const module = await importer()
      const validated = validateArchiveGroupData(summary, module.archiveGroup)
      if (!validated.ok) return validated
      cache.set(summary.id, validated.group)
      return validated
    } catch {
      return safeFailure('ARCHIVE_GROUP_LOAD_FAILED', 'This group could not be loaded. Please try again.')
    }
  }
}
