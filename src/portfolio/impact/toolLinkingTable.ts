import { contentId, type ContentId, type SectionId } from '../model/portfolio.types'
import type { ToolCategoryId, ToolClassification } from './impact.types'

export type ToolCategorySpec = Readonly<{
  id: ToolCategoryId
  label: string
  order: number
}>

export const toolCategoryCatalog = Object.freeze([
  { id: 'academic', label: 'Academic', order: 1 },
  { id: 'research-data', label: 'Research & Data', order: 2 },
  { id: 'laboratory', label: 'Laboratory', order: 3 },
  { id: 'languages-interests', label: 'Languages & Interests', order: 4 },
] as const satisfies readonly ToolCategorySpec[])

export type ToolLinkSpec = Readonly<{
  id: ContentId
  categoryId: ToolCategoryId
  classification: ToolClassification
  linkedSectionId?: SectionId
  linkedLabel?: string
  order: number
}>

/**
 * Closed, source-reviewed classification for the sixteen verified tool records
 * produced by `verifiedPortfolioSource.ts` from `src/data/skills.ts`. This is the
 * sole source of demonstrated/interest truth for U-06; Code Generation may not add,
 * remove, or reassign an entry without a new approved functional design change.
 */
export const toolLinkingTable = Object.freeze([
  { id: contentId('tool-1-1'), categoryId: 'academic', classification: 'demonstrated', linkedSectionId: 'academic-trajectory', linkedLabel: 'Academic Trajectory - AS & A-Level subject focus', order: 1 },
  { id: contentId('tool-1-2'), categoryId: 'academic', classification: 'demonstrated', linkedSectionId: 'academic-trajectory', linkedLabel: 'Academic Trajectory - AS & A-Level subject focus', order: 2 },
  { id: contentId('tool-1-3'), categoryId: 'academic', classification: 'demonstrated', linkedSectionId: 'academic-trajectory', linkedLabel: 'Academic Trajectory - AS & A-Level and IGCSE subject focus', order: 3 },
  { id: contentId('tool-1-4'), categoryId: 'academic', classification: 'demonstrated', linkedSectionId: 'academic-trajectory', linkedLabel: 'Academic Trajectory - verified IELTS language qualification', order: 4 },
  { id: contentId('tool-2-1'), categoryId: 'research-data', classification: 'demonstrated', linkedSectionId: 'computational-projects', linkedLabel: 'Computational Projects - Type II diabetes docking project', order: 1 },
  { id: contentId('tool-2-2'), categoryId: 'research-data', classification: 'demonstrated', linkedSectionId: 'computational-projects', linkedLabel: 'Computational Projects - Type II diabetes docking project', order: 2 },
  { id: contentId('tool-2-3'), categoryId: 'research-data', classification: 'demonstrated', linkedSectionId: 'data-stories', linkedLabel: 'Data Stories - SIM-LSE analytical signal sheet', order: 3 },
  { id: contentId('tool-2-4'), categoryId: 'research-data', classification: 'demonstrated', linkedSectionId: 'data-stories', linkedLabel: 'Data Stories - SIM-LSE analytical signal sheet', order: 4 },
  { id: contentId('tool-3-1'), categoryId: 'laboratory', classification: 'demonstrated', linkedSectionId: 'laboratory-research', linkedLabel: 'Laboratory Research - cashew-testa extraction station', order: 1 },
  { id: contentId('tool-3-2'), categoryId: 'laboratory', classification: 'demonstrated', linkedSectionId: 'laboratory-research', linkedLabel: 'Laboratory Research - cashew-testa assay station', order: 2 },
  { id: contentId('tool-3-3'), categoryId: 'laboratory', classification: 'demonstrated', linkedSectionId: 'laboratory-research', linkedLabel: 'Laboratory Research - cashew-testa assay station', order: 3 },
  { id: contentId('tool-3-4'), categoryId: 'laboratory', classification: 'demonstrated', linkedSectionId: 'laboratory-research', linkedLabel: 'Laboratory Research - cashew-testa assay station', order: 4 },
  { id: contentId('tool-4-1'), categoryId: 'languages-interests', classification: 'interest', order: 1 },
  { id: contentId('tool-4-2'), categoryId: 'languages-interests', classification: 'demonstrated', linkedSectionId: 'academic-trajectory', linkedLabel: 'Academic Trajectory - verified IELTS language qualification', order: 2 },
  { id: contentId('tool-4-3'), categoryId: 'languages-interests', classification: 'interest', order: 3 },
  { id: contentId('tool-4-4'), categoryId: 'languages-interests', classification: 'interest', order: 4 },
] as const satisfies readonly ToolLinkSpec[])

export const toolLinkById: ReadonlyMap<ContentId, ToolLinkSpec> = new Map(
  toolLinkingTable.map((entry) => [entry.id, entry]),
)
