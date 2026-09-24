import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { CompleteEvidenceLibrary } from './CompleteEvidenceLibrary'

afterEach(() => cleanup())

describe('U-04 complete Evidence Library candidate', () => {
  it('keeps section identity while rendering summary-only activity navigation', () => {
    const { container } = render(<CompleteEvidenceLibrary />)
    expect(screen.getByRole('heading', { name: /certificates, projects, and fieldwork/i })).toBeInTheDocument()
    expect(screen.getByText('PORTFOLIO ARCHIVE / 105 ITEMS')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(6)
    expect(screen.getByText(/selected 2026 protein docking conference photograph.*project stories/i)).toBeInTheDocument()
    expect(container.querySelector('img, iframe, object, embed')).toBeNull()
    expect(container.querySelector('[data-archive-item]')).toBeNull()
  })
})
