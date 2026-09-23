import { contentId } from '../model/portfolio.types'
import type {
  DisciplineCoordinate,
  DisciplineCoordinateId,
  NormalizedPoint,
} from './identity.types'

export const disciplineCoordinates = Object.freeze([
  { id: 'computational-biology', contentId: contentId('discipline-computational-biology'), label: 'Computational biology', textMarker: 'CB', colorToken: 'var(--color-data-neutral)', position: { x: 22, y: 18 }, order: 1 },
  { id: 'molecular-science', contentId: contentId('discipline-molecular-science'), label: 'Molecular science', textMarker: 'MS', colorToken: 'var(--color-data-positive)', position: { x: 76, y: 14 }, order: 2 },
  { id: 'natural-products', contentId: contentId('discipline-natural-products'), label: 'Natural products', textMarker: 'NP', colorToken: 'var(--color-data-caution)', position: { x: 86, y: 50 }, order: 3 },
  { id: 'sustainability', contentId: contentId('discipline-sustainability'), label: 'Sustainability', textMarker: 'SU', colorToken: 'var(--color-data-positive)', position: { x: 70, y: 84 }, order: 4 },
  { id: 'data-science', contentId: contentId('discipline-data-science'), label: 'Data science', textMarker: 'DS', colorToken: 'var(--color-data-neutral)', position: { x: 26, y: 84 }, order: 5 },
  { id: 'visual-analytics', contentId: contentId('discipline-visual-analytics'), label: 'Visual analytics', textMarker: 'VA', colorToken: 'var(--color-data-caution)', position: { x: 10, y: 50 }, order: 6 },
] as const satisfies readonly DisciplineCoordinate[])

export const domainCoordinateIds = Object.freeze({
  'Computational biology / drug screening': Object.freeze(['computational-biology', 'molecular-science']),
  'Natural products / sustainability': Object.freeze(['natural-products', 'sustainability']),
  'Data science / visual analytics': Object.freeze(['data-science', 'visual-analytics']),
} as const satisfies Readonly<Record<string, readonly DisciplineCoordinateId[]>>)

export type ApprovedQuestionDomain = keyof typeof domainCoordinateIds

export const questionPositions = Object.freeze([
  { x: 50, y: 31 },
  { x: 61, y: 57 },
  { x: 38, y: 68 },
] as const satisfies readonly NormalizedPoint[])

export const resolveDomainCoordinates = (domain: string): readonly DisciplineCoordinateId[] | undefined =>
  domainCoordinateIds[domain as ApprovedQuestionDomain]

export const coordinateById = new Map<DisciplineCoordinateId, DisciplineCoordinate>(
  disciplineCoordinates.map((coordinate) => [coordinate.id, coordinate]),
)
