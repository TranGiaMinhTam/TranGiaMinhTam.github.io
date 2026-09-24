import fc from 'fast-check'
import { describe, expect, it, vi } from 'vitest'
import {
  buildArchiveGroupSummary,
  createArchiveGroupLoader,
  hasAdmittedArchiveCapabilities,
  orderArchiveCards,
  selectArchiveGroupMembers,
} from './archiveDiscoveryModel'
import { classifyArchiveEligibility } from './archiveEligibility'
import {
  asArchiveGroupId,
  asCanonicalAssetId,
  asContentHash,
  asPhysicalAssetId,
  type ArchiveCard,
  type ArchiveGroupData,
  type CanonicalArchiveItem,
} from './archive.types'

const seed = Number(import.meta.env.VITE_FC_SEED ?? 20260924)
const settings = Object.freeze({ seed, numRuns: 100, endOnFailure: true })
const assertProperty = (property: Parameters<typeof fc.assert>[0]) => fc.assert(property, settings)
const nonBlank = fc.string({ minLength: 1, maxLength: 40 }).filter((value) => value.trim().length > 0)
const groupIdArbitrary = fc.stringMatching(/^[a-z][a-z-]{0,10}$/).map(asArchiveGroupId)

const imageCardArbitrary: fc.Arbitrary<ArchiveCard> = fc.record({
  uuid: fc.uuid(),
  title: nonBlank,
  caption: nonBlank,
  subcollection: fc.constantFrom('Alpha', 'Beta', 'Γάμμα'),
  order: fc.integer({ min: -10, max: 20 }),
  width: fc.integer({ min: 1, max: 2000 }),
  height: fc.integer({ min: 1, max: 2000 }),
}).map(({ uuid, title, caption, subcollection, order, width, height }) => Object.freeze({
  id: asCanonicalAssetId(`asset-${uuid}`),
  kind: 'image' as const,
  title,
  caption,
  accessibilityText: `${title}. ${caption}`,
  subcollection,
  order,
  originalHref: `/assets/${uuid}.jpg`,
  originalMediaType: 'image/jpeg' as const,
  thumbnailHref: `/assets/${uuid}.webp`,
  width,
  height,
}))

const uniqueCardsArbitrary = fc.uniqueArray(imageCardArbitrary, { selector: ({ id }) => id, maxLength: 30 })
const groupArbitrary: fc.Arbitrary<ArchiveGroupData> = fc.record({
  id: groupIdArbitrary,
  label: nonBlank,
  description: nonBlank,
  order: fc.integer({ min: 1, max: 20 }),
  items: uniqueCardsArbitrary,
}).map((group) => Object.freeze({ ...group, items: Object.freeze(group.items) }))

const canonicalItem = (card: ArchiveCard, memberships: number): CanonicalArchiveItem => Object.freeze({
  id: card.id,
  contentHashes: Object.freeze([asContentHash('a'.repeat(64))]),
  physicalSources: Object.freeze(Array.from({ length: memberships }, (_, index) => Object.freeze({
    id: asPhysicalAssetId(`physical-${card.id}-${index}`),
    relativePath: `src/assets/minh-tam/source/${card.id}-${index}.jpg`,
    category: 'test',
    disposition: 'reviewed' as const,
    mediaType: 'image/jpeg' as const,
    bytes: index + 1,
    sha256: asContentHash('a'.repeat(64)),
  }))),
  metadata: Object.freeze({
    canonicalId: card.id,
    title: card.title,
    caption: card.caption,
    groupId: asArchiveGroupId('test'),
    order: card.order,
    authority: 'owner-reviewed' as const,
    accessibility: Object.freeze({ kind: 'description' as const, text: card.accessibilityText }),
    disposition: 'gallery' as const,
  }),
  derivatives: Object.freeze([]),
})

describe(`U04-P01..P09 archive discovery properties (seed ${seed})`, () => {
  it('U04-P01 gives every eligible item exactly one primary disposition', () => assertProperty(fc.property(imageCardArbitrary, (card) => {
    const decision = classifyArchiveEligibility(canonicalItem(card, 1))
    expect(decision).toMatchObject({ id: card.id, publication: 'public', primaryDisposition: 'gallery' })
  })))

  it('U04-P02 derives summary counts exactly from group membership', () => assertProperty(fc.property(groupArbitrary, (group) => {
    const summary = buildArchiveGroupSummary(group)
    expect(summary.count).toBe(group.items.length)
    expect(summary.imageCount + summary.documentCount + summary.originalCount).toBe(summary.count)
  })))

  it('U04-P03 keeps order deterministic under input permutations', () => assertProperty(fc.property(uniqueCardsArbitrary, (items) => {
    expect(orderArchiveCards(items)).toEqual(orderArchiveCards([...items].reverse()))
  })))

  it('U04-P04 keeps public ordering idempotent', () => assertProperty(fc.property(uniqueCardsArbitrary, (items) => {
    expect(orderArchiveCards(orderArchiveCards(items))).toEqual(orderArchiveCards(items))
  })))

  it('U04-P05 matches a simple filter-and-sort selection oracle', () => assertProperty(fc.property(uniqueCardsArbitrary, fc.constantFrom('Alpha', 'Beta', 'Γάμμα'), (items, subcollection) => {
    const oracle = [...items].filter((item) => item.subcollection === subcollection).sort((left, right) => left.order - right.order || left.id.localeCompare(right.id))
    expect(selectArchiveGroupMembers(items, subcollection)).toEqual(oracle)
  })))

  it('U04-P06 admits every generated local capability with dimensions', () => assertProperty(fc.property(imageCardArbitrary, (card) => {
    expect(hasAdmittedArchiveCapabilities(card)).toBe(true)
  })))

  it('U04-P07 rejects unknown IDs without invoking any importer', () => assertProperty(fc.asyncProperty(groupArbitrary, fc.uuid(), async (group, suffix) => {
    const summary = buildArchiveGroupSummary(group)
    const importer = vi.fn(async () => ({ archiveGroup: group }))
    const load = createArchiveGroupLoader([summary], { [summary.id]: importer })
    expect(await load(`unknown-${suffix}`)).toMatchObject({ ok: false, code: 'ARCHIVE_GROUP_UNKNOWN' })
    expect(importer).not.toHaveBeenCalled()
  })))

  it('U04-P08 preserves duplicate-consolidated physical membership during classification', () => assertProperty(fc.property(imageCardArbitrary, fc.integer({ min: 1, max: 4 }), (card, memberships) => {
    const item = canonicalItem(card, memberships)
    const before = item.physicalSources.map(({ id }) => id)
    classifyArchiveEligibility(item)
    expect(item.physicalSources.map(({ id }) => id)).toEqual(before)
  })))

  it('U04-P09 leaves caller-owned arrays and records structurally unchanged', () => assertProperty(fc.property(groupArbitrary, (group) => {
    const before = JSON.stringify(group)
    buildArchiveGroupSummary(group)
    orderArchiveCards(group.items)
    selectArchiveGroupMembers(group.items, 'Alpha')
    expect(JSON.stringify(group)).toBe(before)
  })))
})
