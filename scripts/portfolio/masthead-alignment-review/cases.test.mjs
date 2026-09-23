import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { createReviewCases, sections, themes, widths } from './cases.mjs'

describe('U-02 rendered review case model', () => {
  it('generates the canonical 80-case base matrix without duplicate identifiers', () => {
    const cases = createReviewCases()
    expect(cases).toHaveLength(80)
    expect(new Set(cases.map(({ id }) => id)).size).toBe(80)
    expect(new Set(cases.map(({ section }) => section))).toEqual(new Set(sections))
  })

  it('keeps every selected dimension in its approved domain', () => {
    fc.assert(fc.property(fc.constantFrom(...createReviewCases()), (reviewCase) => {
      expect(sections).toContain(reviewCase.section)
      expect(widths).toContain(reviewCase.width)
      expect(themes).toContain(reviewCase.theme)
    }), { numRuns: 100, seed: 20260921 })
  })

  it('is deterministic and immutable at the collection boundary', () => {
    expect(createReviewCases()).toEqual(createReviewCases())
    expect(Object.isFrozen(createReviewCases())).toBe(true)
  })
})
