import type { EvidenceRecord, VerifiedPortfolioSource } from '../model/portfolio.types'
import { sectionRegistry } from '../model/sectionRegistry'
import { mapResumeCategory, resumeGroupLabelBySection } from './resumeSectionMap'
import type {
  PublicResumeClaim,
  ReconciledResumeClaim,
  ResumeCategory,
  ResumeContentFinding,
  ResumeContentFindingCode,
  ResumeSectionGroup,
} from './resume.types'

const finding = (code: ResumeContentFindingCode, target: string, message: string): ResumeContentFinding =>
  Object.freeze({ code, severity: 'blocking', target, message })

const nonEmpty = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0
const primaryKey = (claim: PublicResumeClaim) => `${mapResumeCategory(claim.category)}::${claim.title.trim().toLocaleLowerCase()}::${claim.period ?? ''}`

export const reconcileResumeClaims = (
  claims: readonly PublicResumeClaim[],
  source: VerifiedPortfolioSource,
  evidence: readonly EvidenceRecord[],
  expectedCategories: readonly ResumeCategory[],
): Readonly<{ claims: readonly ReconciledResumeClaim[]; sections: Readonly<Record<(typeof sectionRegistry)[number]['id'], ResumeSectionGroup>>; findings: readonly ResumeContentFinding[] }> => {
  const findings: ResumeContentFinding[] = []
  const recordIds = new Set(source.records.filter(({ status }) => status === 'verified').map(({ id }) => id))
  const evidenceById = new Map(evidence.filter(({ status }) => status === 'published').map((item) => [item.id, item]))
  const ids = new Set<string>()
  const primaryKeys = new Set<string>()
  const categories = new Set<ResumeCategory>()
  const reconciled: ReconciledResumeClaim[] = []

  for (const claim of claims) {
    if (ids.has(claim.id)) {
      findings.push(finding('U03-RESUME-DUPLICATE-ID', claim.id, 'Resume claim identifier is duplicated.'))
      continue
    }
    ids.add(claim.id)
    categories.add(claim.category)
    if (!nonEmpty(claim.title) || !nonEmpty(claim.summary) || claim.reviewState !== 'reviewed' || claim.publication !== 'public' || !Number.isInteger(claim.order) || claim.order < 0) {
      findings.push(finding('U03-RESUME-INVALID-CLAIM', claim.id, 'Resume claim is not a complete reviewed public record.'))
      continue
    }

    const sectionId = mapResumeCategory(claim.category)
    if (!sectionId) {
      findings.push(finding('U03-RESUME-UNMAPPED', claim.id, 'Resume category has no approved primary section.'))
      continue
    }

    const resolvedEvidence = claim.evidenceIds.flatMap((id) => {
      const item = evidenceById.get(id)
      if (!item) {
        findings.push(finding('U03-RESUME-EVIDENCE-MISSING', claim.id, 'A reviewed evidence reference does not resolve.'))
        return []
      }
      return [item]
    })
    if (resolvedEvidence.length !== claim.evidenceIds.length) continue

    const presentation = claim.existingRecordId ? 'reference-only' : 'primary'
    if (claim.existingRecordId && !recordIds.has(claim.existingRecordId)) {
      findings.push(finding('U03-RESUME-RECORD-MISSING', claim.id, 'The reconciled verified record does not resolve.'))
      continue
    }
    if (presentation === 'primary') {
      const key = primaryKey(claim)
      if (primaryKeys.has(key)) {
        findings.push(finding('U03-RESUME-DUPLICATE-PRIMARY', claim.id, 'A visible primary resume statement is duplicated.'))
        continue
      }
      primaryKeys.add(key)
    }

    reconciled.push(Object.freeze({
      ...claim,
      authority: resolvedEvidence.length > 0 ? 'evidence-backed' : 'resume-sourced',
      evidence: Object.freeze(resolvedEvidence),
      presentation,
      sectionId,
    }))
  }

  for (const category of expectedCategories) {
    if (!categories.has(category)) findings.push(finding('U03-RESUME-CATEGORY-MISSING', category, 'An approved resume category is missing.'))
  }

  const sections = Object.fromEntries(sectionRegistry.map((section) => {
    const all = reconciled
      .filter(({ sectionId }) => sectionId === section.id)
      .sort((left, right) => left.order - right.order || left.id.localeCompare(right.id))
    return [section.id, Object.freeze({
      sectionId: section.id,
      label: resumeGroupLabelBySection[section.id],
      claims: Object.freeze(all.filter(({ presentation }) => presentation === 'primary')),
      allClaimIds: Object.freeze(all.map(({ id }) => id)),
    })]
  })) as Record<(typeof sectionRegistry)[number]['id'], ResumeSectionGroup>

  return Object.freeze({
    claims: Object.freeze(reconciled.sort((left, right) => left.order - right.order || left.id.localeCompare(right.id))),
    sections: Object.freeze(sections),
    findings: Object.freeze(findings.sort((left, right) => left.code.localeCompare(right.code) || left.target.localeCompare(right.target))),
  })
}
