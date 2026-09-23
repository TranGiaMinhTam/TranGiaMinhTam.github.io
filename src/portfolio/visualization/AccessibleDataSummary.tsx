import { isRelationshipValue, type InformationalVisualization } from './visualization.types'
import { SemanticSummary } from '../shared/SemanticSummary'
import { projectSemanticSummary } from '../shared/semanticSummaryModel'

export type AccessibleDataSummaryProps = Readonly<{
  model: InformationalVisualization
  className?: string
}>

export function AccessibleDataSummary({ model, className }: AccessibleDataSummaryProps) {
  const { model: summary } = projectSemanticSummary({
    id: `${model.id}-summary`, title: `${model.title}: data summary`, description: model.description, source: model.values,
    project: (value) => ({
      id: value.id,
      primary: isRelationshipValue(value) ? value.sourceLabel : value.label,
      details: [
        { label: isRelationshipValue(value) ? 'Relationship target' : 'Value', value: String(isRelationshipValue(value) ? value.targetLabel : value.value) },
        { label: 'Category', value: `${value.category.label} (${value.category.textMarker})` },
      ],
    }),
  })
  return <SemanticSummary model={summary} className={className} testId="visualization-semantic-summary" />
}
