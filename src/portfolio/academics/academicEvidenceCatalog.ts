import { contentId, evidenceId, type ContentId, type EvidenceId } from '../model/portfolio.types'
import type { AcademicEvidenceGroupId, AcademicFactKind, AcademicStatusKind } from './academic.types'

export type AcademicFactSpec = Readonly<{ kind: AcademicFactKind; label: string }>
export type AcademicProgramSpec = Readonly<{
  id: ContentId
  status: AcademicStatusKind
  facts: readonly AcademicFactSpec[]
}>

export const academicProgramSpecs = Object.freeze([
  {
    id: contentId('academic-1'),
    status: 'in-progress',
    facts: Object.freeze([
      { kind: 'completed-result', label: 'GPA 9.0/10 in Grade 10' },
      { kind: 'completed-result', label: 'Grade 11 AS-level: AAA' },
      { kind: 'current-study', label: 'Grade 12 Semester 1 is in progress' },
      { kind: 'language-qualification', label: 'IELTS 7.0 (September 2025)' },
    ]),
  },
  {
    id: contentId('academic-2'),
    status: 'completed',
    facts: Object.freeze([
      { kind: 'completed-result', label: 'A* in Mathematics' },
      { kind: 'completed-result', label: 'A* in Science' },
      { kind: 'completed-result', label: 'A in Computer Science' },
      { kind: 'development', label: 'Built a strong foundation in quantitative reasoning, scientific inquiry, and computational thinking.' },
    ]),
  },
] as const satisfies readonly AcademicProgramSpec[])

export type EvidenceEligibility = Readonly<{
  id: EvidenceId
  groupId: AcademicEvidenceGroupId
  purpose: string
  order: number
}>

export const evidenceGroupCatalog = Object.freeze([
  { id: 'scholarships', label: 'Scholarships', description: 'Published scholarship-offer documentation.', marker: 'SC', order: 1 },
  { id: 'research-outputs', label: 'Research Outputs', description: 'Publications, poster, brochure, and participation evidence.', marker: 'RO', order: 2 },
  { id: 'project-visuals', label: 'Project Visuals', description: 'Project, presentation, and recognition photography.', marker: 'PV', order: 3 },
] as const)

export const evidenceEligibility = Object.freeze([
  { id: evidenceId('evidence-borsworth-scholarship'), groupId: 'scholarships', purpose: 'Borsworth scholarship offer', order: 1 },
  { id: evidenceId('evidence-worthgate-scholarship'), groupId: 'scholarships', purpose: 'Worthgate scholarship offer', order: 2 },
  { id: evidenceId('evidence-gys-brochure'), groupId: 'research-outputs', purpose: 'Global Youth Summit research brochure', order: 1 },
  { id: evidenceId('evidence-protein-docking-publication'), groupId: 'research-outputs', purpose: 'Molecular docking research publication', order: 2 },
  { id: evidenceId('evidence-sim-lse-certificate'), groupId: 'research-outputs', purpose: 'SIM-LSE participation certificate', order: 3 },
  { id: evidenceId('evidence-wico-poster'), groupId: 'research-outputs', purpose: 'WICO research poster', order: 4 },
  { id: evidenceId('evidence-docking-research-completion'), groupId: 'project-visuals', purpose: 'Protein docking research completion', order: 1 },
  { id: evidenceId('evidence-docking-poster-presentation'), groupId: 'project-visuals', purpose: 'Protein docking poster presentation', order: 2 },
  { id: evidenceId('evidence-docking-oral-presentation'), groupId: 'project-visuals', purpose: 'Protein docking oral presentation', order: 3 },
  { id: evidenceId('evidence-docking-conference-poster'), groupId: 'project-visuals', purpose: 'Protein docking conference poster', order: 4 },
  { id: evidenceId('evidence-docking-workstation'), groupId: 'project-visuals', purpose: 'Protein docking workstation', order: 5 },
  { id: evidenceId('evidence-cashew-polyphenol-figure'), groupId: 'project-visuals', purpose: 'Cashew polyphenol project figure', order: 6 },
  { id: evidenceId('evidence-future-innovator-first-place'), groupId: 'project-visuals', purpose: 'Future Innovator Camp first-place recognition', order: 7 },
] as const satisfies readonly EvidenceEligibility[])

export const evidenceEligibilityById: ReadonlyMap<EvidenceId, EvidenceEligibility> = new Map(
  evidenceEligibility.map((item) => [item.id, item]),
)

export const imageGeometryById = Object.freeze({
  'evidence-docking-research-completion': { width: 2568, height: 1926 },
  'evidence-docking-poster-presentation': { width: 1280, height: 960 },
  'evidence-docking-oral-presentation': { width: 1920, height: 2560 },
  'evidence-docking-conference-poster': { width: 2568, height: 1926 },
  'evidence-docking-workstation': { width: 1536, height: 2048 },
  'evidence-cashew-polyphenol-figure': { width: 1280, height: 960 },
  'evidence-future-innovator-first-place': { width: 2568, height: 1926 },
} as const)

export const academicEvidenceLinks = Object.freeze({
  scholarships: Object.freeze([
    evidenceId('evidence-borsworth-scholarship'),
    evidenceId('evidence-worthgate-scholarship'),
  ]),
})
