import type { SectionId } from '../model/portfolio.types'
import type { ResumeCategory } from './resume.types'

export const resumeSectionByCategory = Object.freeze({
  education: 'academic-trajectory',
  scholarship: 'academic-trajectory',
  'academic-recognition': 'academic-trajectory',
  'research-honor': 'evidence-library',
  'innovation-project': 'data-stories',
  'data-project': 'data-stories',
  'computational-research': 'computational-projects',
  'laboratory-research': 'laboratory-research',
  leadership: 'fieldwork-leadership',
  mentoring: 'fieldwork-leadership',
  fieldwork: 'fieldwork-leadership',
  'academic-competition': 'fieldwork-leadership',
} as const satisfies Readonly<Record<ResumeCategory, SectionId>>)

export const resumeGroupLabelBySection = Object.freeze({
  identity: 'Profile highlights',
  questions: 'Research context',
  'computational-projects': 'Related computational work',
  'laboratory-research': 'Related laboratory work',
  'data-stories': 'Projects and analytics',
  'academic-trajectory': 'Academic highlights',
  'evidence-library': 'Honors and recognition',
  tools: 'Capabilities',
  'fieldwork-leadership': 'Additional activities',
  contact: 'Contact details',
} as const satisfies Readonly<Record<SectionId, string>>)

export const mapResumeCategory = (category: ResumeCategory): SectionId => resumeSectionByCategory[category]
