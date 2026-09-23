import { profile } from '../../data/profile'
import { researchQuestionFacts } from '../../data/researchQuestions'
import {
  contentId,
  evidenceId,
  provenanceId,
  type ContentRecord,
  type EvidenceRecord,
  type VerifiedPortfolioSource,
} from './portfolio.types'

const identityProvenance = {
  id: provenanceId('prov-profile'),
  category: 'approved-data-module',
  locator: 'src/data/profile.ts',
  supportedFactKeys: ['identity', 'contact'],
  reviewState: 'approved',
} as const

const questionProvenance = {
  id: provenanceId('prov-research'),
  category: 'approved-data-module',
  locator: 'src/data/researchQuestions.ts',
  supportedFactKeys: ['researchQuestion', 'domain'],
  reviewState: 'approved',
} as const

const identityRecord: ContentRecord = {
  id: contentId('identity-tran-gia-minh-tam'),
  kind: 'identity',
  title: profile.name,
  summary: profile.summary,
  facts: { role: profile.role, location: profile.location },
  provenanceIds: [identityProvenance.id],
  evidenceIds: [evidenceId('evidence-profile-portrait')],
  status: 'verified',
  order: 1,
}

const questionRecords = researchQuestionFacts.map((question, index): ContentRecord => ({
  id: contentId(`question-${question.id}`),
  kind: 'question',
  title: question.researchQuestion,
  summary: question.researchQuestion,
  facts: { domain: question.domain },
  provenanceIds: [questionProvenance.id],
  evidenceIds: [],
  status: 'verified',
  order: index + 1,
}))

export const verifiedIdentityQuestionsSource: VerifiedPortfolioSource = Object.freeze({
  schemaVersion: 1,
  identityId: identityRecord.id,
  records: Object.freeze([identityRecord, ...questionRecords]),
  relationships: Object.freeze([]),
  provenance: Object.freeze([identityProvenance, questionProvenance]),
})

export const identityQuestionEvidenceManifest = Object.freeze([
  {
    id: evidenceId('evidence-profile-portrait'),
    status: 'published',
    kind: 'presentation',
    provenance: 'Reviewed supplied portrait: profile_pic.jpg',
    title: 'Portrait of Tran Gia Minh Tam',
    caption: 'Profile portrait for research identity.',
    accessibleText: 'Portrait of Tran Gia Minh Tam. Profile portrait for research identity.',
    full: { path: 'profile_pic.jpg', source: profile.profileImage, mediaKind: 'image' },
    loadStrategy: 'lazy',
  },
] as const satisfies readonly EvidenceRecord[])
