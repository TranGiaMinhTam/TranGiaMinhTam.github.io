import { describe, expect, it } from 'vitest'
import { selectVisibilityWinner } from './visibility'
import type { VisibilityFact } from './shell.types'

const fact = (sectionId: VisibilityFact['sectionId'], anchorDistance: number, ratio = 0.5, sequence = 1): VisibilityFact => ({
  sectionId,
  anchorDistance,
  ratio,
  sequence,
  isIntersecting: true,
})

describe('visibility winner', () => {
  it('uses anchor distance, ratio, and registry order deterministically', () => {
    expect(selectVisibilityWinner([
      fact('questions', 12, 0.9),
      fact('identity', -4, 0.2),
    ], 'questions')).toBe('identity')
    expect(selectVisibilityWinner([
      fact('questions', 4, 0.8),
      fact('identity', -4, 0.8),
    ], 'contact')).toBe('identity')
  })

  it('gives a current deliberate intent precedence', () => {
    expect(selectVisibilityWinner(
      [fact('identity', 0, 1, 5)],
      'identity',
      { sectionId: 'contact', sequence: 5 },
    )).toBe('contact')
  })

  it('retains the previous section when no registered target is visible', () => {
    expect(selectVisibilityWinner([], 'data-stories')).toBe('data-stories')
  })
})

