import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { FieldworkAndLeadership } from './FieldworkAndLeadership'
import { MethodsAndTools } from './MethodsAndTools'
import { toolsFieldworkSelection } from './sectionBodies'

afterEach(() => cleanup())

const selection = toolsFieldworkSelection.ok ? toolsFieldworkSelection.value : undefined

describe('U-06 tools and fieldwork bodies', () => {
  it('renders sixteen classified tools across four categories with no invented rating', () => {
    if (!selection) throw new Error('Expected accepted U-06 selection.')
    const { container } = render(<MethodsAndTools model={selection.tools} />)
    expect(screen.getByRole('heading', { name: /what i use, and where it shows up/i })).toBeInTheDocument()
    expect(container.querySelectorAll('[data-tool-id]')).toHaveLength(16)
    expect(container.querySelectorAll('[data-tool-id] [data-classification="demonstrated"]').length).toBe(13)
    expect(container.querySelectorAll('[data-tool-id] [data-classification="interest"]').length).toBe(3)
    expect(container.textContent).not.toMatch(/\b[1-5]\s*\/\s*5\b|★/)
    expect(container.querySelectorAll('[data-semantic-group]')).toHaveLength(4)
    expect(container.querySelector('section')).toBeNull()
  })

  it('links each demonstrated tool to its verified section anchor', () => {
    if (!selection) throw new Error('Expected accepted U-06 selection.')
    render(<MethodsAndTools model={selection.tools} />)
    const link = screen.getByRole('link', { name: /biology.*demonstrated in academic trajectory/i })
    expect(link).toHaveAttribute('href', '#academic-trajectory')
  })

  it('renders exactly one fieldwork record and three leadership records with full text', () => {
    if (!selection) throw new Error('Expected accepted U-06 selection.')
    render(<FieldworkAndLeadership model={selection.fieldworkLeadership} />)
    expect(screen.getByRole('heading', { name: /where responsibility met the field/i })).toBeInTheDocument()
    const fieldworkGroup = screen.getByRole('heading', { name: /^fieldwork/i }).closest('article')
    expect(fieldworkGroup).not.toBeNull()
    expect(within(fieldworkGroup!).getAllByRole('heading', { level: 3 })).toHaveLength(2)
    const leadershipGroup = screen.getByRole('heading', { name: /^leadership/i }).closest('article')
    expect(within(leadershipGroup!).getAllByRole('heading', { level: 3 })).toHaveLength(4)
    expect(within(fieldworkGroup!).getByText('Volunteer & Conservation Participant')).toBeInTheDocument()
    expect(within(leadershipGroup!).getByText('Deputy Head, Science Research & Content')).toBeInTheDocument()
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

  it('exposes an equivalent semantic summary for both bodies', () => {
    if (!selection) throw new Error('Expected accepted U-06 selection.')
    render(<MethodsAndTools model={selection.tools} />)
    expect(screen.getByTestId('tool-classification-summary')).toBeInTheDocument()
    cleanup()
    render(<FieldworkAndLeadership model={selection.fieldworkLeadership} />)
    expect(screen.getByTestId('activity-summary')).toBeInTheDocument()
    expect(screen.getAllByTestId('activity-summary')[0].querySelectorAll('[data-semantic-group]')).toHaveLength(2)
  })
})
