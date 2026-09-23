import type { ContentId, EvidenceId, PublishedEvidence, SectionId } from '../model/portfolio.types'

export type AcademicDomain = Extract<SectionId, 'academic-trajectory' | 'evidence-library'>
export type AcademicStatusKind = 'completed' | 'in-progress'
export type AcademicFactKind = 'completed-result' | 'language-qualification' | 'current-study' | 'subject-focus' | 'development'
export type AcademicEvidenceGroupId = 'academic-record' | 'scholarships' | 'research-outputs' | 'project-visuals'

export type AcademicFact = Readonly<{
  id: string
  kind: AcademicFactKind
  label: string
  order: number
}>

export type TextDocumentCapability = Readonly<{
  kind: 'text-document'
  id: EvidenceId
  evidence: PublishedEvidence
  purpose: string
  testId: string
}>

export type LazyImageCapability = Readonly<{
  kind: 'lazy-image'
  id: EvidenceId
  evidence: PublishedEvidence
  purpose: string
  testId: string
  width: number
  height: number
}>

export type EvidenceCapability = TextDocumentCapability | LazyImageCapability

export type RecognitionMarker = Readonly<{
  id: string
  label: string
  evidence: TextDocumentCapability
  order: number
}>

export type AcademicStratum = Readonly<{
  id: ContentId
  program: string
  institution: string
  period: string
  status: AcademicStatusKind
  subjectFocus: string
  facts: readonly AcademicFact[]
  transcript?: TextDocumentCapability
  recognitions: readonly RecognitionMarker[]
  order: number
}>

export type AcademicEvidenceRelationshipKind = 'documented-in' | 'recognized-by'

export type AcademicEvidenceRelationship = Readonly<{
  id: string
  sourceId: string
  targetId: EvidenceId
  kind: AcademicEvidenceRelationshipKind
  sourceLabel: string
  targetLabel: string
  order: number
}>

export type AcademicRelationshipRow = Readonly<{
  id: string
  relationshipId: string
  relationship: string
  source: string
  target: string
  order: number
}>

export type EvidenceArchiveItem = Readonly<{
  id: EvidenceId
  groupId: AcademicEvidenceGroupId
  capability: EvidenceCapability
  order: number
}>

export type EvidenceArchiveGroup = Readonly<{
  id: AcademicEvidenceGroupId
  label: string
  description: string
  marker: string
  items: readonly EvidenceArchiveItem[]
  count: number
  order: number
}>

export type EvidenceSpectrumEntry = Readonly<{
  id: AcademicEvidenceGroupId
  label: string
  marker: string
  count: number
  order: number
}>

export type AcademicTrajectoryViewModel = Readonly<{
  strata: readonly AcademicStratum[]
  relationships: readonly AcademicEvidenceRelationship[]
  semanticRows: readonly AcademicRelationshipRow[]
}>

export type EvidenceLibraryViewModel = Readonly<{
  groups: readonly EvidenceArchiveGroup[]
  spectrum: readonly EvidenceSpectrumEntry[]
  semanticCounts: readonly EvidenceSpectrumEntry[]
}>

export type AcademicEvidenceSelection = Readonly<{
  trajectory: AcademicTrajectoryViewModel
  library: EvidenceLibraryViewModel
}>

export type U05FindingCode =
  | 'U05-ACADEMIC-CARDINALITY'
  | 'U05-ACADEMIC-DUPLICATE'
  | 'U05-ACADEMIC-FIELD'
  | 'U05-ACADEMIC-FACT'
  | 'U05-ACADEMIC-STATUS'
  | 'U05-EVIDENCE-DUPLICATE'
  | 'U05-EVIDENCE-OPTIONAL-MISSING'
  | 'U05-EVIDENCE-INVALID'
  | 'U05-EVIDENCE-GROUP'
  | 'U05-RELATIONSHIP-ENDPOINT'
  | 'U05-RELATIONSHIP-DUPLICATE'

export type U05Finding = Readonly<{
  code: U05FindingCode
  severity: 'blocking' | 'optional'
  target: string
  message: string
}>

export type U05SelectionResult =
  | Readonly<{ ok: true; value: AcademicEvidenceSelection; findings: readonly U05Finding[] }>
  | Readonly<{ ok: false; findings: readonly U05Finding[] }>
