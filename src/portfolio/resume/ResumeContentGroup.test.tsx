import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { ResumeAction } from './ResumeAction'
import { resumeContentSelection, resumeDownload } from './resumeContentModel'
import { ResumeContentGroup } from './ResumeContentGroup'

afterEach(() => cleanup())

describe('resume presentation', () => {
  it('renders primary claims without source-authority labels and keeps safe evidence actions', () => {
    expect(resumeContentSelection.ok).toBe(true)
    if (!resumeContentSelection.ok) return
    const group = resumeContentSelection.value.sections['academic-trajectory']
    render(<ResumeContentGroup group={group} />)

    expect(screen.getByTestId('resume-content-academic-trajectory')).toBeInTheDocument()
    expect(screen.queryByText(/Evidence-backed|Resume-sourced/)).not.toBeInTheDocument()
    expect(screen.getAllByTestId('evidence-open-action').length).toBeGreaterThan(0)
  })

  it('renders no wrapper for an empty group and uses native download behavior', () => {
    expect(resumeContentSelection.ok).toBe(true)
    if (!resumeContentSelection.ok) return
    const { container } = render(<>
      <ResumeContentGroup group={resumeContentSelection.value.sections.contact} />
      <ResumeAction download={resumeDownload} testId="resume-download-test" />
    </>)

    expect(container.querySelector('[data-testid="resume-content-contact"]')).not.toBeInTheDocument()
    expect(screen.getByTestId('resume-download-test')).toHaveAttribute('download', 'Tran-Gia-Minh-Tam-Resume.pdf')
    expect(screen.getByTestId('resume-download-test')).toHaveAttribute('href', resumeDownload.source.href)
  })
})
