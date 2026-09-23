import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { AcademicTrajectory } from './AcademicTrajectory'
import { EvidenceLibrary } from './EvidenceLibrary'
import { academicEvidenceSelection } from './sectionBodies'

afterEach(() => cleanup())

const selection = academicEvidenceSelection.ok ? academicEvidenceSelection.value : undefined

describe('U-05 academic and evidence bodies', () => {
  it('renders the curriculum cross-section with exact status, results, and canonical actions', () => {
    if (!selection) throw new Error('Expected accepted U-05 selection.')
    render(<AcademicTrajectory model={selection.trajectory} />)
    expect(screen.getByRole('heading', { name: /curriculum cross-section/i })).toBeInTheDocument()
    expect(screen.getByText('In progress')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByText('GPA 9.0/10 in Grade 10')).toBeInTheDocument()
    expect(screen.getByText('Grade 11 AS-level: AAA')).toBeInTheDocument()
    expect(screen.getByText('IELTS 7.0 (September 2025)')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /academic transcript/i })).not.toBeInTheDocument()
    expect(screen.getAllByText('Scholarship offer')).toHaveLength(2)
    expect(screen.queryByText(/download cv/i)).not.toBeInTheDocument()
  })

  it('renders thirteen grouped records with equivalent semantic counts and text-first PDFs', () => {
    if (!selection) throw new Error('Expected accepted U-05 selection.')
    const { container } = render(<EvidenceLibrary model={selection.library} />)
    expect(screen.getByRole('heading', { name: /project materials, organized by category/i })).toBeInTheDocument()
    expect(container.querySelectorAll('[data-evidence-id]')).toHaveLength(13)
    expect(container.querySelectorAll('[data-testid^="document-preview-"]')).toHaveLength(6)
    expect(container.querySelectorAll('[data-testid^="image-preview-"]')).toHaveLength(7)
    expect(container.querySelector('iframe, object, embed')).toBeNull()
    expect(selection.library.spectrum).toEqual(selection.library.semanticCounts)
    expect(screen.getByText('2 records')).toBeInTheDocument()
    expect(screen.getByText('4 records')).toBeInTheDocument()
  })

  it('keeps image metadata and actions available after a local preview failure', () => {
    if (!selection) throw new Error('Expected accepted U-05 selection.')
    render(<EvidenceLibrary model={selection.library} />)
    const image = screen.getByAltText(/protein docking research completion/i)
    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).toHaveAttribute('decoding', 'async')
    fireEvent.error(image)
    expect(screen.getByText(/preview unavailable/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /open full image.*protein docking research completion.*new tab/i })).toBeInTheDocument()
  })
})
