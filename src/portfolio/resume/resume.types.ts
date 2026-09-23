import type { SafeMediaSource } from '../archive/archive.types'
import type { ContentId, EvidenceId, PublishedEvidence, SectionId } from '../model/portfolio.types'

export type DownloadableResume = Readonly<{
  kind: 'resume-download'
  source: SafeMediaSource & Readonly<{ kind: 'local'; mediaType: 'application/pdf' }>
  filename: 'Tran-Gia-Minh-Tam-Resume.pdf'
  title: 'Resume of Tran Gia Minh Tam'
}>

export type ResumeSourceFact = Readonly<{
  bytes: number
  sha256: string
}>

export type ResumeClaimId = string & { readonly __brand: 'ResumeClaimId' }
export type ResumeCategory =
  | 'education'
  | 'scholarship'
  | 'academic-recognition'
  | 'research-honor'
  | 'innovation-project'
  | 'data-project'
  | 'computational-research'
  | 'laboratory-research'
  | 'leadership'
  | 'mentoring'
  | 'fieldwork'
  | 'academic-competition'

export type PublicResumeClaim = Readonly<{
  id: ResumeClaimId
  category: ResumeCategory
  title: string
  summary: string
  period?: string
  sourcePage: 1 | 2
  order: number
  evidenceIds: readonly EvidenceId[]
  existingRecordId?: ContentId
  publication: 'public'
  reviewState: 'reviewed'
}>

export type ResumeAuthority = 'evidence-backed' | 'resume-sourced'
export type ReconciledResumeClaim = PublicResumeClaim & Readonly<{
  authority: ResumeAuthority
  evidence: readonly PublishedEvidence[]
  presentation: 'primary' | 'reference-only'
  sectionId: SectionId
}>

export type ResumeSectionGroup = Readonly<{
  sectionId: SectionId
  label: string
  claims: readonly ReconciledResumeClaim[]
  allClaimIds: readonly ResumeClaimId[]
}>

export type ResumeContentFindingCode =
  | 'U03-RESUME-DUPLICATE-ID'
  | 'U03-RESUME-INVALID-CLAIM'
  | 'U03-RESUME-UNMAPPED'
  | 'U03-RESUME-EVIDENCE-MISSING'
  | 'U03-RESUME-RECORD-MISSING'
  | 'U03-RESUME-DUPLICATE-PRIMARY'
  | 'U03-RESUME-CATEGORY-MISSING'

export type ResumeContentFinding = Readonly<{
  code: ResumeContentFindingCode
  severity: 'blocking'
  target: string
  message: string
}>

export type ResumeContentSelection = Readonly<{
  claims: readonly ReconciledResumeClaim[]
  sections: Readonly<Record<SectionId, ResumeSectionGroup>>
  download: DownloadableResume
  categoryCount: number
  primaryCount: number
  referenceOnlyCount: number
}>

export type ResumeContentResult =
  | Readonly<{ ok: true; value: ResumeContentSelection; findings: readonly [] }>
  | Readonly<{ ok: false; findings: readonly ResumeContentFinding[] }>

export const resumeClaimId = (value: string) => value as ResumeClaimId
