import fc from 'fast-check'
import { describe, it } from 'vitest'
import { evidenceManifest } from '../model/evidenceManifest'
import { evidenceId } from '../model/portfolio.types'
import { verifiedPortfolioSource } from '../model/verifiedPortfolioSource'
import { reviewedResumeClaims } from './resumeClaims'
import { reconcileResumeClaims } from './resumeReconciliation'
import { mapResumeCategory, resumeSectionByCategory } from './resumeSectionMap'
import { resumeClaimId, type PublicResumeClaim, type ResumeCategory } from './resume.types'

const seed = 20260923
const parameters = { numRuns: 100, seed }
const categories = Object.keys(resumeSectionByCategory) as ResumeCategory[]
const categoryArbitrary = fc.constantFrom(...categories)
const validClaimArbitrary = fc.record({
  key: fc.integer({ min: 0, max: 1_000_000 }),
  category: categoryArbitrary,
}).map(({ key, category }): PublicResumeClaim => Object.freeze({
  id: resumeClaimId(`generated-${key}`),
  category,
  title: `Generated public claim ${key}`,
  summary: `Reviewed public summary ${key}`,
  sourcePage: key % 2 === 0 ? 1 : 2,
  order: key,
  evidenceIds: Object.freeze([]),
  publication: 'public',
  reviewState: 'reviewed',
}))

const reconcileOne = (claim: PublicResumeClaim) => reconcileResumeClaims(
  [claim],
  verifiedPortfolioSource,
  evidenceManifest,
  [claim.category],
)

describe(`U03-P01..P10 resume properties (seed ${seed})`, () => {
  it('U03-P01 maps every admitted claim into exactly one section', () => {
    fc.assert(fc.property(validClaimArbitrary, (claim) => {
      const result = reconcileOne(claim)
      return result.findings.length === 0
        && Object.values(result.sections).filter(({ allClaimIds }) => allClaimIds.includes(claim.id)).length === 1
    }), parameters)
  })

  it('U03-P02 never invents claim identifiers', () => {
    fc.assert(fc.property(fc.uniqueArray(validClaimArbitrary, { selector: ({ id }) => id, maxLength: 20 }), (claims) => {
      const expected = [...new Set(claims.map(({ category }) => category))]
      const result = reconcileResumeClaims(claims, verifiedPortfolioSource, evidenceManifest, expected)
      const inputIds = new Set(claims.map(({ id }) => id))
      return result.claims.every(({ id }) => inputIds.has(id))
    }), parameters)
  })

  it('U03-P03 excludes values that were never supplied to the public catalog', () => {
    fc.assert(fc.property(validClaimArbitrary, fc.uuid(), (claim, privateMarker) => {
      const result = reconcileOne(claim)
      return !JSON.stringify(result).includes(privateMarker)
    }), parameters)
  })

  it('U03-P04 fails closed when evidence or record references cannot resolve', () => {
    fc.assert(fc.property(validClaimArbitrary, fc.boolean(), (claim, useEvidence) => {
      const invalid = useEvidence
        ? { ...claim, evidenceIds: [evidenceId(`missing-${claim.order}`)] }
        : { ...claim, existingRecordId: `missing-${claim.order}` as NonNullable<PublicResumeClaim['existingRecordId']> }
      return reconcileOne(invalid).findings.some(({ code }) => code === (useEvidence ? 'U03-RESUME-EVIDENCE-MISSING' : 'U03-RESUME-RECORD-MISSING'))
    }), parameters)
  })

  it('U03-P05 is deterministic for repeated reconciliation', () => {
    fc.assert(fc.property(validClaimArbitrary, (claim) => {
      return JSON.stringify(reconcileOne(claim)) === JSON.stringify(reconcileOne(claim))
    }), parameters)
  })

  it('U03-P06 produces the same normalized projection for input permutations', () => {
    fc.assert(fc.property(fc.uniqueArray(validClaimArbitrary, { selector: ({ id }) => id, minLength: 1, maxLength: 20 }), (claims) => {
      const expected = [...new Set(claims.map(({ category }) => category))]
      const forward = reconcileResumeClaims(claims, verifiedPortfolioSource, evidenceManifest, expected)
      const reverse = reconcileResumeClaims([...claims].reverse(), verifiedPortfolioSource, evidenceManifest, expected)
      return JSON.stringify(forward) === JSON.stringify(reverse)
    }), parameters)
  })

  it('U03-P07 matches the closed category-to-section oracle', () => {
    fc.assert(fc.property(categoryArbitrary, (category) => mapResumeCategory(category) === resumeSectionByCategory[category]), parameters)
  })

  it('U03-P08 resolves every admitted evidence reference', () => {
    fc.assert(fc.property(fc.integer({ min: 0, max: reviewedResumeClaims.length - 1 }), (index) => {
      const claim = reviewedResumeClaims[index]
      const result = reconcileResumeClaims([claim], verifiedPortfolioSource, evidenceManifest, [claim.category])
      return result.findings.length === 0 && result.claims.every((item) => item.evidence.length === item.evidenceIds.length)
    }), parameters)
  })

  it('U03-P09 detects duplicate stable identifiers', () => {
    fc.assert(fc.property(validClaimArbitrary, (claim) => {
      return reconcileResumeClaims([claim, claim], verifiedPortfolioSource, evidenceManifest, [claim.category])
        .findings.some(({ code }) => code === 'U03-RESUME-DUPLICATE-ID')
    }), parameters)
  })

  it('U03-P10 returns frozen top-level projections and section collections', () => {
    fc.assert(fc.property(validClaimArbitrary, (claim) => {
      const result = reconcileOne(claim)
      return Object.isFrozen(result)
        && Object.isFrozen(result.claims)
        && Object.isFrozen(result.sections)
        && Object.values(result.sections).every((section) => Object.isFrozen(section) && Object.isFrozen(section.claims) && Object.isFrozen(section.allClaimIds))
    }), parameters)
  })
})
