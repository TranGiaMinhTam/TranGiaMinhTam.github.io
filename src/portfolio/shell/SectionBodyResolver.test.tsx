import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { sectionRegistry } from '../model/sectionRegistry'
import { SectionBodyResolver, type SectionBodyRegistry } from './SectionBodyResolver'

afterEach(() => cleanup())

describe('SectionBodyResolver', () => {
  it('retains the exact temporary fallback when no body is registered', () => {
    const section = sectionRegistry[0]
    render(<SectionBodyResolver section={section} onNavigate={() => false} />)
    expect(screen.getByTestId(`temporary-section-body-${section.id}`)).toHaveTextContent('Domain module scheduled for a future release')
  })

  it('renders only a body registered for the matching section', () => {
    const bodies: SectionBodyRegistry = Object.freeze({ identity: () => <p>Verified identity body</p> })
    render(<SectionBodyResolver section={sectionRegistry[0]} bodies={bodies} onNavigate={() => false} />)
    expect(screen.getByText('Verified identity body')).toBeInTheDocument()
    expect(screen.queryByTestId('temporary-section-body-identity')).not.toBeInTheDocument()
  })
})
