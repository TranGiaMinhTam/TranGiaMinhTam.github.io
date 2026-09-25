// @vitest-environment node
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { canonicalizeAssets, referenceGroupByHash } from '../canonicalize.mjs'
import { inventoryArchive } from '../inventory.mjs'
import { createArchiveManifest, parseArchiveManifest, serializeArchiveManifest } from '../manifest.mjs'
import { joinArchiveMetadata } from '../metadata.mjs'

const fact = (id, relativePath, sha256) => Object.freeze({ id, relativePath, sourceRelativePath: relativePath, category: '_root', disposition: 'review-required', mediaType: 'image/jpeg', bytes: 1, sha256 })

describe('canonical archive transformations', () => {
  it('groups exact hashes and preserves all physical members', () => {
    const hash = 'a'.repeat(64)
    const facts = [fact('p2', 'b.jpg', hash), fact('p1', 'a.jpg', hash)]
    const result = canonicalizeAssets(facts)
    expect(result.report.canProceed).toBe(true)
    expect(result.items).toHaveLength(1)
    expect(result.items[0].physicalSources.map(({ id }) => id)).toEqual(['p1', 'p2'])
    expect(referenceGroupByHash(facts)).toEqual({ [hash]: ['p1', 'p2'] })
  })

  it('blocks conflicting reviewed aliases', () => {
    const hash = 'b'.repeat(64)
    const facts = [fact('p1', 'a.jpg', hash)]
    const result = canonicalizeAssets(facts, [
      { canonicalId: 'reviewed-a', contentHashes: [hash] },
      { canonicalId: 'reviewed-b', contentHashes: [hash] },
    ])
    expect(result.report.findings.map(({ code }) => code)).toContain('U01-CAN-ALIAS-CONFLICT')
  })

  it('requires one complete reviewed metadata record per item', () => {
    const hash = 'c'.repeat(64)
    const canonical = canonicalizeAssets([fact('p1', 'a.jpg', hash)])
    expect(joinArchiveMetadata({ canonicalItems: canonical.items, metadata: [] }).report.canProceed).toBe(false)
  })

  it('round trips canonical manifests', () => {
    const manifest = createArchiveManifest({ items: [], physicalFileCount: 0, totalBytes: 0 })
    expect(parseArchiveManifest(serializeArchiveManifest(manifest))).toEqual(manifest)
  })

  it('reconciles the current archive and exposes exact duplicate groups', async () => {
    const workspaceRoot = process.cwd()
    const inventory = await inventoryArchive({ workspaceRoot, sourceRoot: path.join(workspaceRoot, 'src/assets/minh-tam') })
    const canonical = canonicalizeAssets(inventory.facts)
    expect(canonical.report.canProceed).toBe(true)
    expect(canonical.items.flatMap(({ physicalSources }) => physicalSources)).toHaveLength(127)
    expect(canonical.items.length).toBeLessThan(127)
  }, 60_000)
})
