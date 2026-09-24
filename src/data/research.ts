import proteinDockingResearch from '../assets/minh-tam/source/Science research /2026 Protein Docking/Kỷ yếu hội nghị khoa học kỹ thuật Dược lần thứ 42 năm 2026 (extracted).pdf'
import simLseCertificate from '../assets/minh-tam/certificates/sim-lse-certificate.pdf'
import wicoPoster from '../assets/minh-tam/certificates/wico-poster.pdf'
import molecularDockingImage from '../assets/minh-tam/source/Science research /2026 Protein Docking/IMG_4208.JPG'
import cashewPolyphenolImage from '../assets/minh-tam/projects/cashew-polyphenol.jpg'
import type { ResearchProject } from '../types/portfolio'
import { researchQuestionFacts } from './researchQuestions'

const [dockingQuestion, cashewQuestion, analyticsQuestion] = researchQuestionFacts

export const researchProjects: ResearchProject[] = [
  {
    ...dockingQuestion,
    abstract:
      'A computational molecular-docking workflow across five therapeutic protein targets, combining structure selection, active-site preparation, docking simulations, and an interactive protein-ligand visualization platform.',
    methods: ['Protein preparation', 'Active-site grid design', 'Virtual screening', 'Interaction visualization'],
    tools: ['AutoDock Vina', 'Molecular visualization', 'Interactive web platform'],
    timeline: 'August 2025 - June 2026',
    evidence: [
      { label: 'Research publication', kind: 'publication', href: proteinDockingResearch },
      { label: 'Research team with conference poster', kind: 'presentation', href: molecularDockingImage },
    ],
  },
  {
    ...cashewQuestion,
    abstract:
      'A nine-month investigation into ultrasound-assisted extraction from cashew testa, antioxidant and antimicrobial testing, and the formulation of a prototype antioxidant skincare cream.',
    methods: ['Ultrasound-assisted extraction', 'DPPH and ABTS assays', 'Disk diffusion', 'MIC testing', 'Formulation prototyping'],
    tools: ['Laboratory assay workflows', 'Research documentation', 'Prototype formulation'],
    timeline: 'January 2025 - September 2025',
    evidence: [
      { label: 'International research poster', kind: 'poster', href: wicoPoster },
      { label: 'Project figure', kind: 'presentation', href: cashewPolyphenolImage },
    ],
  },
  {
    ...analyticsQuestion,
    abstract:
      'A team-led data analytics project using retail data exploration, Tableau dashboard design, and business-facing interpretation to connect patterns with decisions.',
    methods: ['Data exploration', 'Dashboard design', 'Pattern interpretation', 'Recommendation framing'],
    tools: ['Tableau', 'Interactive dashboards', 'Retail analytics'],
    timeline: '2026',
    evidence: [
      { label: 'Participation certificate', kind: 'certificate', href: simLseCertificate },
    ],
  },
]

export const researchProjectById = Object.fromEntries(
  researchProjects.map((project) => [project.id, project]),
) as Record<string, ResearchProject>
