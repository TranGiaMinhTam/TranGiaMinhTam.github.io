import educationMark from '../assets/minh-tam/profile_pic.jpg'
import type { EducationEntry } from '../types/portfolio'

export const education = [
  {
    degree: 'AS & A-Level Program',
    institution: 'Vinschool Central Park',
    period: 'Aug 2024 - Present',
    specialization: 'Biology, Chemistry, and Mathematics',
    logo: educationMark,
    description: [
      'Academic standing: GPA 9.0/10 in Grade 10; Grade 11 AS-level: AAA; Grade 12 Semester 1 is in progress.',
      'Current focus: Biology, Chemistry, and Mathematics within the school’s advanced science pathway.',
      'English proficiency: IELTS 7.0 (September 2025).',
    ],
  },
  {
    degree: 'IGCSE',
    institution: 'Vinschool Central Park',
    period: '2022 - 2024',
    specialization: 'Mathematics, Science, and Computer Science',
    logo: educationMark,
    description: [
      'Achieved A* in Mathematics, A* in Science, and A in Computer Science.',
      'Built a strong foundation in quantitative reasoning, scientific inquiry, and computational thinking.',
    ],
  },
] satisfies EducationEntry[]
