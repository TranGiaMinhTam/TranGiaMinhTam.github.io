import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { identityQuestionsSelection } from './sectionBodies'
import { ResearchIdentity } from './ResearchIdentity'

afterEach(() => cleanup())

const identity = identityQuestionsSelection.ok ? identityQuestionsSelection.value.identity : undefined

describe('ResearchIdentity', () => {
  it('renders verified identity, exploration status, and truthful native actions', () => {
    if (!identity) throw new Error('Expected verified identity fixture.')
    const onNavigate = vi.fn(() => true)
    render(<ResearchIdentity identity={identity} onNavigate={onNavigate} />)

    expect(screen.getByText('TRAN GIA MINH TAM')).toBeInTheDocument()
    expect(screen.getByText(/Student Researcher in Biology/)).toBeInTheDocument()
    expect(screen.getByText('Fields in exploration')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(4)

    const portrait = screen.getByRole('img', { name: 'Portrait of Tran Gia Minh Tam' })
    expect(portrait).toHaveAttribute('width', '1920')
    expect(portrait).toHaveAttribute('height', '2560')
    expect(portrait).toHaveAttribute('loading', 'eager')
    expect(portrait).toHaveAttribute('decoding', 'async')

    const cv = screen.getByTestId('identity-cv-status')
    expect(cv).toHaveAttribute('aria-disabled', 'true')
    expect(cv).toHaveAccessibleName('Download CV. Available soon.')
    expect(screen.queryByRole('link', { name: /download cv/i })).not.toBeInTheDocument()
    expect(screen.queryByText(/download academic record/i)).not.toBeInTheDocument()
    const questions = screen.getByTestId('identity-questions-link')
    expect(questions).toHaveAttribute('href', '#questions')
    fireEvent.click(questions)
    expect(onNavigate).toHaveBeenCalledWith('questions')
  })

  it('degrades to complete text identity when the portrait fails', () => {
    if (!identity) throw new Error('Expected verified identity fixture.')
    render(<ResearchIdentity identity={identity} onNavigate={() => false} />)
    fireEvent.error(screen.getByRole('img'))
    expect(screen.getByTestId('identity-portrait-fallback')).toHaveTextContent('Identity details remain available in text')
    expect(screen.getByText('TRAN GIA MINH TAM')).toBeInTheDocument()
    expect(screen.getByTestId('identity-cv-status')).toBeInTheDocument()
  })
})
