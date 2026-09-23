import type { ResearchSemanticRow } from './research.types'
import { SemanticSummary } from '../shared/SemanticSummary'
import { projectSemanticSummary } from '../shared/semanticSummaryModel'

export function ResearchRelationshipSummary({ domain, rows }: Readonly<{ domain: string; rows: readonly ResearchSemanticRow[] }>) {
  const { model } = projectSemanticSummary({
    id: `${domain}-relationship-summary`,
    title: 'Project methods, tools, time, and supporting evidence',
    source: rows,
    project: (row) => ({
      id: row.relationshipId,
      primary: row.relationship,
      details: [{ label: `Marker ${row.marker}`, value: row.target }],
    }),
  })
  return <SemanticSummary model={model} testId={`${domain}-relationship-summary`} />
}
