import { describe, expect, it } from 'vitest'
import { evidenceManifest } from '../model/evidenceManifest'
import { evidenceId } from '../model/portfolio.types'
import { verifiedPortfolioSource } from '../model/verifiedPortfolioSource'
import { reviewedResumeCategories, reviewedResumeClaims } from './resumeClaims'
import { reconcileResumeClaims } from './resumeReconciliation'

describe('resume claim reconciliation', () => {
  it('projects every reviewed claim once without changing the source model', () => {
    const recordCount = verifiedPortfolioSource.records.length
    const result = reconcileResumeClaims(reviewedResumeClaims, verifiedPortfolioSource, evidenceManifest, reviewedResumeCategories)

    expect(result.findings).toEqual([])
    expect(result.claims).toHaveLength(reviewedResumeClaims.length)
    expect(new Set(Object.values(result.sections).flatMap(({ allClaimIds }) => allClaimIds)).size).toBe(reviewedResumeClaims.length)
    expect(verifiedPortfolioSource.records).toHaveLength(recordCount)
  })

  it('fails closed for duplicate claims and unresolved evidence or records', () => {
    const first = reviewedResumeClaims[0]
    const duplicate = reconcileResumeClaims([first, first], verifiedPortfolioSource, evidenceManifest, [first.category])
    const missingEvidence = reconcileResumeClaims([
      { ...reviewedResumeClaims[2], evidenceIds: [evidenceId('evidence-does-not-exist')] },
    ], verifiedPortfolioSource, evidenceManifest, [reviewedResumeClaims[2].category])
    const missingRecord = reconcileResumeClaims([
      { ...first, existingRecordId: 'record-does-not-exist' as typeof first.existingRecordId },
    ], verifiedPortfolioSource, evidenceManifest, [first.category])

    expect(duplicate.findings.map(({ code }) => code)).toContain('U03-RESUME-DUPLICATE-ID')
    expect(missingEvidence.findings.map(({ code }) => code)).toContain('U03-RESUME-EVIDENCE-MISSING')
    expect(missingRecord.findings.map(({ code }) => code)).toContain('U03-RESUME-RECORD-MISSING')
  })

  it('keeps reconciled existing records reference-only to prevent duplicate primary prose', () => {
    const result = reconcileResumeClaims(reviewedResumeClaims, verifiedPortfolioSource, evidenceManifest, reviewedResumeCategories)
    const referenced = result.claims.filter(({ existingRecordId }) => existingRecordId)

    expect(referenced.length).toBeGreaterThan(0)
    expect(referenced.every(({ presentation }) => presentation === 'reference-only')).toBe(true)
    expect(Object.values(result.sections).flatMap(({ claims }) => claims).some(({ existingRecordId }) => existingRecordId)).toBe(false)
  })
})
