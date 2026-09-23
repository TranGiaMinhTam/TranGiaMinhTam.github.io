import { describe, expect, it } from 'vitest'
import { resolveSectionHash, sectionHash } from './sectionHash'

describe('section hash boundary', () => {
  it('accepts only exact registered section values', () => {
    expect(resolveSectionHash('#computational-projects')).toEqual({
      kind: 'section',
      sectionId: 'computational-projects',
      normalizedHash: '#computational-projects',
    })
    expect(sectionHash('contact')).toBe('#contact')
  })

  it.each(['', '#', '#unknown', '#Identity', '#identity%22', '#identity?next=contact', '##identity'])(
    'normalizes malformed input %s without reflecting it',
    (value) => expect(resolveSectionHash(value)).toEqual({
      kind: 'invalid',
      sectionId: 'identity',
      replacementHash: '#identity',
    }),
  )

  it('preserves only the constrained journal namespace', () => {
    expect(resolveSectionHash('#/journal/genome-notes')).toEqual({ kind: 'journal', hash: '#/journal/genome-notes' })
    expect(resolveSectionHash('#/journal/<script>')).toHaveProperty('kind', 'invalid')
  })
})

