import { describe, expect, it } from 'vitest'
import { contentId } from '../model/portfolio.types'
import { validateVisualization, visualizationValueSignature } from './validateVisualization'
import type { InformationalVisualization } from './visualization.types'

const model: InformationalVisualization = {
  purpose: 'informational', id: 'research-links', title: 'Research relationships', description: 'Questions connected to projects.', summaryKind: 'list',
  values: [{ id: 'link-1', sourceId: contentId('question-1'), sourceLabel: 'Question', targetId: contentId('project-1'), targetLabel: 'Project', category: { id: 'motivates', label: 'Motivates', textMarker: 'leads to', colorToken: '--color-data-positive' } }],
}

describe('validateVisualization', () => {
  it('accepts equivalent semantic values and decorative models', () => {
    expect(validateVisualization(model, visualizationValueSignature(model)).canProceed).toBe(true)
    expect(validateVisualization({ purpose: 'decorative', id: 'ambient-dots', ariaHidden: true }).canProceed).toBe(true)
  })

  it('rejects missing semantics, color-only meaning, and summary mismatch', () => {
    const invalid = { ...model, title: '', values: [{ ...model.values[0], category: { ...model.values[0].category, textMarker: '' } }] }
    expect(validateVisualization(invalid, 'different').findings.map(({ code }) => code)).toEqual(['VIS-002', 'VIS-003', 'VIS-004'])
  })
})
