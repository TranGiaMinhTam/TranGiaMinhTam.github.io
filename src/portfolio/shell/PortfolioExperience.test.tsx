import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { sectionRegistry } from '../model/sectionRegistry'
import { PortfolioExperience } from './PortfolioExperience'

beforeEach(() => {
  window.history.replaceState(null, '', '/')
  window.localStorage.clear()
})

afterEach(() => cleanup())

describe('PortfolioExperience candidate', () => {
  it('renders ten ordered stable domains without rejected controls', () => {
    render(<PortfolioExperience />)
    const regions = screen.getAllByRole('region')
    expect(regions.map((region) => region.id)).toEqual(sectionRegistry.map((section) => section.id))
    expect(screen.queryByText(/layout mode/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /menu/i })).not.toBeInTheDocument()
  })

  it('uses one shared tree while changing color mode', () => {
    render(<PortfolioExperience />)
    const main = screen.getByRole('main')
    fireEvent.click(screen.getByTestId('theme-control-button'))
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(screen.getByRole('main')).toBe(main)
  })

  it('renders an optional native masthead resume download without changing the default shell', () => {
    const action = Object.freeze({
      href: '/assets/Tran-Gia-Minh-Tam-Resume.pdf',
      label: 'Download resume',
      download: 'Tran-Gia-Minh-Tam-Resume.pdf',
    })
    const { rerender } = render(<PortfolioExperience />)
    expect(screen.queryByTestId('resume-download-masthead')).not.toBeInTheDocument()

    rerender(<PortfolioExperience resumeAction={action} />)
    expect(screen.getByTestId('resume-download-masthead')).toHaveAttribute('href', action.href)
    expect(screen.getByTestId('resume-download-masthead')).toHaveAttribute('download', action.download)
  })
})
