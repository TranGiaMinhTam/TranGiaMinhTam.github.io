import { describe, expect, it } from 'vitest'
import { evidenceManifest } from '../model/evidenceManifest'
import { contentId, evidenceId, type VerifiedPortfolioSource } from '../model/portfolio.types'
import { verifiedPortfolioSource } from '../model/verifiedPortfolioSource'
import { assembleAcademicEvidence, validateAcademicRelationships, withoutAcademicEvidence } from './academicEvidenceModel'
import type { AcademicEvidenceRelationship } from './academic.types'

const withRecords = (records: VerifiedPortfolioSource['records']): VerifiedPortfolioSource => ({ ...verifiedPortfolioSource, records })

describe('assembleAcademicEvidence', () => {
  it('assembles exact academic strata and the thirteen-item archive deterministically', () => {
    const first = assembleAcademicEvidence(verifiedPortfolioSource, evidenceManifest)
    const second = assembleAcademicEvidence(verifiedPortfolioSource, evidenceManifest)
    expect(first).toEqual(second)
    expect(first.ok).toBe(true)
    if (!first.ok) throw new Error('Expected accepted U-05 selection.')

    expect(first.value.trajectory.strata.map(({ program, status }) => [program, status])).toEqual([
      ['AS & A-Level Program', 'in-progress'],
      ['IGCSE', 'completed'],
    ])
    expect(first.value.trajectory.strata[0].facts.map(({ label }) => label)).toEqual(expect.arrayContaining([
      'GPA 9.0/10 in Grade 10', 'Grade 11 AS-level: AAA', 'IELTS 7.0 (September 2025)',
    ]))
    expect(first.value.library.groups.map(({ count }) => count)).toEqual([2, 4, 7])
    expect(first.value.library.spectrum).toEqual(first.value.library.semanticCounts)
    expect(first.value.trajectory.semanticRows.map(({ relationshipId }) => relationshipId)).toEqual(
      first.value.trajectory.relationships.map(({ id }) => id),
    )
  })

  it('preserves academics and recomputes counts when optional evidence is absent', () => {
    const result = assembleAcademicEvidence(
      verifiedPortfolioSource,
      withoutAcademicEvidence(evidenceManifest, evidenceId('evidence-borsworth-scholarship')),
    )
    expect(result.ok).toBe(true)
    if (!result.ok) throw new Error('Optional evidence must not reject academics.')
    expect(result.value.trajectory.strata).toHaveLength(2)
    expect(result.value.library.groups.find(({ id }) => id === 'scholarships')?.count).toBe(1)
    expect(result.findings).toEqual(expect.arrayContaining([expect.objectContaining({ code: 'U05-EVIDENCE-OPTIONAL-MISSING', severity: 'optional' })]))
  })

  it('fails closed for missing programs, malformed facts, duplicate evidence, and unsafe sources', () => {
    const academicId = contentId('academic-1')
    const current = verifiedPortfolioSource.records.find(({ id }) => id === academicId)
    if (!current) throw new Error('Expected current academic fixture.')
    const missing = assembleAcademicEvidence(withRecords(verifiedPortfolioSource.records.filter(({ id }) => id !== academicId)), evidenceManifest)
    const malformed = assembleAcademicEvidence(withRecords(verifiedPortfolioSource.records.map((record) => record.id === academicId ? { ...record, facts: { ...record.facts, details: [] } } : record)), evidenceManifest)
    const duplicate = assembleAcademicEvidence(verifiedPortfolioSource, [...evidenceManifest, evidenceManifest[1]])
    const unsafe = assembleAcademicEvidence(verifiedPortfolioSource, evidenceManifest.map((record) => record.id === 'evidence-worthgate-scholarship' ? { ...record, full: { ...record.full, source: 'javascript:alert(1)' } } : record))
    for (const result of [missing, malformed, duplicate, unsafe]) expect(result.ok).toBe(false)
    expect([...missing.findings, ...malformed.findings, ...duplicate.findings, ...unsafe.findings].map(({ code }) => code)).toEqual(expect.arrayContaining([
      'U05-ACADEMIC-CARDINALITY', 'U05-ACADEMIC-FIELD', 'U05-EVIDENCE-DUPLICATE', 'U05-EVIDENCE-INVALID',
    ]))
  })

  it('validates eighty indexed relationships across four program sources deterministically', () => {
    const relationships: AcademicEvidenceRelationship[] = Array.from({ length: 80 }, (_, index) => ({
      id: `capacity-relationship-${index + 1}`,
      sourceId: `capacity-program-${(index % 4) + 1}`,
      targetId: evidenceId(`capacity-evidence-${(index % 20) + 1}`),
      kind: index % 2 === 0 ? 'documented-in' : 'recognized-by',
      sourceLabel: `Program ${(index % 4) + 1}`,
      targetLabel: `Evidence ${(index % 20) + 1}`,
      order: index + 1,
    }))
    const sourceIds = new Set(Array.from({ length: 4 }, (_, index) => `capacity-program-${index + 1}`))
    const targetIds = new Set(Array.from({ length: 20 }, (_, index) => `capacity-evidence-${index + 1}`))
    expect(validateAcademicRelationships(relationships, sourceIds, targetIds)).toEqual([])
    expect(validateAcademicRelationships(relationships, sourceIds, targetIds)).toEqual([])
  })

  it('reports duplicate and broken relationship endpoints in stable order', () => {
    const relationship: AcademicEvidenceRelationship = {
      id: 'relationship-1', sourceId: 'missing-source', targetId: evidenceId('missing-target'),
      kind: 'documented-in', sourceLabel: 'Missing', targetLabel: 'Missing', order: 1,
    }
    expect(validateAcademicRelationships([relationship, relationship], new Set(), new Set())).toEqual([
      expect.objectContaining({ code: 'U05-RELATIONSHIP-ENDPOINT' }),
      expect.objectContaining({ code: 'U05-RELATIONSHIP-ENDPOINT' }),
      expect.objectContaining({ code: 'U05-RELATIONSHIP-DUPLICATE' }),
    ])
  })

  it('keeps portrait, CV, former-owner, raw, and later-unit content outside accepted output', () => {
    const result = assembleAcademicEvidence(verifiedPortfolioSource, evidenceManifest)
    expect(result.ok).toBe(true)
    expect(JSON.stringify(result)).not.toMatch(/profile-portrait|pending cv|wordpress|former-owner|raw archive|fieldwork/i)
  })
})
