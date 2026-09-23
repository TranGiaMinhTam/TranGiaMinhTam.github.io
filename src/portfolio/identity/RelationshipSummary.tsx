import type { ContentId } from '../model/portfolio.types'
import { SemanticSummary } from '../shared/SemanticSummary'
import { projectSemanticSummary } from '../shared/semanticSummaryModel'
import type { SemanticRelationshipRow } from './identity.types'

export function RelationshipSummary({
  rows,
  emphasizedId,
}: Readonly<{
  rows: readonly SemanticRelationshipRow[]
  emphasizedId?: ContentId
}>) {
  const { model } = projectSemanticSummary({
    id: 'question-relationship-summary',
    title: 'Research questions and related fields',
    source: rows,
    project: (row, index) => ({
      id: row.questionId,
      primary: `Q${index + 1}: ${row.question}`,
      details: [{ label: 'Fields in exploration', value: row.disciplines.join(' · ') }],
      emphasized: emphasizedId === row.questionId,
    }),
  })
  return <SemanticSummary model={model} testId="question-relationship-summary" />
}
