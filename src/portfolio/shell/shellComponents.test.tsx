import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { deriveProgress } from './progress'
import { ObservatoryShell } from './ObservatoryShell'
import type { SectionBodyRegistry } from './SectionBodyResolver'

afterEach(() => cleanup())

describe('observatory shell components', () => {
  it('renders the complete semantic shell and stable controls', () => {
    const navigate = vi.fn(() => true)
    render(<ObservatoryShell
      activeSectionId="identity"
      progress={deriveProgress('identity')}
      theme={{ theme: 'light', source: 'fallback', explicit: false }}
      findings={[]}
      onNavigate={navigate}
      onRegister={vi.fn()}
      onToggleTheme={vi.fn()}
    />)
    expect(screen.getByRole('navigation', { name: 'Research domains' })).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveAttribute('id', 'scan-field')
    expect(screen.getAllByRole('region')).toHaveLength(10)
    expect(screen.getAllByRole('link').filter((link) => link.getAttribute('href')?.startsWith('#'))).toHaveLength(11)
    expect(screen.getByTestId('locus-link-identity')).toHaveAttribute('aria-current', 'location')
    expect(screen.getByTestId('theme-control-button').closest('header')).toHaveAttribute('data-testid', 'observatory-masthead')
    expect(screen.getByTestId('theme-control-button').closest('nav')).toBeNull()
    fireEvent.click(screen.getByTestId('locus-link-tools'))
    expect(navigate).toHaveBeenCalledWith('tools')
  })

  it('exposes textual progress independent of track geometry', () => {
    render(<ObservatoryShell
      activeSectionId="tools"
      progress={deriveProgress('tools')}
      theme={{ theme: 'dark', source: 'visitor', explicit: true }}
      findings={[]}
      onNavigate={vi.fn(() => true)}
      onRegister={vi.fn()}
      onToggleTheme={vi.fn()}
    />)
    expect(screen.getByRole('status')).toHaveTextContent('Section 8 of 10')
    expect(screen.getByRole('heading', { name: 'Methods and Tools' })).toBeInTheDocument()
  })

  it('marks only registered custom-body sections for the expanded content layout', () => {
    const bodies: SectionBodyRegistry = Object.freeze({
      identity: () => <p>Expanded identity content</p>,
      questions: () => <p>Expanded questions content</p>,
    })
    render(<ObservatoryShell
      activeSectionId="identity"
      progress={deriveProgress('identity')}
      theme={{ theme: 'light', source: 'fallback', explicit: false }}
      findings={[]}
      sectionBodies={bodies}
      onNavigate={() => true}
      onRegister={() => undefined}
      onToggleTheme={() => undefined}
    />)
    expect(screen.getByRole('region', { name: 'Research Identity' })).toHaveAttribute('data-custom-body', 'true')
    expect(screen.getByRole('region', { name: 'Questions in Focus' })).toHaveAttribute('data-custom-body', 'true')
    expect(screen.getByRole('region', { name: 'Computational Projects' })).not.toHaveAttribute('data-custom-body')
  })
})
