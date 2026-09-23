import proteinDockingPublication from '../../assets/minh-tam/gallery/2026 Protein Docking/Kỷ yếu hội nghị khoa học kỹ thuật Dược lần thứ 42 năm 2026 (extracted).pdf'
import simLseCertificate from '../../assets/minh-tam/certificates/sim-lse-certificate.pdf'
import wicoPoster from '../../assets/minh-tam/certificates/wico-poster.pdf'
import cashewPolyphenolFigure from '../../assets/minh-tam/projects/cashew-polyphenol.jpg'
import dockingResearchCompletion from '../../assets/minh-tam/gallery/2026 Protein Docking/IMG_4206.JPG'
import dockingPosterPresentation from '../../assets/minh-tam/gallery/2026 Protein Docking/IMG_4213.JPG'
import dockingOralPresentation from '../../assets/minh-tam/gallery/2026 Protein Docking/IMG_4207.JPG'
import dockingConferencePoster from '../../assets/minh-tam/gallery/2026 Protein Docking/IMG_4208.JPG'
import dockingWorkstation from '../../assets/minh-tam/gallery/2026 Protein Docking/7381606024551.jpg'
import { contentId, evidenceId, type ContentId, type EvidenceRecord } from '../model/portfolio.types'
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

const researchDocument = (
  id: string,
  title: string,
  caption: string,
  kind: EvidenceRecord['kind'],
  path: string,
  source: string,
): EvidenceRecord => ({
  id: evidenceId(id),
  status: 'published',
  kind,
  provenance: `Reviewed curated asset: ${path}`,
  title,
  caption,
  accessibleText: `${title}. ${caption}`,
  full: { path, source, mediaKind: 'pdf' },
  loadStrategy: 'on-demand',
})

const researchImage = (
  id: string,
  title: string,
  caption: string,
  path: string,
  source: string,
): EvidenceRecord => ({
  id: evidenceId(id),
  status: 'published',
  kind: 'presentation',
  provenance: `Reviewed curated derivative: ${path}`,
  title,
  caption,
  accessibleText: `${title}. ${caption}`,
  full: { path, source, mediaKind: 'image' },
  loadStrategy: 'lazy',
})

export const researchEvidenceManifest = Object.freeze([
  researchDocument('evidence-protein-docking-publication', '2026 molecular docking conference proceedings', 'Conference publication for the Type II diabetes docking study.', 'publication', 'gallery/2026 Protein Docking/Kỷ yếu hội nghị khoa học kỹ thuật Dược lần thứ 42 năm 2026 (extracted).pdf', proteinDockingPublication),
  researchImage('evidence-docking-research-completion', 'Protein docking research completion', 'The research team at the 2026 project completion presentation.', 'gallery/2026 Protein Docking/IMG_4206.JPG', dockingResearchCompletion),
  researchImage('evidence-docking-poster-presentation', 'Protein docking poster presentation', 'The research team presenting the molecular docking poster in March 2026.', 'gallery/2026 Protein Docking/IMG_4213.JPG', dockingPosterPresentation),
  researchImage('evidence-docking-oral-presentation', 'Protein docking oral presentation', 'Presentation of the Type II diabetes molecular docking project.', 'gallery/2026 Protein Docking/IMG_4207.JPG', dockingOralPresentation),
  researchImage('evidence-docking-conference-poster', 'Protein docking conference poster', 'The research team with the molecular docking poster at the 2026 pharmacy conference.', 'gallery/2026 Protein Docking/IMG_4208.JPG', dockingConferencePoster),
  researchImage('evidence-docking-workstation', 'Protein docking workstation', 'Computational modelling work shown on the laboratory workstation.', 'gallery/2026 Protein Docking/7381606024551.jpg', dockingWorkstation),
  researchDocument('evidence-wico-poster', 'WICO research poster', 'Poster supporting the cashew testa polyphenol project.', 'poster', 'certificates/wico-poster.pdf', wicoPoster),
  researchImage('evidence-cashew-polyphenol-figure', 'Cashew polyphenol project figure', 'Curated visual for the laboratory research project.', 'projects/cashew-polyphenol.jpg', cashewPolyphenolFigure),
  researchDocument('evidence-sim-lse-certificate', 'SIM-LSE challenge certificate', 'Participation evidence for the retail analytics project.', 'certificate', 'certificates/sim-lse-certificate.pdf', simLseCertificate),
] as const satisfies readonly EvidenceRecord[])
