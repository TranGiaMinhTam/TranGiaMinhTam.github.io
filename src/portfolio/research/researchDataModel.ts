import {
  evidenceId,
  type ContentId,
  type ContentRecord,
  type EvidenceRecord,
  type PublishedEvidence,
  type VerifiedPortfolioSource,
} from '../model/portfolio.types'
import {
  figureGeometryByEvidenceId,
  projectAllocations,
  researchNoteDestinations,
  type ProjectAllocation,
} from './projectCatalog'
import type {
  ComputationalProjectViewModel,
  DataStoryViewModel,
  LaboratoryResearchViewModel,
  ResearchDataSelection,
  ResearchEndpoint,
  ResearchEvidenceCapability,
  ResearchProjectViewModel,
  ResearchRelationship,
  ResearchRelationshipKind,
  ResearchSemanticRow,
  U04Finding,
  U04FindingCode,
  U04SelectionResult,
} from './research.types'

const nonEmpty = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0
const stringList = (value: unknown): readonly string[] | undefined =>
  Array.isArray(value) && value.length > 0 && value.every(nonEmpty) ? value : undefined

const finding = (
  code: U04FindingCode,
  severity: U04Finding['severity'],
  target: string,
  message: string,
): U04Finding => ({ code, severity, target, message })

const markerByKind: Readonly<Record<ResearchRelationshipKind, string>> = Object.freeze({
  'uses-method': 'M',
  'uses-tool': 'T',
  'occurred-during': 'Δ',
  'supported-by': 'E',
})

const relationshipLabel: Readonly<Record<ResearchRelationshipKind, string>> = Object.freeze({
  'uses-method': 'Method',
  'uses-tool': 'Tool or context',
  'occurred-during': 'Time context',
  'supported-by': 'Evidence',
})

const evidencePurpose = (evidence: PublishedEvidence) => {
  if (evidence.full.mediaKind === 'image') return 'Project figure'
  if (evidence.kind === 'poster') return 'Research poster'
  if (evidence.kind === 'certificate') return 'Participation certificate'
  return 'Research publication'
}

const evidenceTestPurpose = (evidence: PublishedEvidence) => {
  if (evidence.full.mediaKind === 'image') return 'figure'
  if (evidence.kind === 'poster') return 'poster'
  if (evidence.kind === 'certificate') return 'certificate'
  return 'publication'
}

const resolveEvidence = (
  record: ContentRecord,
  evidenceById: ReadonlyMap<string, EvidenceRecord>,
  findings: U04Finding[],
  domain: ProjectAllocation['domain'],
): readonly ResearchEvidenceCapability[] => Object.freeze(record.evidenceIds.flatMap((id) => {
  const evidence = evidenceById.get(id)
  if (!evidence) {
    findings.push(finding('U04-EVIDENCE-OPTIONAL-MISSING', 'optional', id, 'Optional project evidence is not published.'))
    return []
  }
  const hasScheme = /^[a-z][a-z\d+.-]*:/i.test(evidence.full.source)
  if (evidence.status !== 'published' || !nonEmpty(evidence.full.source) || hasScheme || /(?:^|\/)source(?:\/|$)/i.test(evidence.full.path)) {
    findings.push(finding('U04-EVIDENCE-INVALID', 'blocking', id, 'Evidence is outside the approved same-origin publication boundary.'))
    return []
  }
  const geometry = figureGeometryByEvidenceId[id as keyof typeof figureGeometryByEvidenceId]
  return [{
    id,
    evidence: evidence as PublishedEvidence,
    purpose: evidencePurpose(evidence as PublishedEvidence),
    testId: `${domain}-${evidenceTestPurpose(evidence as PublishedEvidence)}-${id.replace(/^evidence-/, '')}-evidence-link`,
    ...(geometry ?? {}),
  }]
}))

const endpoints = (projectId: ContentId, kind: 'method' | 'tool', labels: readonly string[]): readonly ResearchEndpoint[] =>
  Object.freeze(labels.map((label, index) => Object.freeze({ id: `${projectId}:${kind}:${index + 1}`, label, order: index + 1 })))

export const validateResearchRelationships = (
  relationships: readonly ResearchRelationship[],
  endpointIds: ReadonlySet<string>,
): readonly U04Finding[] => {
  const findings: U04Finding[] = []
  const relationshipIds = new Set<string>()
  for (const relationship of relationships) {
    if (!endpointIds.has(relationship.targetId)) findings.push(finding('U04-RELATIONSHIP-ENDPOINT', 'blocking', relationship.id, 'Relationship target cannot be resolved.'))
    if (relationshipIds.has(relationship.id)) findings.push(finding('U04-RELATIONSHIP-DUPLICATE', 'blocking', relationship.id, 'Relationship identifier is duplicated.'))
    relationshipIds.add(relationship.id)
  }
  return Object.freeze(findings)
}

const buildRelationships = (
  projectId: ContentId,
  methods: readonly ResearchEndpoint[],
  tools: readonly ResearchEndpoint[],
  time: ResearchEndpoint,
  evidence: readonly ResearchEvidenceCapability[],
  findings: U04Finding[],
) => {
  const relationships: ResearchRelationship[] = []
  const append = (kind: ResearchRelationshipKind, target: ResearchEndpoint | ResearchEvidenceCapability, order: number, label: string) => {
    relationships.push(Object.freeze({
      id: `${projectId}:${kind}:${order}`,
      projectId,
      targetId: target.id,
      targetLabel: label,
      kind,
      order,
      textMarker: markerByKind[kind],
    }))
  }
  methods.forEach((target) => append('uses-method', target, target.order, target.label))
  tools.forEach((target) => append('uses-tool', target, target.order, target.label))
  append('occurred-during', time, 1, time.label)
  evidence.forEach((target, index) => append('supported-by', target, index + 1, target.evidence.title))

  const endpointIds = new Set([...methods, ...tools, time, ...evidence].map(({ id }) => id))
  findings.push(...validateResearchRelationships(relationships, endpointIds))
  return Object.freeze(relationships)
}

export const projectSemanticRows = (relationships: readonly ResearchRelationship[]): readonly ResearchSemanticRow[] =>
  Object.freeze(relationships.map((relationship, index) => Object.freeze({
    id: `${relationship.id}:semantic`,
    relationshipId: relationship.id,
    relationship: relationshipLabel[relationship.kind],
    target: relationship.targetLabel,
    marker: relationship.textMarker,
    order: index + 1,
  })))

const buildProject = (
  source: VerifiedPortfolioSource,
  allocation: ProjectAllocation,
  evidenceById: ReadonlyMap<string, EvidenceRecord>,
  findings: U04Finding[],
): ResearchProjectViewModel | undefined => {
  const matches = source.records.filter((record) => record.status === 'verified' && record.id === allocation.projectId)
  if (matches.length !== 1) {
    findings.push(finding('U04-PROJECT-CARDINALITY', 'blocking', allocation.projectId, 'Exactly one verified project must resolve for this research domain.'))
    return undefined
  }
  const record = matches[0]
  if (record.kind !== allocation.practice.replace('analytical', 'data-story').replace('computational', 'computational-project').replace('laboratory', 'laboratory-project')) {
    findings.push(finding('U04-PROJECT-ALLOCATION', 'blocking', record.id, 'Project kind does not match its closed research-domain allocation.'))
  }
  const methods = stringList(record.facts.methods)
  const tools = stringList(record.facts.tools)
  if (!nonEmpty(record.title) || !nonEmpty(record.summary) || !nonEmpty(record.period) || !methods || !tools) {
    findings.push(finding('U04-PROJECT-FIELD', 'blocking', record.id, 'Project question, context, methods, tools, and time are required.'))
    return undefined
  }
  const methodEndpoints = endpoints(record.id, 'method', methods)
  const toolEndpoints = endpoints(record.id, 'tool', tools)
  const time = Object.freeze({ id: `${record.id}:time`, label: record.period, order: 1 })
  const endpointIds = [...methodEndpoints, ...toolEndpoints, time].map(({ id }) => id)
  if (new Set(endpointIds).size !== endpointIds.length) findings.push(finding('U04-ENDPOINT-DUPLICATE', 'blocking', record.id, 'Project endpoint identifier is duplicated.'))
  const evidence = resolveEvidence(record, evidenceById, findings, allocation.domain)
  const relationships = buildRelationships(record.id, methodEndpoints, toolEndpoints, time, evidence, findings)
  return Object.freeze({
    id: record.id,
    domain: allocation.domain,
    practice: allocation.practice,
    question: record.title,
    context: record.summary,
    contribution: allocation.contribution,
    methods: methodEndpoints,
    tools: toolEndpoints,
    time,
    evidence,
    relationships,
    semanticRows: projectSemanticRows(relationships),
  })
}

export const assembleResearchData = (
  source: VerifiedPortfolioSource,
  evidence: readonly EvidenceRecord[],
): U04SelectionResult => {
  const findings: U04Finding[] = []
  const recordIds = source.records.map(({ id }) => id)
  if (new Set(recordIds).size !== recordIds.length) findings.push(finding('U04-PROJECT-DUPLICATE', 'blocking', 'records', 'Source content identifier is duplicated.'))
  const evidenceById = new Map(evidence.map((record) => [record.id, record]))
  const projects = projectAllocations.map((allocation) => buildProject(source, allocation, evidenceById, findings))
  const blocking = findings.some(({ severity }) => severity === 'blocking')
  const [computational, laboratory, dataStory] = projects
  if (blocking || !computational || !laboratory || !dataStory) return { ok: false, findings: Object.freeze(findings) }

  const value: ResearchDataSelection = Object.freeze({
    computational: computational as ComputationalProjectViewModel,
    laboratory: laboratory as LaboratoryResearchViewModel,
    dataStory: Object.freeze({
      ...dataStory,
      domain: 'data-stories',
      practice: 'analytical',
      destinations: researchNoteDestinations,
    }) as DataStoryViewModel,
  })
  return { ok: true, value, findings: Object.freeze(findings) }
}

export const withoutEvidence = (evidence: readonly EvidenceRecord[], id: string) =>
  evidence.filter((record) => record.id !== evidenceId(id))
