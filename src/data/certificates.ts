import borsworthScholarship from '../assets/generated/minh-tam/document-preview/borsworth-scholarship-first-2-pages.pdf'
import gysBrochure from '../assets/minh-tam/certificates/gys-brochure.pdf'
import proteinDockingResearch from '../assets/minh-tam/source/Science research /2026 Protein Docking/Kỷ yếu hội nghị khoa học kỹ thuật Dược lần thứ 42 năm 2026 (extracted).pdf'
import simLseCertificate from '../assets/minh-tam/certificates/sim-lse-certificate.pdf'
import wicoPoster from '../assets/minh-tam/certificates/wico-poster.pdf'
import worthgateScholarship from '../assets/generated/minh-tam/document-preview/worthgate-scholarship-first-2-pages.pdf'
import type { CertificateEntry } from '../types/portfolio'

export const certificates = [
  {
    title: 'SIM-LSE Data Analytics Challenge Certificate',
    issuer: 'SIM-LSE Data Analytics Challenge',
    kind: 'Competition',
    description: 'Certificate of participation for leading a team in retail data analysis and dashboard development.',
    file: simLseCertificate,
    logoKey: 'tableau',
    logoLabel: 'Tableau data analytics certificate mark',
    logoAccent: '#1f7fe2',
    ariaLabel: 'Open SIM-LSE Data Analytics Challenge certificate',
  },
  {
    title: 'Molecular Docking Research Publication',
    issuer: 'Science Research Project',
    kind: 'Research',
    description: 'Research publication and conference material for a computational molecular-docking study of Type II diabetes targets.',
    file: proteinDockingResearch,
    logoKey: 'python',
    logoLabel: 'Molecular docking research mark',
    logoAccent: '#3776ab',
    ariaLabel: 'Open molecular docking research publication',
  },
  {
    title: 'Global Youth Summit Research Brochure',
    issuer: 'Global Youth Summit',
    kind: 'Competition',
    description: 'Supporting brochure for the finalist cashew testa valorization research project.',
    file: gysBrochure,
    logoKey: 'research',
    logoLabel: 'Global Youth Summit research mark',
    logoAccent: '#3f7d32',
    ariaLabel: 'Open Global Youth Summit research brochure',
  },
  {
    title: 'World Invention Creativity Olympic Poster',
    issuer: 'World Invention Creativity Olympic',
    kind: 'Presentation',
    description: 'Research poster supporting the international presentation of the cashew testa polyphenol project.',
    file: wicoPoster,
    logoKey: 'research',
    logoLabel: 'World Invention Creativity Olympic research mark',
    logoAccent: '#1f7fe2',
    ariaLabel: 'Open World Invention Creativity Olympic poster',
  },
  {
    title: '90% A-Level Tuition Scholarship',
    issuer: 'Worthgate School, UK',
    kind: 'Scholarship',
    description: 'International scholarship award recognizing academic achievement and overall candidacy.',
    file: worthgateScholarship,
    logoKey: 'scholarship',
    logoLabel: 'Worthgate School scholarship mark',
    logoAccent: '#a6d96a',
    ariaLabel: 'Open Worthgate School scholarship offer',
  },
  {
    title: '80% A-Level Tuition Scholarship',
    issuer: 'Borsworth High School, UK',
    kind: 'Scholarship',
    description: 'International scholarship award providing substantial tuition support for A-Level study.',
    file: borsworthScholarship,
    logoKey: 'scholarship',
    logoLabel: 'Borsworth High School scholarship mark',
    logoAccent: '#66d9d0',
    ariaLabel: 'Open Borsworth High School scholarship offer',
  },
] satisfies CertificateEntry[]
