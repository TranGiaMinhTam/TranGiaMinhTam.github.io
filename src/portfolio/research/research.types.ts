import type { ContentId, PublishedEvidence, SectionId } from '../model/portfolio.types'
import type { ResearchNoteDescriptor } from '../model/researchNoteCatalog'

export type ResearchDomain = Extract<SectionId, 'computational-projects' | 'laboratory-research' | 'data-stories'>
export type ResearchPractice = 'computational' | 'laboratory' | 'analytical'

export type ContributionDisclosure =
  | Readonly<{ kind: 'verified-context'; label: 'Team-led project' | 'Research assistant' }>

export type ResearchEndpoint = Readonly<{
  id: string
  label: string
  order: number
}>

export type ResearchEvidenceCapability = Readonly<{
  id: string
  evidence: PublishedEvidence
  purpose: string
  testId: string
  width?: number
  height?: number
}>

export type ResearchRelationshipKind = 'uses-method' | 'uses-tool' | 'occurred-during' | 'supported-by'

export type ResearchRelationship = Readonly<{
  id: string
  projectId: ContentId
  targetId: string
  targetLabel: string
  kind: ResearchRelationshipKind
  order: number
  textMarker: string
}>

export type ResearchSemanticRow = Readonly<{
  id: string
  relationshipId: string
  relationship: string
  target: string
  marker: string
  order: number
}>

export type ResearchProjectViewModel = Readonly<{
  id: ContentId
  domain: ResearchDomain
  practice: ResearchPractice
  question: string
  context: string
  contribution: ContributionDisclosure
  methods: readonly ResearchEndpoint[]
  tools: readonly ResearchEndpoint[]
  time: ResearchEndpoint
  evidence: readonly ResearchEvidenceCapability[]
  relationships: readonly ResearchRelationship[]
  semanticRows: readonly ResearchSemanticRow[]
}>

export type ComputationalProjectViewModel = ResearchProjectViewModel & Readonly<{
  domain: 'computational-projects'
  practice: 'computational'
}>

export type LaboratoryResearchViewModel = ResearchProjectViewModel & Readonly<{
  domain: 'laboratory-research'
  practice: 'laboratory'
}>

export type DataStoryViewModel = ResearchProjectViewModel & Readonly<{
  domain: 'data-stories'
  practice: 'analytical'
  destinations: readonly ResearchNoteDestination[]
}>

export type ResearchNoteDestination = Pick<
  ResearchNoteDescriptor,
  'slug' | 'href' | 'title' | 'projectId' | 'sourceType' | 'order'
>

export type ResearchDataSelection = Readonly<{
  computational: ComputationalProjectViewModel
  laboratory: LaboratoryResearchViewModel
  dataStory: DataStoryViewModel
}>

export type U04FindingCode =
  | 'U04-PROJECT-CARDINALITY'
  | 'U04-PROJECT-FIELD'
  | 'U04-PROJECT-ALLOCATION'
  | 'U04-PROJECT-DUPLICATE'
  | 'U04-ENDPOINT-DUPLICATE'
  | 'U04-RELATIONSHIP-DUPLICATE'
  | 'U04-RELATIONSHIP-ENDPOINT'
  | 'U04-EVIDENCE-OPTIONAL-MISSING'
  | 'U04-EVIDENCE-INVALID'

export type U04Finding = Readonly<{
  code: U04FindingCode
  severity: 'blocking' | 'optional'
  target: string
  message: string
}>

export type U04SelectionResult =
  | Readonly<{ ok: true; value: ResearchDataSelection; findings: readonly U04Finding[] }>
  | Readonly<{ ok: false; findings: readonly U04Finding[] }>
