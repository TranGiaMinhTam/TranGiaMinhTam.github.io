import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { sectionRegistry } from '../model/sectionRegistry'
import { SectionBodyResolver } from '../shell/SectionBodyResolver'
import { identityQuestionBodyRegistry, identityQuestionsSelection } from './sectionBodies'

afterEach(() => cleanup())

describe('identity and question body registry', () => {
  it('contains exactly the two approved body keys', () => {
    expect(Object.keys(identityQuestionBodyRegistry)).toEqual(['identity', 'questions'])
    expect(identityQuestionsSelection.ok).toBe(true)
  })

  it('resolves two finished bodies and eight unchanged temporary bodies', () => {
    const { container } = render(<>{sectionRegistry.map((section) => <div key={section.id} data-section={section.id}>
      <SectionBodyResolver section={section} bodies={identityQuestionBodyRegistry} onNavigate={() => false} />
    </div>)}</>)
    expect(screen.getByTestId('research-identity-body')).toBeInTheDocument()
    expect(screen.getByTestId('research-questions-body')).toBeInTheDocument()
    expect(container.querySelectorAll('[data-testid^="temporary-section-body-"]')).toHaveLength(8)
    expect([...container.querySelectorAll('[data-section]')].map((node) => node.getAttribute('data-section'))).toEqual(sectionRegistry.map((section) => section.id))
  })
})
