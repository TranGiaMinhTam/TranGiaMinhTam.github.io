import type { ProjectEntry } from '../types/portfolio'

import molecularDockingImage from '../assets/minh-tam/source/Science research /2026 Protein Docking/IMG_4208.JPG'
import cashewPolyphenolImage from '../assets/minh-tam/projects/cashew-polyphenol.jpg'

export const projects = [
  {
    id: 'molecular-docking-model',
    title: 'Molecular Docking Model for Type II Diabetes Targets',
    description:
      'Built a computational molecular-docking workflow across five therapeutic protein targets, integrating protein selection, active-site optimization, docking simulations, and interactive ligand-visualization support.',
    image: molecularDockingImage,
    imageAlt:
      'The research team with the molecular docking poster at the 2026 pharmacy conference',
    logoKey: 'python',
    logoLabel: 'Python project logo',
    logoAccent: '#3776ab',
    technologies: ['AutoDock Vina', 'Drug Screening', 'Molecular Biology', 'Data Analysis'],
    actions: [
      {
        label: 'Overview',
        href: '#/projects',
        ariaLabel: 'View the molecular docking project overview',
      },
      {
        label: 'Award',
        href: '#/awards',
        ariaLabel: 'View related project awards',
      },
    ],
  },
  {
    id: 'cashew-testa-research',
    title: 'Cashew Testa Bioactive Polyphenol Research',
    description:
      'Investigated the valorization of cashew testa through ultrasound-assisted extraction, antioxidant and antimicrobial testing, and prototype skincare formulation development.',
    image: cashewPolyphenolImage,
    imageAlt:
      'Cashew testa research diagram showing extraction, antioxidant testing, and formulation workflow',
    logoKey: 'pytorch',
    logoLabel: 'Research project logo',
    logoAccent: '#ee4c2c',
    technologies: ['Ultrasound Extraction', 'DPPH', 'ABTS', 'MIC Testing', 'Formulation'],
    actions: [
      {
        label: 'Overview',
        href: '#/projects',
        ariaLabel: 'View the cashew testa research overview',
      },
      {
        label: 'Research',
        href: '#/experience',
        ariaLabel: 'View related research and leadership experience',
      },
    ],
  },
  {
    id: 'sim-lse-data-analytics',
    title: 'SIM-LSE Data Analytics Challenge',
    description:
      'Led retail data analysis and dashboard design using Tableau, translating patterns into actionable recommendations for a business-facing presentation.',
    logoKey: 'tableau',
    logoLabel: 'Tableau project logo',
    logoAccent: '#1f7fe2',
    technologies: ['Tableau', 'Dashboard Design', 'Business Insights', 'Data Analysis'],
    actions: [
      {
        label: 'Overview',
        href: '#/projects',
        ariaLabel: 'View the data analytics challenge overview',
      },
      {
        label: 'Result',
        href: '#/awards',
        ariaLabel: 'View analytics challenge recognition',
      },
    ],
  },
] satisfies ProjectEntry[]
