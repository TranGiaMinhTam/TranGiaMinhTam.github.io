import type {
  SemanticSummaryFinding,
  SemanticSummaryModel,
  SemanticSummaryProjection,
  SemanticSummaryRow,
} from './semanticSummary.types'

export const projectSemanticSummary = <T>({
  id,
  title,
  description,
  source,
  project,
}: Readonly<{
  id: string
  title: string
  description?: string
  source: readonly T[]
  project: (value: T, index: number) => SemanticSummaryRow
}>): SemanticSummaryProjection => {
  const findings: SemanticSummaryFinding[] = []
  if (id.trim().length === 0) findings.push({ code: 'U02-SEM-ID', target: 'summary' })
  const seen = new Set<string>()
  const rows = source.map((value, index) => {
    const row = project(value, index)
    if (row.id.trim().length === 0) findings.push({ code: 'U02-SEM-ROW-ID', target: String(index) })
    if (seen.has(row.id)) findings.push({ code: 'U02-SEM-ROW-DUPLICATE', target: row.id })
    seen.add(row.id)
    if (row.primary.trim().length === 0 || row.details.some(({ label, value: detail }) => label.trim().length === 0 || detail.trim().length === 0)) {
      findings.push({ code: 'U02-SEM-ROW-EMPTY', target: row.id || String(index) })
    }
    return Object.freeze({ ...row, details: Object.freeze([...row.details]) })
  })
  const model: SemanticSummaryModel = Object.freeze({
    id,
    title,
    ...(description ? { description } : {}),
    rows: Object.freeze(rows),
  })
  return Object.freeze({ model, findings: Object.freeze(findings) })
}
