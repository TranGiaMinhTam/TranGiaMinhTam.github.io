export type SemanticSummaryDetail = Readonly<{
  label: string
  value: string
}>

export type SemanticSummaryRow = Readonly<{
  id: string
  primary: string
  details: readonly SemanticSummaryDetail[]
  emphasized?: boolean
}>

export type SemanticSummaryModel = Readonly<{
  id: string
  title: string
  description?: string
  rows: readonly SemanticSummaryRow[]
}>

export type SemanticSummaryFinding = Readonly<{
  code: 'U02-SEM-ID' | 'U02-SEM-ROW-ID' | 'U02-SEM-ROW-DUPLICATE' | 'U02-SEM-ROW-EMPTY'
  target: string
}>

export type SemanticSummaryProjection = Readonly<{
  model: SemanticSummaryModel
  findings: readonly SemanticSummaryFinding[]
}>
