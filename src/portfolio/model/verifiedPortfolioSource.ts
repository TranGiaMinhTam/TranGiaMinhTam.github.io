import { education } from '../../data/education'
import { experience } from '../../data/experience'
import { profile } from '../../data/profile'
import { researchProjects } from '../../data/research'
import { skills } from '../../data/skills'
import {
  contentId,
  evidenceId,
  provenanceId,
  relationshipId,
  type ContentRecord,
  type VerifiedPortfolioSource,
} from './portfolio.types'

const provenance = [
  { id: provenanceId('prov-profile'), category: 'approved-data-module', locator: 'src/data/profile.ts', supportedFactKeys: ['identity', 'contact'], reviewState: 'approved' },
  { id: provenanceId('prov-research'), category: 'approved-data-module', locator: 'src/data/research.ts', supportedFactKeys: ['researchQuestion', 'abstract', 'methods', 'tools', 'timeline'], reviewState: 'approved' },
  { id: provenanceId('prov-education'), category: 'approved-data-module', locator: 'src/data/education.ts', supportedFactKeys: ['degree', 'institution', 'period', 'specialization'], reviewState: 'approved' },
  { id: provenanceId('prov-experience'), category: 'approved-data-module', locator: 'src/data/experience.ts', supportedFactKeys: ['title', 'company', 'period', 'description'], reviewState: 'approved' },
  { id: provenanceId('prov-skills'), category: 'approved-data-module', locator: 'src/data/skills.ts', supportedFactKeys: ['category', 'label'], reviewState: 'approved' },
] as const

const projectKinds = ['computational-project', 'laboratory-project', 'data-story'] as const
const projectEvidence = [
  ['evidence-protein-docking-publication', 'evidence-docking-conference-poster'],
  ['evidence-wico-poster', 'evidence-cashew-polyphenol-figure'],
  ['evidence-sim-lse-certificate'],
] as const

const records: ContentRecord[] = [
  {
    id: contentId('identity-tran-gia-minh-tam'),
    kind: 'identity',
    title: profile.name,
    summary: profile.summary,
    facts: { role: profile.role, location: profile.location },
    provenanceIds: [provenanceId('prov-profile')],
    evidenceIds: [evidenceId('evidence-profile-portrait')],
    status: 'verified',
    order: 1,
  },
  {
    id: contentId('contact-email'),
    kind: 'contact',
    title: 'Email',
    summary: profile.email,
    facts: { email: profile.email },
    provenanceIds: [provenanceId('prov-profile')],
    evidenceIds: [],
    status: 'verified',
    order: 1,
  },
  ...researchProjects.flatMap((project, index): ContentRecord[] => [
    {
      id: contentId(`question-${project.id}`), kind: 'question', title: project.researchQuestion,
      summary: project.abstract, facts: { domain: project.domain }, provenanceIds: [provenanceId('prov-research')],
      evidenceIds: [], status: 'verified', order: index + 1,
    },
    {
      id: contentId(`project-${project.id}`), kind: projectKinds[index] ?? 'computational-project', title: project.researchQuestion,
      summary: project.abstract, period: project.timeline, facts: { domain: project.domain, methods: project.methods, tools: project.tools },
      provenanceIds: [provenanceId('prov-research')], evidenceIds: (projectEvidence[index] ?? []).map(evidenceId), status: 'verified', order: index + 1,
    },
  ]),
  ...education.map((item, index): ContentRecord => ({
    id: contentId(`academic-${index + 1}`), kind: 'academic-item', title: item.degree, summary: item.institution,
    period: item.period, facts: { specialization: item.specialization, details: item.description }, provenanceIds: [provenanceId('prov-education')],
    evidenceIds: [], status: 'verified', order: index + 1,
  })),
  ...skills.flatMap((group, groupIndex) => group.skills.map((skill, index): ContentRecord => ({
    id: contentId(`tool-${groupIndex + 1}-${index + 1}`), kind: 'tool', title: skill.label, summary: group.category,
    facts: { category: group.category }, provenanceIds: [provenanceId('prov-skills')], evidenceIds: [], status: 'verified', order: groupIndex * 10 + index,
  }))),
  ...experience.map((item, index): ContentRecord => ({
    id: contentId(`experience-${index + 1}`), kind: index === 3 ? 'fieldwork' : 'leadership', title: item.title, summary: item.company,
    period: item.period, facts: { details: item.description }, provenanceIds: [provenanceId('prov-experience')], evidenceIds: [], status: 'verified', order: index + 1,
  })),
]

const relationships = researchProjects.flatMap((project, index) => [
  { id: relationshipId(`relationship-question-project-${index + 1}`), sourceId: contentId(`question-${project.id}`), targetId: contentId(`project-${project.id}`), kind: 'motivates' as const, order: index + 1 },
  ...(projectEvidence[index] ?? []).map((target, evidenceIndex) => ({ id: relationshipId(`relationship-project-evidence-${index + 1}-${evidenceIndex + 1}`), sourceId: contentId(`project-${project.id}`), targetId: evidenceId(target), kind: 'supported-by' as const, order: evidenceIndex + 1 })),
])

export const verifiedPortfolioSource: VerifiedPortfolioSource = Object.freeze({
  schemaVersion: 1,
  identityId: contentId('identity-tran-gia-minh-tam'),
  records: Object.freeze(records),
  relationships: Object.freeze(relationships),
  provenance: Object.freeze(provenance),
})

export const excludedLegacySources = Object.freeze(['src/data/blog.ts'] as const)
