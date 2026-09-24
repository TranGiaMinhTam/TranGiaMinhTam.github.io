import { describe, expect, it, vi } from 'vitest'
import { archiveGroups } from './archiveGroups'
import { createArchiveGroupLoader, validateArchiveGroupData } from './archiveDiscoveryModel'
import { asArchiveGroupId, type ArchiveGroupData } from './archive.types'

const summary = archiveGroups[0]
const emptyGroup = Object.freeze({
  id: summary.id,
  label: summary.label,
  description: summary.description,
  order: summary.order,
  items: Object.freeze([]),
}) satisfies ArchiveGroupData

describe('U-04 archive discovery model', () => {
  it('rejects a group whose generated count does not match its eager summary', () => {
    expect(validateArchiveGroupData(summary, emptyGroup)).toMatchObject({
      ok: false,
      code: 'ARCHIVE_GROUP_INVALID',
      publicMessage: 'This archive group is unavailable.',
    })
  })

  it('rejects unknown group IDs before invoking an importer', async () => {
    const importer = vi.fn(async () => ({ archiveGroup: emptyGroup }))
    const load = createArchiveGroupLoader(archiveGroups, { [summary.id]: importer })
    await expect(load('not-a-group')).resolves.toMatchObject({ ok: false, code: 'ARCHIVE_GROUP_UNKNOWN' })
    expect(importer).not.toHaveBeenCalled()
  })

  it('caches a successfully validated immutable group for the page session', async () => {
    const localSummary = Object.freeze({ ...summary, id: asArchiveGroupId('test-group'), count: 0 })
    const localGroup = Object.freeze({ ...emptyGroup, id: localSummary.id })
    const importer = vi.fn(async () => ({ archiveGroup: localGroup }))
    const load = createArchiveGroupLoader([localSummary], { [localSummary.id]: importer })
    await expect(load(localSummary.id)).resolves.toMatchObject({ ok: true, cached: false })
    await expect(load(localSummary.id)).resolves.toMatchObject({ ok: true, cached: true })
    expect(importer).toHaveBeenCalledTimes(1)
  })

  it('returns visitor-safe copy when a known loader fails', async () => {
    const load = createArchiveGroupLoader([summary], {
      [summary.id]: async () => { throw new Error('/private/source/path') },
    })
    await expect(load(summary.id)).resolves.toEqual({
      ok: false,
      code: 'ARCHIVE_GROUP_LOAD_FAILED',
      publicMessage: 'This group could not be loaded. Please try again.',
    })
  })
})
