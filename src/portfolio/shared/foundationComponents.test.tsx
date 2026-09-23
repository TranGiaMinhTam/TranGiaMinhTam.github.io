import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { evidenceManifest } from '../model/evidenceManifest'
import { contentId } from '../model/portfolio.types'
import { AccessibleDataSummary } from '../visualization/AccessibleDataSummary'
import type { InformationalVisualization } from '../visualization/visualization.types'
import { EvidenceAction } from './EvidenceAction'
import { ScientificLabel } from './ScientificLabel'
import { SectionRegion } from './SectionRegion'
import { VisuallyHidden } from './VisuallyHidden'

describe('foundation components', () => {
  it('renders a labelled section and safe evidence action', () => {
    render(<SectionRegion id="identity" title="Research identity"><EvidenceAction evidence={evidenceManifest[0]} /></SectionRegion>)
    expect(screen.getByRole('region', { name: 'Research identity' })).toBeInTheDocument()
    const link = screen.getByRole('link', { name: evidenceManifest[0].accessibleText })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('retains visible and hidden scientific labels', () => {
    render(<><ScientificLabel marker="Q">Research question</ScientificLabel><VisuallyHidden>Additional context</VisuallyHidden></>)
    expect(screen.getByText('Research question')).toBeInTheDocument()
    expect(screen.getByText('Additional context')).toBeInTheDocument()
  })

  it('renders the semantic summary from the informational model', () => {
    const model: InformationalVisualization = { purpose: 'informational', id: 'one', title: 'One link', description: 'A verified relationship.', summaryKind: 'table', values: [{ id: 'v', sourceId: contentId('q'), sourceLabel: 'Question', targetId: contentId('p'), targetLabel: 'Project', category: { id: 'c', label: 'Motivates', textMarker: 'leads to', colorToken: '--color-data-positive' } }] }
    render(<AccessibleDataSummary model={model} />)
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(screen.getByText('Question', { selector: 'strong' })).toBeInTheDocument()
    expect(screen.getByText('Project')).toBeInTheDocument()
  })
})
