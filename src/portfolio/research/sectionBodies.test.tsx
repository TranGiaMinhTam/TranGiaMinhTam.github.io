import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { identityQuestionBodyRegistry } from '../identity/sectionBodies'
import { sectionRegistry } from '../model/sectionRegistry'
import { SectionBodyResolver } from '../shell/SectionBodyResolver'
import {
  composePortfolioBodyRegistries,
  researchDataBodyRegistry,
  researchDataSelection,
} from './sectionBodies'

afterEach(() => cleanup())

describe('U-04 section body registry', () => {
  it('owns exactly three approved keys and rejects duplicate composition', () => {
    expect(Object.keys(researchDataBodyRegistry)).toEqual(['computational-projects', 'laboratory-research', 'data-stories'])
    expect(researchDataSelection.ok).toBe(true)
    expect(() => composePortfolioBodyRegistries(researchDataBodyRegistry, researchDataBodyRegistry)).toThrow(/Duplicate section body registration/)
  })

  it('composes five finished bodies with five unchanged temporary bodies', () => {
    const bodies = composePortfolioBodyRegistries(identityQuestionBodyRegistry, researchDataBodyRegistry)
    const { container } = render(<>{sectionRegistry.map((section) => <div key={section.id} data-section={section.id}>
      <SectionBodyResolver section={section} bodies={bodies} onNavigate={() => false} />
    </div>)}</>)
    expect(Object.keys(bodies)).toEqual(['identity', 'questions', 'computational-projects', 'laboratory-research', 'data-stories'])
    expect(screen.getByTestId('research-identity-body')).toBeInTheDocument()
    expect(screen.getByTestId('research-questions-body')).toBeInTheDocument()
    expect(screen.getByTestId('computational-projects-body')).toBeInTheDocument()
    expect(screen.getByTestId('laboratory-research-body')).toBeInTheDocument()
    expect(screen.getByTestId('data-stories-body')).toBeInTheDocument()
    expect(container.querySelectorAll('[data-testid^="temporary-section-body-"]')).toHaveLength(5)
    expect([...container.querySelectorAll('[data-section]')].map((node) => node.getAttribute('data-section'))).toEqual(sectionRegistry.map(({ id }) => id))
  })
})
