// @vitest-environment node
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { canonicalizeAssets } from '../canonicalize.mjs'
import { inventoryArchive } from '../inventory.mjs'
import { joinArchiveMetadata } from '../metadata.mjs'
import { createNeutralReviewedMetadata, renderMetadataModule } from '../reviewed-metadata.mjs'

describe('reviewed neutral archive metadata', () => {
  it('covers every canonical item without using filenames as titles or claims', async () => {
    const workspaceRoot = process.cwd()
    const inventory = await inventoryArchive({ workspaceRoot, sourceRoot: path.join(workspaceRoot, 'src/assets/minh-tam') })
    const canonical = canonicalizeAssets(inventory.facts)
    const metadata = createNeutralReviewedMetadata(canonical.items)
    const joined = joinArchiveMetadata({ canonicalItems: canonical.items, metadata })
    expect(metadata).toHaveLength(110)
    expect(joined.report.canProceed).toBe(true)
    expect(joined.items.flatMap(({ physicalSources }) => physicalSources)).toHaveLength(127)
    for (const record of metadata) {
      expect(record.title.length).toBeGreaterThan(0)
      expect(record.title).not.toMatch(/[/\\]/u)
      expect(record.title).not.toMatch(/\.(?:jpg|jpeg|png|heic|pdf|docx)$/iu)
      expect(record.caption).not.toMatch(/\.(?:jpg|jpeg|png|heic|pdf|docx)/iu)
    }
  }, 60_000)

  it('renders a deterministic strict TypeScript metadata module', () => {
    const metadata = [{ canonicalId: 'asset-a', title: 'Archive record 001', caption: 'Preserved evidence.', groupId: 'archive', order: 1, authority: 'owner-reviewed', accessibility: { kind: 'description', text: 'Preview.' }, disposition: 'gallery' }]
    expect(renderMetadataModule(metadata)).toContain("asCanonicalAssetId(\"asset-a\")")
    expect(renderMetadataModule(metadata)).toBe(renderMetadataModule(metadata))
  })
})
