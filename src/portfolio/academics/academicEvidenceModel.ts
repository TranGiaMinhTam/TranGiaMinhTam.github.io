import type { ContentRecord, EvidenceId, EvidenceRecord, PublishedEvidence, VerifiedPortfolioSource } from '../model/portfolio.types'
import {
  academicEvidenceLinks,
  academicProgramSpecs,
  evidenceEligibility,
  evidenceGroupCatalog,
  imageGeometryById,
  type EvidenceEligibility,
} from './academicEvidenceCatalog'
import type {
  AcademicEvidenceRelationship,
  AcademicEvidenceSelection,
  AcademicFact,
  AcademicRelationshipRow,
  AcademicStratum,
  EvidenceArchiveGroup,
  EvidenceArchiveItem,
  EvidenceCapability,
  EvidenceSpectrumEntry,
  RecognitionMarker,
  U05Finding,
  U05FindingCode,
  U05SelectionResult,
} from './academic.types'

const nonEmpty = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0
const stringList = (value: unknown): readonly string[] | undefined =>
  Array.isArray(value) && value.length > 0 && value.every(nonEmpty) ? value : undefined

const finding = (code: U05FindingCode, severity: U05Finding['severity'], target: string, message: string): U05Finding =>
  Object.freeze({ code, severity, target, message })

const safeEvidence = (record: EvidenceRecord) => {
  const hasScheme = /^[a-z][a-z\d+.-]*:/i.test(record.full.source)
  return record.status === 'published' && nonEmpty(record.full.source) && !hasScheme && !/(?:^|\/)source(?:\/|$)/i.test(record.full.path)
}

const capability = (
  eligibility: EvidenceEligibility,
  record: EvidenceRecord,
  section: 'academic-trajectory' | 'evidence-library',
): EvidenceCapability | undefined => {
  if (!safeEvidence(record)) return undefined
  const evidence = record as PublishedEvidence
  const testPurpose = eligibility.id.replace(/^evidence-/, '')
  if (record.full.mediaKind === 'image') {
    const geometry = imageGeometryById[record.id as keyof typeof imageGeometryById]
    if (!geometry) return undefined
    return Object.freeze({
      kind: 'lazy-image', id: record.id, evidence, purpose: eligibility.purpose,
      testId: `${section}-${testPurpose}-evidence-link`, ...geometry,
    })
  }
  return Object.freeze({
    kind: 'text-document', id: record.id, evidence, purpose: eligibility.purpose,
    testId: `${section}-${testPurpose}-evidence-link`,
  })
}

const sourceSupports = (record: ContentRecord, label: string) => {
  const details = stringList(record.facts.details) ?? []
  return record.facts.specialization === label || details.some((detail) => detail.includes(label))
}

const buildStrata = (
  source: VerifiedPortfolioSource,
  evidenceById: ReadonlyMap<string, EvidenceRecord>,
  findings: U05Finding[],
): readonly AcademicStratum[] => {
  const strata = academicProgramSpecs.flatMap((spec, specIndex): AcademicStratum[] => {
    const matches = source.records.filter((record) => record.status === 'verified' && record.id === spec.id)
    if (matches.length !== 1) {
      findings.push(finding('U05-ACADEMIC-CARDINALITY', 'blocking', spec.id, 'Exactly one verified academic program must resolve.'))
      return []
    }
    const record = matches[0]
    const details = stringList(record.facts.details)
    const specialization = record.facts.specialization
    if (record.kind !== 'academic-item' || !nonEmpty(record.title) || !nonEmpty(record.summary) || !nonEmpty(record.period) || !nonEmpty(specialization) || !details) {
      findings.push(finding('U05-ACADEMIC-FIELD', 'blocking', record.id, 'Program, institution, period, specialization, and details are required.'))
      return []
    }
    const facts: AcademicFact[] = spec.facts.map((factSpec, index) => {
      if (!sourceSupports(record, factSpec.label)) findings.push(finding('U05-ACADEMIC-FACT', 'blocking', `${record.id}:fact:${index + 1}`, 'Approved academic fact is not supported by the verified record.'))
      return Object.freeze({ id: `${record.id}:fact:${index + 1}`, ...factSpec, order: index + 1 })
    })
    if (spec.id === academicProgramSpecs[0].id && spec.status !== 'in-progress') {
      findings.push(finding('U05-ACADEMIC-STATUS', 'blocking', record.id, 'The current AS & A-Level program must be explicitly in progress.'))
    }

    const recognitions: RecognitionMarker[] = specIndex === 0 ? academicEvidenceLinks.scholarships.flatMap((id, index) => {
      const eligibility = evidenceEligibility.find((item) => item.id === id)
      const evidence = evidenceById.get(id)
      const resolved = eligibility && evidence ? capability(eligibility, evidence, 'academic-trajectory') : undefined
      if (!resolved || resolved.kind !== 'text-document') {
        findings.push(finding('U05-EVIDENCE-OPTIONAL-MISSING', 'optional', id, 'Optional scholarship evidence is unavailable.'))
        return []
      }
      return [Object.freeze({ id: `${record.id}:recognition:${index + 1}`, label: resolved.evidence.title, evidence: resolved, order: index + 1 })]
    }) : []

    return [Object.freeze({
      id: record.id,
      program: record.title,
      institution: record.summary,
      period: record.period,
      status: spec.status,
      subjectFocus: specialization,
      facts: Object.freeze(facts),
      recognitions: Object.freeze(recognitions),
      order: specIndex + 1,
    })]
  })
  return Object.freeze(strata)
}

const buildLibrary = (
  evidenceById: ReadonlyMap<string, EvidenceRecord>,
  findings: U05Finding[],
): readonly EvidenceArchiveGroup[] => {
  const items: EvidenceArchiveItem[] = []
  for (const eligibility of evidenceEligibility) {
    const record = evidenceById.get(eligibility.id)
    if (!record) {
      findings.push(finding('U05-EVIDENCE-OPTIONAL-MISSING', 'optional', eligibility.id, 'Optional library evidence is not published.'))
      continue
    }
    const resolved = capability(eligibility, record, 'evidence-library')
    if (!resolved) {
      findings.push(finding('U05-EVIDENCE-INVALID', 'blocking', eligibility.id, 'Evidence is outside the approved same-origin publication boundary or lacks required image geometry.'))
      continue
    }
    items.push(Object.freeze({ id: eligibility.id, groupId: eligibility.groupId, capability: resolved, order: eligibility.order }))
  }
  return Object.freeze(evidenceGroupCatalog.map((group) => {
    const groupItems = Object.freeze(items.filter(({ groupId }) => groupId === group.id).sort((left, right) => left.order - right.order))
    return Object.freeze({ ...group, items: groupItems, count: groupItems.length })
  }))
}

const relationshipsFor = (strata: readonly AcademicStratum[]): readonly AcademicEvidenceRelationship[] => {
  const current = strata.find(({ status }) => status === 'in-progress')
  if (!current) return Object.freeze([])
  const relationships: AcademicEvidenceRelationship[] = []
  current.recognitions.forEach((recognition, index) => relationships.push(Object.freeze({
    id: `${recognition.id}:recognized-by:${index + 1}`, sourceId: recognition.id, targetId: recognition.evidence.id,
    kind: 'recognized-by', sourceLabel: recognition.label, targetLabel: recognition.evidence.evidence.title, order: index + 1,
  })))
  return Object.freeze(relationships)
}

export const validateAcademicRelationships = (
  relationships: readonly AcademicEvidenceRelationship[],
  sourceIds: ReadonlySet<string>,
  targetIds: ReadonlySet<string>,
): readonly U05Finding[] => {
  const findings: U05Finding[] = []
  const ids = new Set<string>()
  for (const relationship of relationships) {
    if (!sourceIds.has(relationship.sourceId) || !targetIds.has(relationship.targetId)) findings.push(finding('U05-RELATIONSHIP-ENDPOINT', 'blocking', relationship.id, 'Academic evidence relationship endpoint cannot be resolved.'))
    if (ids.has(relationship.id)) findings.push(finding('U05-RELATIONSHIP-DUPLICATE', 'blocking', relationship.id, 'Academic evidence relationship identifier is duplicated.'))
    ids.add(relationship.id)
  }
  return Object.freeze(findings)
}

const semanticRows = (relationships: readonly AcademicEvidenceRelationship[]): readonly AcademicRelationshipRow[] =>
  Object.freeze(relationships.map((relationship, index) => Object.freeze({
    id: `${relationship.id}:semantic`, relationshipId: relationship.id,
    relationship: relationship.kind === 'documented-in' ? 'Documented in' : 'Recognized by',
    source: relationship.sourceLabel, target: relationship.targetLabel, order: index + 1,
  })))

const spectrumFor = (groups: readonly EvidenceArchiveGroup[]): readonly EvidenceSpectrumEntry[] =>
  Object.freeze(groups.map(({ id, label, marker, count, order }) => Object.freeze({ id, label, marker, count, order })))

export const assembleAcademicEvidence = (
  source: VerifiedPortfolioSource,
  evidence: readonly EvidenceRecord[],
): U05SelectionResult => {
  const findings: U05Finding[] = []
  const academicIds = source.records.filter(({ kind }) => kind === 'academic-item').map(({ id }) => id)
  if (new Set(academicIds).size !== academicIds.length) findings.push(finding('U05-ACADEMIC-DUPLICATE', 'blocking', 'academic-records', 'Academic content identifier is duplicated.'))
  const evidenceIds = evidence.map(({ id }) => id)
  if (new Set(evidenceIds).size !== evidenceIds.length) findings.push(finding('U05-EVIDENCE-DUPLICATE', 'blocking', 'evidence', 'Evidence identifier is duplicated.'))
  const evidenceById = new Map(evidence.map((record) => [record.id, record]))
  const strata = buildStrata(source, evidenceById, findings)
  const groups = buildLibrary(evidenceById, findings)
  const relationships = relationshipsFor(strata)
  const sourceIds = new Set(strata.flatMap((stratum) => [stratum.id, ...stratum.recognitions.map(({ id }) => id)]))
  const targetIds = new Set(groups.flatMap(({ items }) => items.map(({ id }) => id)))
  findings.push(...validateAcademicRelationships(relationships, sourceIds, targetIds))
  const spectrum = spectrumFor(groups)
  const semanticCounts = spectrumFor(groups)
  const blocking = findings.some(({ severity }) => severity === 'blocking')
  if (blocking || strata.length !== academicProgramSpecs.length) return { ok: false, findings: Object.freeze(findings) }
  const value: AcademicEvidenceSelection = Object.freeze({
    trajectory: Object.freeze({ strata, relationships, semanticRows: semanticRows(relationships) }),
    library: Object.freeze({ groups, spectrum, semanticCounts }),
  })
  return { ok: true, value, findings: Object.freeze(findings) }
}

export const withoutAcademicEvidence = (evidence: readonly EvidenceRecord[], id: EvidenceId | string) =>
  evidence.filter((record) => record.id !== id)
