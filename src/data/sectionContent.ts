import type { SectionContent } from '../types/portfolio'

// Students can edit section headings and introductions here without changing components.
export const sectionContent = {
  about: {
    eyebrow: 'ABOUT_PROTOCOL',
    title: 'About Me',
    description:
      'I am a student researcher driven by curiosity in life sciences, quantitative analysis, and sustainable innovation.',
  },
  education: {
    eyebrow: 'EDU_TIMELINE',
    title: 'Education & Academic Path',
    description:
      'My education has centred on biology, chemistry, mathematics, and scientific problem-solving, with a strong interest in research and experimentation.',
  },
  experience: {
    eyebrow: 'LEADERSHIP_LOG',
    title: 'Leadership & Volunteering',
    description:
      'My work beyond the classroom has focused on science communication, mentorship, leadership, and community-driven environmental action.',
  },
  awards: {
    eyebrow: 'ACHIEVEMENT_LOG',
    title: 'Honors & Awards',
    description:
      'I have been recognized for research achievement, academic excellence, and international innovation across scientific competitions and school leadership contexts.',
  },
  projects: {
    eyebrow: 'RESEARCH_LOGS',
    title: 'Research Projects',
    description:
      'My main projects focus on computational biology, bioactive compounds, and data-informed approaches to solving scientific and health-related problems.',
  },
  gallery: {
    eyebrow: 'JOURNEY_FRAMES',
    title: 'Learning Journey',
    description:
      'Every challenge I have faced has strengthened my curiosity, resilience, and commitment to science and service.',
  },
  journal: {
    eyebrow: 'JOURNAL_FEED',
    title: 'Journal',
    description:
      'I enjoy turning knowledge into clear communication and sharing scientific insights in an accessible way.',
  },
  skills: {
    eyebrow: 'SKILL_MATRIX',
    title: 'Skills & Strengths',
    description:
      'My strengths span scientific inquiry, research methodology, communication, and a strong foundation in biology, chemistry, and mathematics.',
  },
  contact: {
    eyebrow: 'CONTACT_INTERFACE',
    title: 'Contact Me',
    description:
      'I am always happy to connect about research, science competitions, learning opportunities, and collaboration.',
  },
} satisfies SectionContent

// Shared visible subsection names follow the established Engineering wording.
export const subsectionContent = {
  journal: {
    videosEyebrow: 'VIDEO_FEED',
    videosTitle: 'Educational Videos',
    writingEyebrow: 'WRITING_LOG',
    writingTitle: 'Writing and Technical Notes',
  },
  skills: {
    certificatesEyebrow: 'CERTIFICATE_PREVIEW',
    certificatesTitle: 'Certificate Gallery',
    certificatesDescription:
      'Click any preview to expand the PDF. Files are configured in the shared certificate data file.',
  },
  contact: {
    channelsTitle: 'CONNECT_CHANNELS',
  },
} as const
