import { describe, expect, it } from 'vitest'
import { isSectionId, sectionRegistry } from './sectionRegistry'

describe('sectionRegistry', () => {
  it('keeps the exact approved order and hash mapping', () => {
    expect(sectionRegistry.map(({ id }) => id)).toEqual([
      'identity', 'questions', 'computational-projects', 'laboratory-research', 'data-stories',
      'academic-trajectory', 'evidence-library', 'tools', 'fieldwork-leadership', 'contact',
    ])
    expect(sectionRegistry.map(({ order }) => order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(sectionRegistry.every(({ id, hash }) => hash === `#${id}`)).toBe(true)
  })

  it('uses unique fields and rejects former top-level IDs', () => {
    for (const key of ['id', 'label', 'shortLabel', 'hash', 'componentKey'] as const) {
      expect(new Set(sectionRegistry.map((section) => section[key])).size).toBe(10)
    }
    for (const id of ['home', 'about', 'experience', 'awards', 'gallery', 'skills', 'journal']) expect(isSectionId(id)).toBe(false)
  })
})
