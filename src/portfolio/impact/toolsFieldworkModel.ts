import { sectionById } from '../model/sectionRegistry'
import { resolvePublishedEvidence } from '../model/evidenceManifest'
import type { ContentId, ContentRecord, SectionId, VerifiedPortfolioSource } from '../model/portfolio.types'
import { toolCategoryCatalog, toolLinkById, type ToolCategorySpec, type ToolLinkSpec } from './toolLinkingTable'
import type {
  ActivityGroup,
  ActivityKind,
  ActivityRecord,
  ActivitySemanticEntry,
  ActivitySemanticGroup,
  ClassifiedTool,
  ContextLinkCapability,
  ToolCategoryGroup,
  ToolSemanticEntry,
  ToolSemanticGroup,
  ToolsFieldworkSelection,
  U06Finding,
  U06FindingCode,
  U06SelectionResult,
} from './impact.types'

const nonEmpty = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0
const stringList = (value: unknown): readonly string[] | undefined =>
  Array.isArray(value) && value.length > 0 && value.every(nonEmpty) ? value : undefined

const finding = (code: U06FindingCode, severity: U06Finding['severity'], target: string, message: string): U06Finding =>
  Object.freeze({ code, severity, target, message })

const activityKindLabel: Readonly<Record<ActivityKind, string>> = Object.freeze({
  fieldwork: 'Fieldwork',
  leadership: 'Leadership',
})
const activityKindOrder: Readonly<Record<ActivityKind, number>> = Object.freeze({ fieldwork: 1, leadership: 2 })

const contextCapabilityFor = (
  linkedSectionId: SectionId | undefined,
  linkedLabel: string | undefined,
  findings: U06Finding[],
  toolId: string,
): ContextLinkCapability | undefined => {
  if (!linkedSectionId) return undefined
  const section = sectionById[linkedSectionId]
  if (!section) {
    findings.push(finding('U06-TOOL-CONTEXT-UNRESOLVED', 'optional', toolId, 'Linked context section no longer resolves.'))
    return undefined
  }
  return Object.freeze({
    sectionId: section.id,
    label: linkedLabel ?? section.label,
    hash: section.hash,
    testId: `tools-${toolId}-context-link`,
  })
}

const reservedEvidenceFor = (record: ContentRecord, findings: U06Finding[]) => Object.freeze(
  record.evidenceIds.flatMap((id) => {
    const evidence = resolvePublishedEvidence(id)
    if (evidence) return [evidence]
    findings.push(finding('U06-EVIDENCE-UNRESOLVED', 'optional', record.id, `Evidence ${id} is not published.`))
    return []
  }),
)

export const buildToolCategories = (
  source: VerifiedPortfolioSource,
  findings: U06Finding[],
  linkById: ReadonlyMap<ContentId, ToolLinkSpec> = toolLinkById,
  categoryCatalog: readonly ToolCategorySpec[] = toolCategoryCatalog,
): { categories: readonly ToolCategoryGroup[]; semanticGroups: readonly ToolSemanticGroup[] } => {
  const toolRecords = source.records.filter((record): record is ContentRecord => record.status === 'verified' && record.kind === 'tool')
  const ids = toolRecords.map(({ id }) => id)
  if (new Set(ids).size !== ids.length) findings.push(finding('U06-TOOL-DUPLICATE', 'blocking', 'tool-records', 'Tool content identifier is duplicated.'))

  const classified: ClassifiedTool[] = []
  for (const record of toolRecords) {
    if (!nonEmpty(record.title) || !nonEmpty(record.facts.category)) {
      findings.push(finding('U06-TOOL-FIELD', 'blocking', record.id, 'Tool title and category are required.'))
      continue
    }
    const link = linkById.get(record.id)
    if (!link) {
      findings.push(finding('U06-TOOL-UNMAPPED', 'blocking', record.id, 'Tool is absent from the closed Tool Linking Table.'))
      continue
    }
    const context = link.classification === 'demonstrated'
      ? contextCapabilityFor(link.linkedSectionId, link.linkedLabel, findings, record.id)
      : undefined
    classified.push(Object.freeze({
      id: record.id,
      title: record.title,
      categoryId: link.categoryId,
      classification: link.classification,
      ...(context ? { context } : {}),
      evidence: reservedEvidenceFor(record, findings),
      order: link.order,
    }))
  }

  const categories: ToolCategoryGroup[] = categoryCatalog.map((category: ToolCategorySpec) => {
    const tools = Object.freeze(
      classified.filter((tool) => tool.categoryId === category.id).sort((left, right) => {
        const classificationOrder = Number(left.classification === 'interest') - Number(right.classification === 'interest')
        return classificationOrder || left.order - right.order
      }),
    )
    return Object.freeze({ id: category.id, label: category.label, tools, count: tools.length, order: category.order })
  })

  let semanticOrder = 0
  const semanticGroups: ToolSemanticGroup[] = categories.map((category) => Object.freeze({
    id: category.id,
    label: category.label,
    count: category.count,
    order: category.order,
    entries: Object.freeze(category.tools.map((tool): ToolSemanticEntry => Object.freeze({
      id: tool.id,
      categoryId: category.id,
      title: tool.title,
      classification: tool.classification,
      ...(tool.context ? { contextLabel: tool.context.label } : {}),
      order: ++semanticOrder,
    }))),
  }))

  return { categories: Object.freeze(categories), semanticGroups: Object.freeze(semanticGroups) }
}

export const buildActivityGroups = (
  source: VerifiedPortfolioSource,
  findings: U06Finding[],
  expectedCount = 4,
): { groups: readonly ActivityGroup[]; semanticGroups: readonly ActivitySemanticGroup[] } => {
  const activityRecords = source.records.filter(
    (record): record is ContentRecord => record.status === 'verified' && (record.kind === 'fieldwork' || record.kind === 'leadership'),
  )
  const ids = activityRecords.map(({ id }) => id)
  if (new Set(ids).size !== ids.length) findings.push(finding('U06-ACTIVITY-DUPLICATE', 'blocking', 'activity-records', 'Activity content identifier is duplicated.'))
  if (activityRecords.length !== expectedCount) findings.push(finding('U06-ACTIVITY-CARDINALITY', 'blocking', 'activity-records', `Expected ${expectedCount} verified activity records.`))

  const accepted: ActivityRecord[] = []
  activityRecords.forEach((record, index) => {
    const description = stringList(record.facts.details)
    if (!nonEmpty(record.title) || !nonEmpty(record.summary) || !nonEmpty(record.period) || !description) {
      findings.push(finding('U06-ACTIVITY-FIELD', 'blocking', record.id, 'Role, organization, period, and description are required.'))
      return
    }
    accepted.push(Object.freeze({
      id: record.id,
      kind: record.kind as ActivityKind,
      title: record.title,
      organization: record.summary,
      period: record.period,
      descriptionPoints: Object.freeze(description),
      evidence: reservedEvidenceFor(record, findings),
      order: index + 1,
    }))
  })

  const groups: ActivityGroup[] = (['fieldwork', 'leadership'] as const).map((kind) => {
    const records = Object.freeze(accepted.filter((record) => record.kind === kind).sort((left, right) => left.order - right.order))
    return Object.freeze({ kind, label: activityKindLabel[kind], records, count: records.length, order: activityKindOrder[kind] })
  })

  let semanticOrder = 0
  const semanticGroups: ActivitySemanticGroup[] = groups.map((group) => Object.freeze({
    kind: group.kind,
    label: group.label,
    count: group.count,
    order: group.order,
    entries: Object.freeze(group.records.map((record): ActivitySemanticEntry => Object.freeze({
      id: record.id, kind: record.kind, title: record.title, organization: record.organization, period: record.period,
      order: ++semanticOrder,
    }))),
  }))

  return { groups: Object.freeze(groups), semanticGroups: Object.freeze(semanticGroups) }
}

export const assembleToolsFieldwork = (source: VerifiedPortfolioSource): U06SelectionResult => {
  const findings: U06Finding[] = []
  const { categories, semanticGroups: toolSemanticGroups } = buildToolCategories(source, findings)
  const { groups, semanticGroups: activitySemanticGroups } = buildActivityGroups(source, findings)

  const toolCount = categories.reduce((sum, category) => sum + category.count, 0)
  if (toolCount !== toolLinkById.size && findings.every(({ severity }) => severity !== 'blocking')) {
    findings.push(finding('U06-TOOL-CARDINALITY', 'blocking', 'tool-records', 'Every verified tool record in the closed Tool Linking Table must resolve.'))
  }

  const blocking = findings.some(({ severity }) => severity === 'blocking')
  if (blocking) return { ok: false, findings: Object.freeze(findings) }

  const value: ToolsFieldworkSelection = Object.freeze({
    tools: Object.freeze({ categories, semanticGroups: toolSemanticGroups }),
    fieldworkLeadership: Object.freeze({ groups, semanticGroups: activitySemanticGroups }),
  })
  return { ok: true, value, findings: Object.freeze(findings) }
}
