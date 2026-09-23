import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { identityQuestionBodyRegistry } from '../identity/sectionBodies'
import { sectionRegistry } from '../model/sectionRegistry'
import { composePortfolioBodyRegistries, researchDataBodyRegistry } from '../research/sectionBodies'
import { SectionBodyResolver } from '../shell/SectionBodyResolver'
import { academicEvidenceBodyRegistry, academicEvidenceSelection } from './sectionBodies'

afterEach(() => cleanup())

describe('U-05 section body registry', () => {
  it('owns exactly two approved keys and composes without duplicates', () => {
    expect(Object.keys(academicEvidenceBodyRegistry)).toEqual(['academic-trajectory', 'evidence-library'])
    expect(academicEvidenceSelection.ok).toBe(true)
    expect(() => composePortfolioBodyRegistries(academicEvidenceBodyRegistry, academicEvidenceBodyRegistry)).toThrow(/Duplicate section body registration/)
  })

  it('composes seven finished bodies with three unchanged temporary bodies', () => {
    const bodies = composePortfolioBodyRegistries(identityQuestionBodyRegistry, researchDataBodyRegistry, academicEvidenceBodyRegistry)
    const { container } = render(<>{sectionRegistry.map((section) => <div key={section.id} data-section={section.id}>
      <SectionBodyResolver section={section} bodies={bodies} onNavigate={() => false} />
    </div>)}</>)
    expect(Object.keys(bodies)).toEqual([
      'identity', 'questions', 'computational-projects', 'laboratory-research', 'data-stories', 'academic-trajectory', 'evidence-library',
    ])
    expect(screen.getByTestId('academic-trajectory-body')).toBeInTheDocument()
    expect(screen.getByTestId('evidence-library-body')).toBeInTheDocument()
    expect(container.querySelectorAll('[data-testid^="temporary-section-body-"]')).toHaveLength(3)
    expect([...container.querySelectorAll('[data-section]')].map((node) => node.getAttribute('data-section'))).toEqual(sectionRegistry.map(({ id }) => id))
  })
})
