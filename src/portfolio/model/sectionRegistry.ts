import type { SectionDefinition, SectionId } from './portfolio.types'

export const sectionRegistry = [
  { id: 'identity', label: 'Research Identity', shortLabel: 'Identity', hash: '#identity', order: 1, componentKey: 'identity-observatory' },
  { id: 'questions', label: 'Questions in Focus', shortLabel: 'Questions', hash: '#questions', order: 2, componentKey: 'question-constellation' },
  { id: 'computational-projects', label: 'Computational Projects', shortLabel: 'Computational', hash: '#computational-projects', order: 3, componentKey: 'computational-workbench' },
  { id: 'laboratory-research', label: 'Laboratory Research', shortLabel: 'Laboratory', hash: '#laboratory-research', order: 4, componentKey: 'laboratory-spectrum' },
  { id: 'data-stories', label: 'Data Stories', shortLabel: 'Data', hash: '#data-stories', order: 5, componentKey: 'data-narratives' },
  { id: 'academic-trajectory', label: 'Academic Trajectory', shortLabel: 'Academic', hash: '#academic-trajectory', order: 6, componentKey: 'academic-coordinates' },
  { id: 'evidence-library', label: 'Evidence Library', shortLabel: 'Evidence', hash: '#evidence-library', order: 7, componentKey: 'evidence-spectrum' },
  { id: 'tools', label: 'Methods and Tools', shortLabel: 'Tools', hash: '#tools', order: 8, componentKey: 'method-inventory' },
  { id: 'fieldwork-leadership', label: 'Fieldwork and Leadership', shortLabel: 'Fieldwork', hash: '#fieldwork-leadership', order: 9, componentKey: 'fieldwork-signals' },
  { id: 'contact', label: 'Contact and Research Notes', shortLabel: 'Contact', hash: '#contact', order: 10, componentKey: 'contact-terminal' },
] as const satisfies readonly SectionDefinition[]

const mutableSectionById = {} as Record<SectionId, SectionDefinition>
for (const section of sectionRegistry) mutableSectionById[section.id] = section
export const sectionById: Readonly<Record<SectionId, SectionDefinition>> = Object.freeze(mutableSectionById)

export const isSectionId = (value: string): value is SectionId => value in sectionById
