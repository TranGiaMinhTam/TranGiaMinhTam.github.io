import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { FieldworkAndLeadership } from './FieldworkAndLeadership'
import { MethodsAndTools } from './MethodsAndTools'
import { toolsFieldworkSelection } from './sectionBodies'

afterEach(() => cleanup())

const selection = toolsFieldworkSelection.ok ? toolsFieldworkSelection.value : undefined

describe('U-06 tools and fieldwork bodies', () => {
  it('renders sixteen tools as a simple list across four categories with no ratings or secondary panels', () => {
    if (!selection) throw new Error('Expected accepted U-06 selection.')
    const { container } = render(<MethodsAndTools model={selection.tools} />)
    expect(screen.getByRole('heading', { name: /what i use, and where it shows up/i })).toBeInTheDocument()
    expect(container.querySelectorAll('[data-tool-id]')).toHaveLength(16)
    expect(container.querySelector('[data-classification]')).toBeNull()
    expect(container.querySelector('[class*="toolConnections"]')).toBeNull()
    expect(container.querySelector('[data-testid="tool-classification-summary"]')).toBeNull()
    expect(container.textContent).not.toMatch(/\b[1-5]\s*\/\s*5\b|★/)
    expect(container.querySelector('section')).toBeNull()
  })

  it('does not add project links or evidence controls to the simple inventory', () => {
    if (!selection) throw new Error('Expected accepted U-06 selection.')
    const { container } = render(<MethodsAndTools model={selection.tools} />)
    expect(container.querySelector('a')).toBeNull()
    expect(container.querySelector('button')).toBeNull()
  })

  it('renders all four fieldwork and leadership records in one consistent sequence', () => {
    if (!selection) throw new Error('Expected accepted U-06 selection.')
    const { container } = render(<FieldworkAndLeadership model={selection.fieldworkLeadership} />)
    expect(screen.getByRole('heading', { name: /where responsibility met the field/i })).toBeInTheDocument()
    const recordList = screen.getByLabelText('Fieldwork and leadership experiences')
    expect(within(recordList).getAllByRole('article')).toHaveLength(4)
    expect(within(recordList).getByText('Volunteer & Conservation Participant')).toBeInTheDocument()
    expect(within(recordList).getByText('Deputy Head, Science Research & Content')).toBeInTheDocument()
    expect(container.querySelector('[data-semantic-group]')).toBeNull()
    expect(screen.getByTestId(/fieldwork-experience-/)).toBeInTheDocument()
  })

  it('renders no evidence action anywhere because no manifest entry exists for any record', () => {
    if (!selection) throw new Error('Expected accepted U-06 selection.')
    const { container: toolsContainer } = render(<MethodsAndTools model={selection.tools} />)
    expect(toolsContainer.querySelector('[data-testid="evidence-open-action"]')).toBeNull()
    cleanup()
    const { container: activityContainer } = render(<FieldworkAndLeadership model={selection.fieldworkLeadership} />)
    expect(activityContainer.querySelector('[data-testid="evidence-open-action"]')).toBeNull()
  })

  it('keeps both visible lists self-describing without duplicate summaries', () => {
    if (!selection) throw new Error('Expected accepted U-06 selection.')
    render(<MethodsAndTools model={selection.tools} />)
    expect(screen.queryByTestId('tool-classification-summary')).not.toBeInTheDocument()
    cleanup()
    render(<FieldworkAndLeadership model={selection.fieldworkLeadership} />)
    expect(screen.queryByTestId('activity-summary')).not.toBeInTheDocument()
  })
})
