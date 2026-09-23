import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import App from './App'
import { sectionRegistry } from './portfolio/model/sectionRegistry'

const renderPortfolio = () => render(<App />)

beforeEach(() => {
  window.localStorage.clear()
  window.history.pushState(null, '', '/')
})

afterEach(() => cleanup())

describe('active scientific observatory portfolio', () => {
  it('renders the complete ordered shell', () => {
    renderPortfolio()

    expect(screen.getByTestId('portfolio-observatory')).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveAttribute('id', 'scan-field')
    expect(screen.getAllByRole('region').map((region) => region.id).filter(Boolean)).toEqual(
      sectionRegistry.map((section) => section.id),
    )
    expect(screen.getAllByTestId(/^locus-link-/)).toHaveLength(10)
  })

  it('does not expose the rejected layout architecture', () => {
    renderPortfolio()

    expect(screen.queryByTestId('business-layout-toggle')).not.toBeInTheDocument()
    expect(screen.queryByTestId('business-menu-toggle')).not.toBeInTheDocument()
    expect(screen.queryByText(/portfolio style/i)).not.toBeInTheDocument()
  })

  it('activates the reviewed resume groups and one shared native download', () => {
    const { container } = renderPortfolio()
    const downloads = [
      screen.getByTestId('resume-download-masthead'),
      screen.getByTestId('resume-download-identity'),
    ]

    expect(screen.getAllByTestId(/^resume-content-/)).toHaveLength(4)
    expect(container.querySelectorAll('[data-resume-claim]')).toHaveLength(13)
    expect(container.querySelectorAll('[data-authority]')).toHaveLength(0)
    expect(downloads.every((link) => link.hasAttribute('download'))).toBe(true)
    expect(downloads[0]).toHaveAttribute('href', downloads[1].getAttribute('href'))
  })

  it('navigates directly and exposes text-equivalent progress', () => {
    renderPortfolio()

    fireEvent.click(screen.getByTestId('locus-link-tools'))
    expect(screen.getByTestId('locus-link-tools')).toHaveAttribute('aria-current', 'location')
    expect(screen.getByTestId('section-progress-status')).toHaveTextContent('Section 8 of 10')
    expect(window.location.hash).toBe('#tools')
  })

  it('restores a valid direct section hash', () => {
    window.history.pushState(null, '', '#data-stories')
    renderPortfolio()

    expect(screen.getByTestId('locus-link-data-stories')).toHaveAttribute('aria-current', 'location')
    expect(screen.getByTestId('section-progress-status')).toHaveTextContent('Section 5 of 10')
  })

  it('changes theme without replacing the content tree', () => {
    renderPortfolio()
    const main = screen.getByRole('main')
    fireEvent.click(screen.getByTestId('theme-control-button'))
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(screen.getByRole('main')).toBe(main)
  })
})
