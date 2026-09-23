import type { ValidationFinding } from '../model/validation.types'
import { aggregateFindings } from '../model/validation'
import type { InformationalVisualization, VisualizationModel } from './visualization.types'

export const visualizationValueSignature = (model: InformationalVisualization) =>
  model.values.map((value) => JSON.stringify(value)).join('|')

export const validateVisualization = (model: VisualizationModel, summarySignature?: string) => {
  const findings: ValidationFinding[] = []
  if (model.purpose === 'decorative') return aggregateFindings(findings)
  if (!model.title.trim() || !model.description.trim()) findings.push({ code: 'VIS-002', severity: 'error', target: model.id, message: 'Informational visualization lacks a title or description.', resolution: 'Provide both from verified context.' })
  if (model.values.length === 0) findings.push({ code: 'VIS-003', severity: 'error', target: model.id, message: 'Informational visualization has no semantic values.', resolution: 'Supply verified or exactly derived values.' })
  if (model.values.some((value) => !value.category.textMarker.trim())) findings.push({ code: 'VIS-004', severity: 'error', target: model.id, message: 'A category depends on color alone.', resolution: 'Add a persistent text marker.' })
  if (model.values.some((value) => 'basis' in value && !['verified', 'derived-count'].includes(value.basis))) findings.push({ code: 'VIS-006', severity: 'error', target: model.id, message: 'A value has an unsupported measurement basis.', resolution: 'Use verified facts or exact derived counts only.' })
  if (summarySignature !== undefined && summarySignature !== visualizationValueSignature(model)) findings.push({ code: 'VIS-003', severity: 'error', target: model.id, message: 'Visual and summary values differ.', resolution: 'Derive both from the same model.' })
  return aggregateFindings(findings)
}
