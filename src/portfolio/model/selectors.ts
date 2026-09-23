import type { ContentKind, DomainViewModel, EvidenceRecord, SectionId, VerifiedPortfolioSource } from './portfolio.types'

const kindToSection: Readonly<Record<ContentKind, SectionId>> = {
  identity: 'identity', question: 'questions', 'computational-project': 'computational-projects',
  'laboratory-project': 'laboratory-research', 'data-story': 'data-stories', 'academic-item': 'academic-trajectory',
  tool: 'tools', fieldwork: 'fieldwork-leadership', leadership: 'fieldwork-leadership', contact: 'contact',
}

export const selectSectionRecords = (source: VerifiedPortfolioSource, sectionId: SectionId) =>
  Object.freeze(source.records.filter((record) => record.status === 'verified' && kindToSection[record.kind] === sectionId).sort((a, b) => a.order - b.order || a.id.localeCompare(b.id)))

export const selectDomainViewModels = (
  source: VerifiedPortfolioSource,
  evidence: readonly EvidenceRecord[],
  sectionId: SectionId,
): readonly DomainViewModel[] => {
  const evidenceById = new Map(evidence.filter((item) => item.status === 'published').map((item) => [item.id, item]))
  return Object.freeze(selectSectionRecords(source, sectionId).map((record) => ({
    id: record.id,
    sectionId,
    title: record.title,
    summary: record.summary,
    order: record.order,
    evidence: Object.freeze(record.evidenceIds.flatMap((id) => {
      const resolved = evidenceById.get(id)
      return resolved ? [resolved] : []
    })),
  })))
}

export const resolveOptionalEvidence = (evidence: readonly EvidenceRecord[], id?: string) =>
  id ? evidence.find((item) => item.id === id && item.status === 'published') : undefined
