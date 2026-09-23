import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { academicEvidenceBodyRegistry } from '../academics/sectionBodies'
import { identityQuestionBodyRegistry } from '../identity/sectionBodies'
import { sectionRegistry } from '../model/sectionRegistry'
import { composePortfolioBodyRegistries, researchDataBodyRegistry } from '../research/sectionBodies'
import { SectionBodyResolver } from '../shell/SectionBodyResolver'
import { toolsFieldworkBodyRegistry, toolsFieldworkSelection } from './sectionBodies'

afterEach(() => cleanup())

describe('U-06 section body registry', () => {
  it('owns exactly two approved keys and composes without duplicates', () => {
    expect(Object.keys(toolsFieldworkBodyRegistry)).toEqual(['tools', 'fieldwork-leadership'])
    expect(toolsFieldworkSelection.ok).toBe(true)
    expect(() => composePortfolioBodyRegistries(toolsFieldworkBodyRegistry, toolsFieldworkBodyRegistry)).toThrow(/Duplicate section body registration/)
  })

  it('composes nine finished bodies with one unchanged temporary body', () => {
    const bodies = composePortfolioBodyRegistries(
      identityQuestionBodyRegistry, researchDataBodyRegistry, academicEvidenceBodyRegistry, toolsFieldworkBodyRegistry,
    )
    const { container } = render(<>{sectionRegistry.map((section) => <div key={section.id} data-section={section.id}>
      <SectionBodyResolver section={section} bodies={bodies} onNavigate={() => false} />
    </div>)}</>)
    expect(Object.keys(bodies)).toEqual([
      'identity', 'questions', 'computational-projects', 'laboratory-research', 'data-stories',
      'academic-trajectory', 'evidence-library', 'tools', 'fieldwork-leadership',
    ])
    expect(screen.getByTestId('methods-and-tools-body')).toBeInTheDocument()
    expect(screen.getByTestId('fieldwork-and-leadership-body')).toBeInTheDocument()
    expect(container.querySelectorAll('[data-testid^="temporary-section-body-"]')).toHaveLength(1)
    expect([...container.querySelectorAll('[data-section]')].map((node) => node.getAttribute('data-section'))).toEqual(sectionRegistry.map(({ id }) => id))
  })
})
