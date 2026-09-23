import borsworthScholarship from '../../assets/generated/minh-tam/document-preview/borsworth-scholarship-first-2-pages.pdf'
import gysBrochure from '../../assets/minh-tam/certificates/gys-brochure.pdf'
import proteinDockingPublication from '../../assets/minh-tam/gallery/2026 Protein Docking/Kỷ yếu hội nghị khoa học kỹ thuật Dược lần thứ 42 năm 2026 (extracted).pdf'
import simLseCertificate from '../../assets/minh-tam/certificates/sim-lse-certificate.pdf'
import wicoPoster from '../../assets/minh-tam/certificates/wico-poster.pdf'
import worthgateScholarship from '../../assets/generated/minh-tam/document-preview/worthgate-scholarship-first-2-pages.pdf'
import cashewPolyphenolFigure from '../../assets/minh-tam/projects/cashew-polyphenol.jpg'
import dataAnalyticsFigure from '../../assets/minh-tam/projects/data-analytics.jpg'
import dockingResearchCompletion from '../../assets/minh-tam/gallery/2026 Protein Docking/IMG_4206.JPG'
import dockingPosterPresentation from '../../assets/minh-tam/gallery/2026 Protein Docking/IMG_4213.JPG'
import dockingOralPresentation from '../../assets/minh-tam/gallery/2026 Protein Docking/IMG_4207.JPG'
import dockingConferencePoster from '../../assets/minh-tam/gallery/2026 Protein Docking/IMG_4208.JPG'
import dockingWorkstation from '../../assets/minh-tam/gallery/2026 Protein Docking/7381606024551.jpg'
import { evidenceId, type EvidenceRecord, type PublishedEvidence } from './portfolio.types'
import { identityQuestionEvidenceManifest } from './verifiedIdentityQuestionsSource'

const document = (
  id: string,
  title: string,
  caption: string,
  kind: EvidenceRecord['kind'],
  path: string,
  source: string,
): EvidenceRecord => ({
  id: evidenceId(id), status: 'published', kind, provenance: `Reviewed curated asset: ${path}`, title, caption,
  accessibleText: `${title}. ${caption}`, full: { path, source, mediaKind: 'pdf' }, loadStrategy: 'on-demand',
})

const image = (id: string, title: string, caption: string, path: string, source: string): EvidenceRecord => ({
  id: evidenceId(id), status: 'published', kind: 'presentation', provenance: `Reviewed curated derivative: ${path}`, title, caption,
  accessibleText: `${title}. ${caption}`, full: { path, source, mediaKind: 'image' }, loadStrategy: 'lazy',
})

export const evidenceManifest = Object.freeze([
  identityQuestionEvidenceManifest[0],
  document('evidence-borsworth-scholarship', 'Bosworth scholarship offer', 'Two-page scholarship offer preview.', 'scholarship', 'generated/minh-tam/document-preview/borsworth-scholarship-first-2-pages.pdf', borsworthScholarship),
  document('evidence-gys-brochure', 'Global Youth Summit brochure', 'Supporting brochure for the cashew testa project.', 'publication', 'certificates/gys-brochure.pdf', gysBrochure),
  document('evidence-protein-docking-publication', '2026 molecular docking conference proceedings', 'Conference publication for the Type II diabetes docking study.', 'publication', 'gallery/2026 Protein Docking/Kỷ yếu hội nghị khoa học kỹ thuật Dược lần thứ 42 năm 2026 (extracted).pdf', proteinDockingPublication),
  document('evidence-sim-lse-certificate', 'SIM-LSE challenge certificate', 'Participation evidence for the retail analytics project.', 'certificate', 'certificates/sim-lse-certificate.pdf', simLseCertificate),
  document('evidence-wico-poster', 'WICO research poster', 'Poster supporting the cashew testa polyphenol project.', 'poster', 'certificates/wico-poster.pdf', wicoPoster),
  document('evidence-worthgate-scholarship', 'Worthgate scholarship offer', 'Two-page scholarship offer preview.', 'scholarship', 'generated/minh-tam/document-preview/worthgate-scholarship-first-2-pages.pdf', worthgateScholarship),
  image('evidence-docking-research-completion', 'Protein docking research completion', 'The research team at the 2026 project completion presentation.', 'gallery/2026 Protein Docking/IMG_4206.JPG', dockingResearchCompletion),
  image('evidence-docking-poster-presentation', 'Protein docking poster presentation', 'The research team presenting the molecular docking poster in March 2026.', 'gallery/2026 Protein Docking/IMG_4213.JPG', dockingPosterPresentation),
  image('evidence-docking-oral-presentation', 'Protein docking oral presentation', 'Presentation of the Type II diabetes molecular docking project.', 'gallery/2026 Protein Docking/IMG_4207.JPG', dockingOralPresentation),
  image('evidence-docking-conference-poster', 'Protein docking conference poster', 'The research team with the molecular docking poster at the 2026 pharmacy conference.', 'gallery/2026 Protein Docking/IMG_4208.JPG', dockingConferencePoster),
  image('evidence-docking-workstation', 'Protein docking workstation', 'Computational modelling work shown on the laboratory workstation.', 'gallery/2026 Protein Docking/7381606024551.jpg', dockingWorkstation),
  image('evidence-cashew-polyphenol-figure', 'Cashew polyphenol project figure', 'Curated visual for the laboratory research project.', 'projects/cashew-polyphenol.jpg', cashewPolyphenolFigure),
  image('evidence-future-innovator-first-place', '1st Place — Future Innovator Camp', 'First-place recognition for the Cool Ride innovation project.', 'projects/data-analytics.jpg', dataAnalyticsFigure),
] as const satisfies readonly EvidenceRecord[])

const publishedById = new Map(evidenceManifest.map((record) => [record.id, record]))

export const resolvePublishedEvidence = (id: string): PublishedEvidence | undefined => publishedById.get(evidenceId(id))
