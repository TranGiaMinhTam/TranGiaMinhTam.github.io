// @vitest-environment node
import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { resolveMediaSource } from '../../../../src/portfolio/archive/mediaSourcePolicy.ts'
import { asCanonicalAssetId } from '../../../../src/portfolio/archive/archive.types.ts'
import { canonicalizeAssets, referenceGroupByHash } from '../canonicalize.mjs'
import { createFinding, createValidationReport, normalizeFindings } from '../findings.mjs'
import { createArchiveManifest, parseArchiveManifest, serializeArchiveManifest } from '../manifest.mjs'
import { joinArchiveMetadata } from '../metadata.mjs'
import { normalizeRepositoryPath } from '../paths.mjs'
import { createNeutralReviewedMetadata } from '../reviewed-metadata.mjs'
import { findingArbitrary, physicalInventoryArbitrary, safePathArbitrary } from './arbitraries.mjs'

const seed = Number(process.env.FC_SEED ?? 20260920)
const propertyOptions = Object.freeze({ seed, numRuns: 100, endOnFailure: true })
const assertProperty = (property) => fc.assert(property, propertyOptions)

const normalizeInventoryHashes = (facts) => facts.map((fact, index) => Object.freeze({
  ...fact,
  sha256: String(index % 4).repeat(64),
}))

describe('U-01 source-governance properties', () => {
  it('U01-P01 round trips canonical manifest serialization', () => {
    assertProperty(fc.property(
      fc.array(fc.record({ id: fc.string({ minLength: 1, maxLength: 12 }), value: fc.integer() }), { maxLength: 30 }),
      fc.nat(500),
      fc.nat(1024 ** 3),
      (items, physicalFileCount, totalBytes) => {
        const manifest = createArchiveManifest({ items, physicalFileCount, totalBytes })
        expect(parseArchiveManifest(serializeArchiveManifest(manifest))).toEqual(manifest)
      },
    ))
  })

  it('U01-P02 preserves valid normalized relative paths', () => {
    assertProperty(fc.property(safePathArbitrary, (candidate) => {
      const normalized = normalizeRepositoryPath(candidate)
      expect(normalized).toBe(candidate)
      expect(normalized.startsWith('/')).toBe(false)
      expect(normalized.split('/')).not.toContain('..')
    }))
  })

  it('U01-P03 preserves each physical member exactly once', () => {
    assertProperty(fc.property(physicalInventoryArbitrary, (rawFacts) => {
      const facts = normalizeInventoryHashes(rawFacts)
      const result = canonicalizeAssets(facts)
      const members = result.items.flatMap((item) => item.physicalSources.map(({ id }) => id)).sort()
      expect(members).toEqual(facts.map(({ id }) => id).sort())
      expect(new Set(members).size).toBe(members.length)
    }))
  })

  it('U01-P04 canonicalization is idempotent over normalized membership', () => {
    assertProperty(fc.property(physicalInventoryArbitrary, (rawFacts) => {
      const facts = normalizeInventoryHashes(rawFacts)
      const first = canonicalizeAssets(facts)
      const second = canonicalizeAssets(first.items.flatMap(({ physicalSources }) => physicalSources))
      expect(second.items).toEqual(first.items)
    }))
  })

  it('U01-P05 exact grouping matches the simple hash oracle', () => {
    assertProperty(fc.property(physicalInventoryArbitrary, (rawFacts) => {
      const facts = normalizeInventoryHashes(rawFacts)
      const result = canonicalizeAssets(facts)
      const production = Object.fromEntries(result.items.flatMap((item) => item.contentHashes.map((hash) => [hash, item.physicalSources.filter((source) => source.sha256 === hash).map(({ id }) => id).sort()])))
      expect(production).toEqual(referenceGroupByHash(facts))
    }))
  })

  it('U01-P06 input permutation does not change canonical output', () => {
    assertProperty(fc.property(physicalInventoryArbitrary, (rawFacts) => {
      const facts = normalizeInventoryHashes(rawFacts)
      expect(canonicalizeAssets([...facts].reverse()).items).toEqual(canonicalizeAssets(facts).items)
    }))
  })

  it('U01-P07 every joined capability has one owner and reachable provenance', () => {
    assertProperty(fc.property(physicalInventoryArbitrary, (rawFacts) => {
      const facts = normalizeInventoryHashes(rawFacts)
      const canonical = canonicalizeAssets(facts)
      const metadata = createNeutralReviewedMetadata(canonical.items)
      const joined = joinArchiveMetadata({ canonicalItems: canonical.items, metadata })
      expect(joined.report.canProceed).toBe(true)
      expect(joined.items.map(({ id }) => id)).toEqual(canonical.items.map(({ id }) => id))
      expect(joined.items.flatMap(({ physicalSources }) => physicalSources).map(({ id }) => id).sort()).toEqual(facts.map(({ id }) => id).sort())
    }))
  })

  it('U01-P08 accepted media is owned local or allowlisted HTTPS', () => {
    const policy = Object.freeze({ ownedAssetIds: new Set(['asset-owned']), approvedHttpsOrigins: new Set(['https://media.example.test']) })
    assertProperty(fc.property(fc.constantFrom(
      { kind: 'local', assetId: asCanonicalAssetId('asset-owned'), href: '/assets/item.pdf', mediaType: 'application/pdf' },
      { kind: 'https', href: 'https://media.example.test/item.pdf', mediaType: 'application/pdf' },
    ), (candidate) => {
      expect(resolveMediaSource(candidate, policy).ok).toBe(true)
    }))
    assertProperty(fc.property(fc.constantFrom('javascript:alert(1)', 'file:///private.pdf', 'data:text/html,test', 'https://unapproved.example/item.pdf'), (href) => {
      expect(resolveMediaSource({ kind: 'https', href, mediaType: 'application/pdf' }, policy).ok).toBe(false)
    }))
  })

  it('U01-P09 neutral public metadata excludes generated phone markers', () => {
    assertProperty(fc.property(physicalInventoryArbitrary, fc.integer({ min: 100000000, max: 999999999 }), (rawFacts, marker) => {
      const metadata = createNeutralReviewedMetadata(canonicalizeAssets(normalizeInventoryHashes(rawFacts)).items)
      expect(JSON.stringify(metadata)).not.toContain(String(marker))
    }))
  })

  it('U01-P10 canProceed is equivalent to zero blocking findings', () => {
    assertProperty(fc.property(fc.array(findingArbitrary, { maxLength: 50 }), (rawFindings) => {
      const findings = rawFindings.map(createFinding)
      const report = createValidationReport(findings)
      expect(report.canProceed).toBe(report.blockingCount === 0)
    }))
  })

  it('U01-P11 finding normalization is idempotent', () => {
    assertProperty(fc.property(fc.array(findingArbitrary, { maxLength: 50 }), (rawFindings) => {
      const findings = rawFindings.map(createFinding)
      expect(normalizeFindings(normalizeFindings(findings))).toEqual(normalizeFindings(findings))
    }))
  })

  it('U01-P12 reviewed alias joins preserve hashes and physical membership', () => {
    assertProperty(fc.property(physicalInventoryArbitrary, (rawFacts) => {
      const facts = normalizeInventoryHashes(rawFacts)
      const hashes = [...new Set(facts.map(({ sha256 }) => sha256))]
      const aliases = hashes.length > 1 ? [{ canonicalId: 'reviewed-combined', contentHashes: hashes }] : []
      const result = canonicalizeAssets(facts, aliases)
      expect(result.report.canProceed).toBe(true)
      expect(result.items.flatMap(({ contentHashes }) => contentHashes).sort()).toEqual(hashes.sort())
      expect(result.items.flatMap(({ physicalSources }) => physicalSources)).toHaveLength(facts.length)
    }))
  })
})
