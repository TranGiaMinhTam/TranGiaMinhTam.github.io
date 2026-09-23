import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { ResearchQuestions } from './ResearchQuestions'
import { identityQuestionsSelection } from './sectionBodies'

afterEach(() => cleanup())

const model = identityQuestionsSelection.ok ? identityQuestionsSelection.value.questions : undefined

describe('ResearchQuestions', () => {
  it('renders three exploratory questions, a passive constellation, and equivalent semantic rows', () => {
    if (!model) throw new Error('Expected verified questions fixture.')
    const { container } = render(<ResearchQuestions model={model} />)
    expect(screen.getAllByText('Question under exploration')).toHaveLength(3)
    expect(screen.getAllByText(/computational docking help compare/i)).toHaveLength(2)
    expect(screen.getAllByText(/agricultural by-product/i)).toHaveLength(2)
    expect(screen.getAllByText(/retail data be translated/i)).toHaveLength(2)
    expect(screen.getByRole('img', { name: /^Questions and fields in exploration/ })).toBeInTheDocument()

    const summary = screen.getByTestId('question-relationship-summary')
    expect(within(summary).getAllByRole('listitem')).toHaveLength(3)
    expect(container.querySelector('table')).toBeNull()
    expect(container.querySelectorAll('line')).toHaveLength(model.relationships.length)
    expect(model.semanticRows.flatMap((row) => row.relationshipIds).sort()).toEqual(model.relationships.map((item) => item.id).sort())
  })

  it('uses focus only to emphasize existing relationships', () => {
    if (!model) throw new Error('Expected verified questions fixture.')
    const { container } = render(<ResearchQuestions model={model} />)
    const first = screen.getByTestId('research-question-1')
    fireEvent.focus(first)
    expect(first).toHaveAttribute('data-emphasized', 'true')
    expect(container.querySelectorAll('line[data-related="true"]')).toHaveLength(2)
    expect(screen.getAllByText('Question under exploration')).toHaveLength(3)
    fireEvent.blur(first)
    expect(container.querySelectorAll('line[data-related="true"]')).toHaveLength(0)
  })
})
