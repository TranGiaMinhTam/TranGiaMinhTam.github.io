import type { AcademicRelationshipRow } from './academic.types'
import { SemanticSummary } from '../shared/SemanticSummary'
import { projectSemanticSummary } from '../shared/semanticSummaryModel'

export function AcademicRelationshipSummary({ rows }: Readonly<{ rows: readonly AcademicRelationshipRow[] }>) {
  if (rows.length === 0) return null
  const { model } = projectSemanticSummary({
    id: 'academic-relationship-summary',
    title: 'Academic and evidence relationships',
    source: rows,
    project: (row) => ({ id: row.relationshipId, primary: row.source, details: [
      { label: 'Relationship', value: row.relationship },
      { label: 'Evidence', value: row.target },
    ] }),
  })
  return <SemanticSummary model={model} testId="academic-relationship-summary" />
}
