import { describe, expect, it } from 'vitest'

import { sectionIds } from '../data/portfolio'
import { activePortfolioTemplate, getPortfolioTemplate, portfolioTemplates } from './index'

 describe('portfolio template registry', () => {
  it('exposes one profile-specific research casebook template', () => {
    expect(portfolioTemplates.map((template) => template.id)).toEqual(['business'])
    expect(activePortfolioTemplate.id).toBe('business')
    expect(getPortfolioTemplate().id).toBe('business')
  })

  it('keeps the retained template aligned with every portfolio section', () => {
    const template = activePortfolioTemplate

    expect(template.label).toBe('Research Casebook')
    expect(template.description).toContain('scientific projects')

    for (const sectionId of sectionIds) {
      expect(template.chapterLabels[sectionId]).toBeTruthy()
      expect(template.sectionComponents[sectionId]).toBeTypeOf('function')
    }
  })
})
