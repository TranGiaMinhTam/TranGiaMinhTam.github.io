import type { ResearchProject } from '../types/portfolio'

export type ResearchQuestionFact = Pick<ResearchProject, 'id' | 'researchQuestion' | 'domain'>

export const researchQuestionFacts = Object.freeze([
  {
    id: 'molecular-docking-model',
    researchQuestion: 'Can computational docking help compare candidate interactions across therapeutic targets implicated in Type II diabetes?',
    domain: 'Computational biology / drug screening',
  },
  {
    id: 'cashew-testa-research',
    researchQuestion: 'How can an agricultural by-product be transformed into a useful source of bioactive polyphenols?',
    domain: 'Natural products / sustainability',
  },
  {
    id: 'sim-lse-data-analytics',
    researchQuestion: 'How can retail data be translated into clear visual evidence and actionable recommendations?',
    domain: 'Data science / visual analytics',
  },
] as const satisfies readonly ResearchQuestionFact[])
