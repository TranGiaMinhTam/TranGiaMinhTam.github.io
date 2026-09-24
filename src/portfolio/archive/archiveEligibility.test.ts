import { describe, expect, it } from 'vitest'
import {
  asArchiveGroupId,
  asCanonicalAssetId,
  asContentHash,
  asPhysicalAssetId,
  type CanonicalArchiveItem,
} from './archive.types'
import { buildArchiveEligibility, classifyArchiveEligibility } from './archiveEligibility'

const item = (id: string, disposition: CanonicalArchiveItem['metadata']['disposition'] = 'gallery'): CanonicalArchiveItem => Object.freeze({
  id: asCanonicalAssetId(id),
  contentHashes: Object.freeze([asContentHash('a'.repeat(64))]),
  physicalSources: Object.freeze([Object.freeze({
    id: asPhysicalAssetId(`physical-${id}`),
    relativePath: `src/assets/minh-tam/source/${id}.jpg`,
    category: 'test',
    disposition: 'reviewed' as const,
    mediaType: 'image/jpeg' as const,
    bytes: 1,
    sha256: asContentHash('a'.repeat(64)),
  })]),
  metadata: Object.freeze({
    canonicalId: asCanonicalAssetId(id), title: id, caption: id,
    groupId: asArchiveGroupId('test'), order: 1, authority: 'owner-reviewed' as const,
    accessibility: Object.freeze({ kind: 'description' as const, text: id }), disposition,
  }),
  derivatives: Object.freeze([]),
})

describe('archive public eligibility', () => {
  it('keeps transcripts inventoried but excludes them from publication', () => {
    expect(classifyArchiveEligibility(item('asset-0857163ebd922f5c0723'))).toEqual({
      id: 'asset-0857163ebd922f5c0723', publication: 'excluded', reason: 'explicit-user-exclusion',
    })
  })

  it('assigns only the selected Protein Docking conference photograph to narrative placement', () => {
    expect(classifyArchiveEligibility(item('asset-02ed8286ffa69acd6cd0'))).toMatchObject({
      publication: 'public', primaryDisposition: 'narrative',
    })
    expect(classifyArchiveEligibility(item('asset-6ac9d9b9698aa3b2310a'))).toMatchObject({
      publication: 'public', primaryDisposition: 'gallery',
    })
  })

  it('fails closed when a required governed ID is missing', () => {
    const result = buildArchiveEligibility([item('asset-other')])
    expect(result.ok).toBe(false)
    expect(result.findings.some(({ code }) => code === 'ARCHIVE_ELIGIBILITY_UNKNOWN')).toBe(true)
  })
})
