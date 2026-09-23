export type Brand<Value, Name extends string> = Value & { readonly __brand: Name }

export type ContentId = Brand<string, 'ContentId'>
export type EvidenceId = Brand<string, 'EvidenceId'>
export type RelationshipId = Brand<string, 'RelationshipId'>
export type ProvenanceId = Brand<string, 'ProvenanceId'>

export type SectionId =
  | 'identity'
  | 'questions'
  | 'computational-projects'
  | 'laboratory-research'
  | 'data-stories'
  | 'academic-trajectory'
  | 'evidence-library'
  | 'tools'
  | 'fieldwork-leadership'
  | 'contact'

export type SectionDefinition = Readonly<{
  id: SectionId
  label: string
  shortLabel: string
  hash: `#${string}`
  order: number
  componentKey: string
}>

export type ProvenanceReference = Readonly<{
  id: ProvenanceId
  category: 'approved-data-module' | 'reviewed-evidence' | 'owner-confirmation'
  locator: string
  supportedFactKeys: readonly string[]
  reviewState: 'approved' | 'conflicted' | 'excluded'
}>

export type ContentKind =
  | 'identity'
  | 'question'
  | 'computational-project'
  | 'laboratory-project'
  | 'data-story'
  | 'academic-item'
  | 'tool'
  | 'fieldwork'
  | 'leadership'
  | 'contact'

export type ContentRecord = Readonly<{
  id: ContentId
  kind: ContentKind
  title: string
  summary: string
  period?: string
  facts: Readonly<Record<string, string | readonly string[]>>
  provenanceIds: readonly ProvenanceId[]
  evidenceIds: readonly EvidenceId[]
  status: 'verified' | 'conflicted' | 'excluded'
  order: number
}>

export type RelationshipKind =
  | 'motivates'
  | 'uses-method'
  | 'uses-tool'
  | 'occurred-during'
  | 'supported-by'
  | 'documented-in'
  | 'continues-as-note'

export type ContentRelationship = Readonly<{
  id: RelationshipId
  sourceId: ContentId
  targetId: ContentId | EvidenceId
  kind: RelationshipKind
  order?: number
}>

export type VerifiedPortfolioSource = Readonly<{
  schemaVersion: 1
  identityId: ContentId
  records: readonly ContentRecord[]
  relationships: readonly ContentRelationship[]
  provenance: readonly ProvenanceReference[]
}>

export type EvidenceKind =
  | 'publication'
  | 'poster'
  | 'presentation'
  | 'certificate'
  | 'transcript'
  | 'scholarship'
  | 'field-image'

export type MediaKind = 'pdf' | 'image'

export type AssetReference = Readonly<{
  path: string
  source: string
  mediaKind: MediaKind
}>

export type AssetDerivative = AssetReference & Readonly<{
  purpose: 'preview'
  width?: number
  height?: number
}>

export type EvidenceRecord = Readonly<{
  id: EvidenceId
  status: 'published'
  kind: EvidenceKind
  provenance: string
  title: string
  caption: string
  accessibleText: string
  full: AssetReference
  preview?: AssetDerivative
  loadStrategy: 'lazy' | 'on-demand'
}>

export type PublishedEvidence = EvidenceRecord & Readonly<{ status: 'published' }>

export type DomainViewModel = Readonly<{
  id: ContentId
  sectionId: SectionId
  title: string
  summary: string
  order: number
  evidence: readonly PublishedEvidence[]
}>

export type RecoveryFact = Readonly<{
  captureId: string
  sourceRevision: string
  state: 'pending' | 'verified' | 'invalid'
  elapsedSeconds?: number
}>

export type ArtifactMeasurement = Readonly<{
  path: string
  category: 'javascript' | 'css' | 'initial-asset' | 'evidence-asset' | 'deployable-total'
  bytes: number
  gzipBytes?: number
  initial: boolean | 'not-applicable'
}>

export type PerformanceBaseline = Readonly<{
  sourceRevision: string
  lockfileSha256: string
  buildCommand: string
  basePath: string
  capturedAt: string
  measurements: readonly ArtifactMeasurement[]
}>

export const contentId = (value: string) => value as ContentId
export const evidenceId = (value: string) => value as EvidenceId
export const relationshipId = (value: string) => value as RelationshipId
export const provenanceId = (value: string) => value as ProvenanceId
