import { evidenceManifest } from '../model/evidenceManifest'
import { contentId, type ContentId } from '../model/portfolio.types'
import { researchNoteDiscovery } from '../model/researchNoteCatalog'
import type { ContributionDisclosure, ResearchDomain, ResearchNoteDestination, ResearchPractice } from './research.types'

export type ProjectAllocation = Readonly<{
  projectId: ContentId
  domain: ResearchDomain
  practice: ResearchPractice
  contribution: ContributionDisclosure
}>

const researchAssistant: ContributionDisclosure = Object.freeze({
  kind: 'verified-context',
  label: 'Research assistant',
})

export const projectAllocations = Object.freeze([
  {
    projectId: contentId('project-molecular-docking-model'),
    domain: 'computational-projects',
    practice: 'computational',
    contribution: researchAssistant,
  },
  {
    projectId: contentId('project-cashew-testa-research'),
    domain: 'laboratory-research',
    practice: 'laboratory',
    contribution: researchAssistant,
  },
  {
    projectId: contentId('project-sim-lse-data-analytics'),
    domain: 'data-stories',
    practice: 'analytical',
    contribution: Object.freeze({ kind: 'verified-context', label: 'Team-led project' }),
  },
] as const satisfies readonly ProjectAllocation[])

export const projectAllocationById: ReadonlyMap<ContentId, ProjectAllocation> = new Map(
  projectAllocations.map((allocation) => [allocation.projectId, allocation]),
)

export const researchNoteDestinations = Object.freeze(
  researchNoteDiscovery.filter(({ projectId }) => projectId === contentId('project-sim-lse-data-analytics')),
) as readonly ResearchNoteDestination[]

export const isApprovedResearchNoteDestination = (value: string): value is ResearchNoteDestination['href'] =>
  researchNoteDestinations.some(({ href }) => href === value)

export const figureGeometryByEvidenceId = Object.freeze({
  'evidence-docking-research-completion': { width: 2568, height: 1926 },
  'evidence-docking-poster-presentation': { width: 1280, height: 960 },
  'evidence-docking-oral-presentation': { width: 1920, height: 2560 },
  'evidence-docking-conference-poster': { width: 2568, height: 1926 },
  'evidence-docking-workstation': { width: 1536, height: 2048 },
  'evidence-cashew-polyphenol-figure': { width: 1280, height: 960 },
} as const)

const researchEvidenceIds = new Set([
  'evidence-protein-docking-publication',
  'evidence-docking-research-completion',
  'evidence-docking-poster-presentation',
  'evidence-docking-oral-presentation',
  'evidence-docking-conference-poster',
  'evidence-docking-workstation',
  'evidence-wico-poster',
  'evidence-cashew-polyphenol-figure',
  'evidence-sim-lse-certificate',
])

export const researchEvidenceManifest = Object.freeze(
  evidenceManifest.filter(({ id }) => researchEvidenceIds.has(id)),
)
