import profileImage from '../assets/minh-tam/profile_pic.jpg'
import resumeDocument from '../assets/documents/Tran-Gia-Minh-Tam-Resume.pdf'
import type { HeroSection, Profile } from '../types/portfolio'

export const profile = {
  name: 'TRAN GIA MINH TAM',
  slug: 'tran-gia-minh-tam',
  role: 'Student Researcher in Biology, Chemistry & Mathematics',
  location: 'Ho Chi Minh City, Vietnam',
  email: 'minhtamtrangia@gmail.com',
  profileImage,
  resume: {
    label: 'Download Resume',
    href: resumeDocument,
    fileName: 'Tran-Gia-Minh-Tam-Resume.pdf',
    ariaLabel: 'Download Tran Gia Minh Tam resume PDF',
  },
  summary:
    'I am a high school student pursuing AS & A-level studies in Biology, Chemistry, and Mathematics while exploring molecular science, data-driven research, public health innovation, and sustainability.',
  socialLinks: [
    {
      label: 'Email',
      href: 'mailto:minhtamtrangia@gmail.com',
      ariaLabel: 'Email Tran Gia Minh Tam',
    },
  ],
} satisfies Profile

export const hero = {
  eyebrow: '<researcher id="tran-gia-minh-tam" />',
  statusBadges: ['SCIENCE | RESEARCH | LEADERSHIP'],
  headline: 'Exploring molecular science, data-driven research, and sustainable innovation.',
  highlightedPhrase: 'molecular science',
  intro: profile.summary,
  stats: [
    { value: '9.0/10', label: 'Grade 10 GPA' },
    { value: 'IELTS 7.0', label: 'English score' },
    { value: 'Gold + Silver', label: 'International awards' },
  ],
  primaryAction: {
    label: 'View Awards',
    sectionId: 'awards',
    ariaLabel: 'Scroll to awards and achievements',
  },
  secondaryAction: {
    label: 'Contact',
    sectionId: 'contact',
    ariaLabel: 'Scroll to contact section',
  },
  stackHighlights: ['Biology', 'Chemistry', 'Mathematics', 'Molecular Docking', 'Research', 'Data Analysis'],
} satisfies HeroSection
