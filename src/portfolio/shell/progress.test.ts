import { describe, expect, it } from 'vitest'
import { sectionRegistry } from '../model/sectionRegistry'
import { deriveProgress } from './progress'

describe('progress derivation', () => {
  it('derives text and coordinates from registry order', () => {
    expect(deriveProgress('identity')).toMatchObject({ ordinal: 1, count: 10, locusRatio: 0 })
    expect(deriveProgress('contact')).toMatchObject({
      ordinal: 10,
      completionRatio: 1,
      semanticText: 'Contact and Research Notes, section 10 of 10',
    })
  })

  it('supports doubled metadata with the same linear contract', () => {
    const doubled = [...sectionRegistry, ...sectionRegistry.map((section, index) => ({
      ...section,
      order: sectionRegistry.length + index + 1,
    }))]
    expect(deriveProgress('tools', doubled)).toMatchObject({ ordinal: 8, count: 20 })
  })

  it('surfaces internal registry violations', () => {
    expect(() => deriveProgress('identity', [])).toThrow('Unknown registered section')
  })
})

