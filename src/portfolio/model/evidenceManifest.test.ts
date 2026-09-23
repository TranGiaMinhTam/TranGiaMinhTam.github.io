import { describe, expect, it } from 'vitest'
import { evidenceManifest, resolvePublishedEvidence } from './evidenceManifest'
import { identityQuestionEvidenceManifest } from './verifiedIdentityQuestionsSource'

describe('evidenceManifest', () => {
  it('publishes only explicit curated safe paths with accessible context', () => {
    expect(evidenceManifest.length).toBeGreaterThan(0)
    expect(new Set(evidenceManifest.map(({ id }) => id)).size).toBe(evidenceManifest.length)
    for (const item of evidenceManifest) {
      expect(item.status).toBe('published')
      expect(item.provenance).not.toBe('')
      expect(item.accessibleText).not.toBe('')
      expect(item.full.path).not.toMatch(/(?:^|\/)source(?:\/|$)|\.\.|^(?:https?:|data:|javascript:)/i)
      expect(item.full.source).toBeTruthy()
      expect(item.full.mediaKind === 'pdf' ? item.loadStrategy : ['lazy', 'on-demand']).toContain(item.loadStrategy)
    }
  })

  it('resolves published evidence and safely omits unknown optional evidence', () => {
    expect(resolvePublishedEvidence('evidence-academic-transcript')).toBeUndefined()
    expect(resolvePublishedEvidence('not-published')).toBeUndefined()
  })

  it('reuses the lightweight identity evidence records without changing them', () => {
    for (const record of identityQuestionEvidenceManifest) {
      expect(evidenceManifest.find((item) => item.id === record.id)).toBe(record)
    }
  })
})
