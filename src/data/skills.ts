import type { SkillCategory } from '../types/portfolio'

export const skills = [
  {
    category: 'Academic',
    skills: [
      { label: 'Biology', logoKey: 'python', logoLabel: 'Biology skill', logoAccent: '#4f8cff' },
      { label: 'Chemistry', logoKey: 'python', logoLabel: 'Chemistry skill', logoAccent: '#2dd4bf' },
      { label: 'Mathematics', logoKey: 'python', logoLabel: 'Mathematics skill', logoAccent: '#f59e0b' },
      { label: 'IELTS 7.0', logoKey: 'python', logoLabel: 'IELTS skill', logoAccent: '#6ee7b7' },
    ],
  },
  {
    category: 'Research & Data',
    skills: [
      { label: 'Molecular Docking', logoKey: 'python', logoLabel: 'Molecular docking skill', logoAccent: '#3776ab' },
      { label: 'AutoDock Vina', logoKey: 'python', logoLabel: 'AutoDock Vina skill', logoAccent: '#1d4ed8' },
      { label: 'Tableau', logoKey: 'tableau', logoLabel: 'Tableau skill', logoAccent: '#1f7fe2' },
      { label: 'Data Analysis', logoKey: 'python', logoLabel: 'Data analysis skill', logoAccent: '#22c55e' },
    ],
  },
  {
    category: 'Laboratory',
    skills: [
      { label: 'Ultrasound-Assisted Extraction', logoKey: 'python', logoLabel: 'Extraction skill', logoAccent: '#14b8a6' },
      { label: 'DPPH Assays', logoKey: 'python', logoLabel: 'DPPH assay skill', logoAccent: '#f97316' },
      { label: 'ABTS Assays', logoKey: 'python', logoLabel: 'ABTS assay skill', logoAccent: '#fb7185' },
      { label: 'Disk Diffusion & MIC', logoKey: 'python', logoLabel: 'Disk diffusion and MIC skill', logoAccent: '#a78bfa' },
    ],
  },
  {
    category: 'Languages & Interests',
    skills: [
      { label: 'Vietnamese', logoKey: 'python', logoLabel: 'Vietnamese language skill', logoAccent: '#22c55e' },
      { label: 'English', logoKey: 'python', logoLabel: 'English language skill', logoAccent: '#60a5fa' },
      { label: 'Sustainability', logoKey: 'python', logoLabel: 'Sustainability interest', logoAccent: '#34d399' },
      { label: 'Debate', logoKey: 'python', logoLabel: 'Debate interest', logoAccent: '#fbbf24' },
    ],
  },
] satisfies SkillCategory[]
