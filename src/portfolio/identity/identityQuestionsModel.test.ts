import { describe, expect, it } from 'vitest'
import { evidenceManifest } from '../model/evidenceManifest'
import { contentId, type ContentRecord, type VerifiedPortfolioSource } from '../model/portfolio.types'
import { verifiedPortfolioSource } from '../model/verifiedPortfolioSource'
import { identityQuestionEvidenceManifest, verifiedIdentityQuestionsSource } from '../model/verifiedIdentityQuestionsSource'
import { assembleIdentityQuestions, buildQuestionRelationships } from './identityQuestionsModel'

const withRecords = (records: readonly ContentRecord[]): VerifiedPortfolioSource => ({
  ...verifiedPortfolioSource,
  records,
})

describe('identity and questions assembly', () => {
  it('keeps the lightweight canonical projection factually equivalent to the full source', () => {
    const fullIdentity = verifiedPortfolioSource.records.find((record) => record.id === verifiedPortfolioSource.identityId)
    const projectedIdentity = verifiedIdentityQuestionsSource.records.find((record) => record.id === verifiedIdentityQuestionsSource.identityId)
    expect(projectedIdentity).toEqual(fullIdentity)
    expect(verifiedIdentityQuestionsSource.records.filter((record) => record.kind === 'question').map(({ id, title, facts, order, status }) => ({ id, title, facts, order, status }))).toEqual(
      verifiedPortfolioSource.records.filter((record) => record.kind === 'question').map(({ id, title, facts, order, status }) => ({ id, title, facts, order, status })),
    )
    expect(identityQuestionEvidenceManifest.map((record) => record.id)).toEqual(['evidence-profile-portrait'])
  })
  it('assembles one verified identity, truthful evidence actions, and three exact questions', () => {
    const result = assembleIdentityQuestions(verifiedPortfolioSource, evidenceManifest)
    expect(result.ok).toBe(true)
    if (!result.ok) return

    expect(result.value.identity.name).toBe('TRAN GIA MINH TAM')
    expect(result.value.identity.curriculumVitae).toEqual({
      label: 'Download CV',
      status: 'awaiting-file',
      statusText: 'Available soon',
    })
    expect(result.value.questions.questions.map((question) => question.text)).toEqual([
      'Can computational docking help compare candidate interactions across therapeutic targets implicated in Type II diabetes?',
      'How can an agricultural by-product be transformed into a useful source of bioactive polyphenols?',
      'How can retail data be translated into clear visual evidence and actionable recommendations?',
    ])
  })

  it('derives identical canonical, visual, and semantic relationship identifiers', () => {
    const result = assembleIdentityQuestions(verifiedPortfolioSource, evidenceManifest)
    if (!result.ok) throw new Error('Expected verified source to assemble.')
    const canonical = result.value.questions.relationships.map((relationship) => relationship.id).sort()
    const visual = result.value.questions.visualization.values.map((value) => value.id).sort()
    const semantic = result.value.questions.semanticRows.flatMap((row) => row.relationshipIds).sort()
    expect(visual).toEqual(canonical)
    expect(semantic).toEqual(canonical)
    expect(new Set(canonical).size).toBe(canonical.length)
  })

  it('returns stable blocking findings for missing required records and evidence', () => {
    const withoutIdentity = withRecords(verifiedPortfolioSource.records.filter((record) => record.kind !== 'identity'))
    const first = assembleIdentityQuestions(withoutIdentity, evidenceManifest)
    const second = assembleIdentityQuestions(withoutIdentity, evidenceManifest)
    expect(first).toEqual(second)
    expect(first.ok).toBe(false)
    if (!first.ok) expect(first.findings.map((item) => item.code)).toContain('U03-IDENTITY-CARDINALITY')

    const withoutPortrait = evidenceManifest.filter((record) => record.id !== 'evidence-profile-portrait')
    const portraitResult = assembleIdentityQuestions(verifiedPortfolioSource, withoutPortrait)
    expect(portraitResult.ok).toBe(false)
    if (!portraitResult.ok) expect(portraitResult.findings.map((item) => item.code)).toContain('U03-PORTRAIT-MISSING')
  })

  it('rejects unknown domains and duplicate question relationships', () => {
    const questions = verifiedPortfolioSource.records.filter((record) => record.kind === 'question')
    const unknown = { ...questions[0]!, facts: { domain: 'Unverified discipline' } }
    const unknownResult = buildQuestionRelationships([unknown, ...questions.slice(1)])
    expect(unknownResult.findings.map((item) => item.code)).toContain('U03-DOMAIN-UNKNOWN')

    const duplicateResult = buildQuestionRelationships([questions[0]!, questions[0]!])
    expect(duplicateResult.findings.map((item) => item.code)).toContain('U03-RELATIONSHIP-DUPLICATE')
  })

  it('handles six questions and twelve relationships with the same deterministic pipeline', () => {
    const sourceQuestions = verifiedPortfolioSource.records.filter((record) => record.kind === 'question')
    const doubled = [...sourceQuestions, ...sourceQuestions.map((record, index) => ({
      ...record,
      id: contentId(`capacity-question-${index + 1}`),
      order: record.order + 3,
    }))]
    const first = buildQuestionRelationships(doubled)
    const second = buildQuestionRelationships(doubled)
    expect(first.findings).toEqual([])
    expect(first.questions).toHaveLength(6)
    expect(first.relationships).toHaveLength(12)
    expect(first).toEqual(second)
  })
})
