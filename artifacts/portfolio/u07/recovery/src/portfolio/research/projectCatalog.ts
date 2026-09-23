import proteinDockingPublication from '../../assets/minh-tam/certificates/protein-docking-research.pdf'
import simLseCertificate from '../../assets/minh-tam/certificates/sim-lse-certificate.pdf'
import wicoPoster from '../../assets/minh-tam/certificates/wico-poster.pdf'
import cashewPolyphenolFigure from '../../assets/minh-tam/projects/cashew-polyphenol.jpg'
import dataAnalyticsFigure from '../../assets/minh-tam/projects/data-analytics.jpg'
import molecularDockingFigure from '../../assets/minh-tam/projects/molecular-docking.jpg'
import { contentId, evidenceId, type ContentId, type EvidenceRecord } from '../model/portfolio.types'
import type { ContributionDisclosure, ResearchDomain, ResearchNoteDestination, ResearchPractice } from './research.types'

export type ProjectAllocation = Readonly<{
  projectId: ContentId
  domain: ResearchDomain
  practice: ResearchPractice
  contribution: ContributionDisclosure
}>

const notSpecified: ContributionDisclosure = Object.freeze({
  kind: 'not-specified',
  label: 'Role not specified in verified source',
})

export const projectAllocations = Object.freeze([
  {
    projectId: contentId('project-molecular-docking-model'),
    domain: 'computational-projects',
    practice: 'computational',
    contribution: notSpecified,
  },
  {
    projectId: contentId('project-cashew-testa-research'),
    domain: 'laboratory-research',
    practice: 'laboratory',
    contribution: notSpecified,
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

export const researchNoteDestinations = Object.freeze([]) as readonly ResearchNoteDestination[]

export const isApprovedResearchNoteDestination = (value: string): value is ResearchNoteDestination =>
  researchNoteDestinations.includes(value as ResearchNoteDestination)

export const figureGeometryByEvidenceId = Object.freeze({
  'evidence-molecular-docking-figure': { width: 1280, height: 960 },
  'evidence-cashew-polyphenol-figure': { width: 1280, height: 960 },
  'evidence-data-analytics-figure': { width: 2568, height: 1926 },
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
  researchDocument('evidence-protein-docking-publication', 'Molecular docking research publication', 'Publication material for the Type II diabetes docking study.', 'publication', 'certificates/protein-docking-research.pdf', proteinDockingPublication),
  researchImage('evidence-molecular-docking-figure', 'Molecular docking project figure', 'Curated visual for the computational biology project.', 'projects/molecular-docking.jpg', molecularDockingFigure),
  researchDocument('evidence-wico-poster', 'WICO research poster', 'Poster supporting the cashew testa polyphenol project.', 'poster', 'certificates/wico-poster.pdf', wicoPoster),
  researchImage('evidence-cashew-polyphenol-figure', 'Cashew polyphenol project figure', 'Curated visual for the laboratory research project.', 'projects/cashew-polyphenol.jpg', cashewPolyphenolFigure),
  researchDocument('evidence-sim-lse-certificate', 'SIM-LSE challenge certificate', 'Participation evidence for the retail analytics project.', 'certificate', 'certificates/sim-lse-certificate.pdf', simLseCertificate),
  researchImage('evidence-data-analytics-figure', 'Data analytics project figure', 'Curated visual for the retail analytics project.', 'projects/data-analytics.jpg', dataAnalyticsFigure),
] as const satisfies readonly EvidenceRecord[])
