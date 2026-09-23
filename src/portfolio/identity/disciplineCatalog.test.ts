import { describe, expect, it } from 'vitest'
import { coordinateById, disciplineCoordinates, resolveDomainCoordinates } from './disciplineCatalog'

describe('discipline catalog', () => {
  it('maps only the three approved source domains', () => {
    expect(resolveDomainCoordinates('Computational biology / drug screening')).toEqual(['computational-biology', 'molecular-science'])
    expect(resolveDomainCoordinates('Natural products / sustainability')).toEqual(['natural-products', 'sustainability'])
    expect(resolveDomainCoordinates('Data science / visual analytics')).toEqual(['data-science', 'visual-analytics'])
    expect(resolveDomainCoordinates('Unverified discipline')).toBeUndefined()
  })

  it('provides six stable normalized coordinates', () => {
    expect(disciplineCoordinates).toHaveLength(6)
    expect(coordinateById.size).toBe(6)
    for (const coordinate of disciplineCoordinates) {
      expect(coordinate.position.x).toBeGreaterThanOrEqual(0)
      expect(coordinate.position.x).toBeLessThanOrEqual(100)
      expect(coordinate.position.y).toBeGreaterThanOrEqual(0)
      expect(coordinate.position.y).toBeLessThanOrEqual(100)
    }
  })
})
