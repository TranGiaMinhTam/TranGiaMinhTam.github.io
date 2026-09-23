import { describe, expect, it } from 'vitest'
import {
  asArchiveGroupId,
  asCanonicalAssetId,
  asContentHash,
  asPhysicalAssetId,
  type ArchiveManifest,
} from './archive.types'
import { orderArchiveItems, validateArchiveManifest } from './archiveModel'

const hash = asContentHash('a'.repeat(64))
const item = Object.freeze({
  id: asCanonicalAssetId('asset-001'),
  contentHashes: Object.freeze([hash]),
  physicalSources: Object.freeze([Object.freeze({
    id: asPhysicalAssetId('physical-001'),
    relativePath: 'src/assets/minh-tam/item.pdf',
    category: '_root',
    disposition: 'reviewed' as const,
    mediaType: 'application/pdf' as const,
    bytes: 4,
    sha256: hash,
  })]),
  metadata: Object.freeze({
    canonicalId: asCanonicalAssetId('asset-001'),
    title: 'Reviewed document',
    caption: 'Reviewed archive document.',
    groupId: asArchiveGroupId('documents'),
    order: 1,
    authority: 'owner-reviewed' as const,
    accessibility: Object.freeze({ kind: 'description' as const, text: 'Document preview.' }),
    disposition: 'document-collection' as const,
  }),
  derivatives: Object.freeze([]),
})

describe('archive manifest contracts', () => {
  it('accepts complete safe membership', () => {
    const manifest: ArchiveManifest = Object.freeze({ schemaVersion: 1, physicalFileCount: 1, totalBytes: 4, items: Object.freeze([item]) })
    expect(validateArchiveManifest(manifest)).toEqual({ ok: true, codes: [] })
  })

  it('rejects duplicate physical membership and totals', () => {
    const manifest: ArchiveManifest = Object.freeze({ schemaVersion: 1, physicalFileCount: 1, totalBytes: 8, items: Object.freeze([item, { ...item, id: asCanonicalAssetId('asset-002'), metadata: { ...item.metadata, canonicalId: asCanonicalAssetId('asset-002') } }]) })
    expect(validateArchiveManifest(manifest).codes).toContain('ARCHIVE_PHYSICAL_MEMBER_DUPLICATE')
  })

  it('orders by curated order and canonical id', () => {
    const later = { ...item, id: asCanonicalAssetId('asset-002'), metadata: { ...item.metadata, canonicalId: asCanonicalAssetId('asset-002'), order: 2 } }
    expect(orderArchiveItems([later, item]).map(({ id }) => id)).toEqual(['asset-001', 'asset-002'])
  })
})
