import type {
  ContentId,
  PublishedEvidence,
} from '../model/portfolio.types'
import type { InformationalVisualization } from '../visualization/visualization.types'

export type ExplorationTopic =
  | 'Molecular science'
  | 'Data-driven research'
  | 'Public health'
  | 'Sustainability'

export type DisciplineCoordinateId =
  | 'computational-biology'
  | 'molecular-science'
  | 'natural-products'
  | 'sustainability'
  | 'data-science'
  | 'visual-analytics'

export type NormalizedPoint = Readonly<{ x: number; y: number }>

export type DisciplineCoordinate = Readonly<{
  id: DisciplineCoordinateId
  contentId: ContentId
  label: string
  textMarker: string
  colorToken: string
  position: NormalizedPoint
  order: number
}>

export type ScientificDirection = Readonly<{
  label: 'Currently exploring'
  statement: string
  topics: readonly ExplorationTopic[]
}>

export type PublishedPortrait = Readonly<{
  evidence: PublishedEvidence
  width: 1920
  height: 2560
  alt: string
}>

export type PendingCurriculumVitae = Readonly<{
  label: 'Download CV'
  status: 'awaiting-file'
  statusText: 'Available soon'
}>

export type ResearchIdentityViewModel = Readonly<{
  id: ContentId
  name: string
  role: string
  location: string
  summary: string
  direction: ScientificDirection
  fieldsInExploration: readonly ExplorationTopic[]
  portrait: PublishedPortrait
  curriculumVitae: PendingCurriculumVitae
  questionsTarget: 'questions'
}>

export type ResearchQuestionViewModel = Readonly<{
  id: ContentId
  text: string
  status: 'Question under exploration'
  sourceDomain: string
  coordinateIds: readonly DisciplineCoordinateId[]
  position: NormalizedPoint
  order: number
}>

export type QuestionDisciplineRelationship = Readonly<{
  id: string
  questionId: ContentId
  coordinateId: DisciplineCoordinateId
  order: number
}>

export type SemanticRelationshipRow = Readonly<{
  questionId: ContentId
  question: string
  disciplines: readonly string[]
  relationshipIds: readonly string[]
}>

export type ResearchQuestionsViewModel = Readonly<{
  questions: readonly ResearchQuestionViewModel[]
  coordinates: readonly DisciplineCoordinate[]
  relationships: readonly QuestionDisciplineRelationship[]
  semanticRows: readonly SemanticRelationshipRow[]
  visualization: InformationalVisualization
}>

export type IdentityQuestionsSelection = Readonly<{
  identity: ResearchIdentityViewModel
  questions: ResearchQuestionsViewModel
}>

export type U03FindingCode =
  | 'U03-IDENTITY-CARDINALITY'
  | 'U03-IDENTITY-FIELD'
  | 'U03-PORTRAIT-MISSING'
  | 'U03-QUESTION-COUNT'
  | 'U03-QUESTION-FIELD'
  | 'U03-DOMAIN-UNKNOWN'
  | 'U03-RELATIONSHIP-DUPLICATE'
  | 'U03-RELATIONSHIP-ENDPOINT'

export type U03Finding = Readonly<{
  code: U03FindingCode
  severity: 'blocking'
  target: string
  message: string
}>

export type U03SelectionResult =
  | Readonly<{ ok: true; value: IdentityQuestionsSelection; findings: readonly [] }>
  | Readonly<{ ok: false; findings: readonly U03Finding[] }>
