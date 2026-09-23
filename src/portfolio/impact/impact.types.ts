import type { ContentId, PublishedEvidence, SectionId } from '../model/portfolio.types'

export type ImpactDomain = Extract<SectionId, 'tools' | 'fieldwork-leadership'>
export type ToolCategoryId = 'academic' | 'research-data' | 'laboratory' | 'languages-interests'
export type ToolClassification = 'demonstrated' | 'interest'
export type ActivityKind = 'fieldwork' | 'leadership'

export type ContextLinkCapability = Readonly<{
  sectionId: SectionId
  label: string
  hash: `#${string}`
  testId: string
}>

export type ClassifiedTool = Readonly<{
  id: ContentId
  title: string
  categoryId: ToolCategoryId
  classification: ToolClassification
  context?: ContextLinkCapability
  evidence: readonly PublishedEvidence[]
  order: number
}>

export type ToolCategoryGroup = Readonly<{
  id: ToolCategoryId
  label: string
  tools: readonly ClassifiedTool[]
  count: number
  order: number
}>

export type ToolSemanticEntry = Readonly<{
  id: ContentId
  categoryId: ToolCategoryId
  title: string
  classification: ToolClassification
  contextLabel?: string
  order: number
}>

export type ToolSemanticGroup = Readonly<{
  id: ToolCategoryId
  label: string
  count: number
  order: number
  entries: readonly ToolSemanticEntry[]
}>

export type ActivityRecord = Readonly<{
  id: ContentId
  kind: ActivityKind
  title: string
  organization: string
  period: string
  descriptionPoints: readonly string[]
  evidence: readonly PublishedEvidence[]
  order: number
}>

export type ActivityGroup = Readonly<{
  kind: ActivityKind
  label: string
  records: readonly ActivityRecord[]
  count: number
  order: number
}>

export type ActivitySemanticEntry = Readonly<{
  id: ContentId
  kind: ActivityKind
  title: string
  organization: string
  period: string
  order: number
}>

export type ActivitySemanticGroup = Readonly<{
  kind: ActivityKind
  label: string
  count: number
  order: number
  entries: readonly ActivitySemanticEntry[]
}>

export type ToolsViewModel = Readonly<{
  categories: readonly ToolCategoryGroup[]
  semanticGroups: readonly ToolSemanticGroup[]
}>

export type FieldworkLeadershipViewModel = Readonly<{
  groups: readonly ActivityGroup[]
  semanticGroups: readonly ActivitySemanticGroup[]
}>

export type ToolsFieldworkSelection = Readonly<{
  tools: ToolsViewModel
  fieldworkLeadership: FieldworkLeadershipViewModel
}>

export type U06FindingCode =
  | 'U06-TOOL-CARDINALITY'
  | 'U06-TOOL-DUPLICATE'
  | 'U06-TOOL-FIELD'
  | 'U06-TOOL-UNMAPPED'
  | 'U06-TOOL-CONTEXT-UNRESOLVED'
  | 'U06-ACTIVITY-CARDINALITY'
  | 'U06-ACTIVITY-DUPLICATE'
  | 'U06-ACTIVITY-FIELD'
  | 'U06-EVIDENCE-UNRESOLVED'

export type U06Finding = Readonly<{
  code: U06FindingCode
  severity: 'blocking' | 'optional'
  target: string
  message: string
}>

export type U06SelectionResult =
  | Readonly<{ ok: true; value: ToolsFieldworkSelection; findings: readonly U06Finding[] }>
  | Readonly<{ ok: false; findings: readonly U06Finding[] }>
