import type {
  ContentRecord,
  EvidenceRecord,
  VerifiedPortfolioSource,
} from '../model/portfolio.types'
import { evidenceId } from '../model/portfolio.types'
import type { RelationshipValue } from '../visualization/visualization.types'
import {
  coordinateById,
  disciplineCoordinates,
  questionPositions,
  resolveDomainCoordinates,
} from './disciplineCatalog'
import type {
  IdentityQuestionsSelection,
  QuestionDisciplineRelationship,
  ResearchQuestionViewModel,
  ResearchQuestionsViewModel,
  SemanticRelationshipRow,
  U03Finding,
  U03SelectionResult,
} from './identity.types'

const PORTRAIT_ID = 'evidence-profile-portrait'
const topics = Object.freeze([
  'Molecular science',
  'Data-driven research',
  'Public health',
  'Sustainability',
] as const)

const finding = (code: U03Finding['code'], target: string, message: string): U03Finding => ({
  code, severity: 'blocking', target, message,
})

const isNonEmpty = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0

export const buildQuestionRelationships = (
  questions: readonly ContentRecord[],
): Readonly<{
  questions: readonly ResearchQuestionViewModel[]
  relationships: readonly QuestionDisciplineRelationship[]
  findings: readonly U03Finding[]
}> => {
  const findings: U03Finding[] = []
  const normalized: ResearchQuestionViewModel[] = []
  const relationships: QuestionDisciplineRelationship[] = []
  const relationshipIds = new Set<string>()

  questions.forEach((record, index) => {
    const domain = record.facts.domain
    if (!isNonEmpty(record.title) || !isNonEmpty(domain)) {
      findings.push(finding('U03-QUESTION-FIELD', record.id, 'Question text and source domain are required.'))
      return
    }
    const coordinateIds = resolveDomainCoordinates(domain)
    if (!coordinateIds) {
      findings.push(finding('U03-DOMAIN-UNKNOWN', record.id, `No approved discipline mapping exists for ${domain}.`))
      return
    }
    const question: ResearchQuestionViewModel = {
      id: record.id,
      text: record.title,
      status: 'Question under exploration',
      sourceDomain: domain,
      coordinateIds,
      position: questionPositions[index % questionPositions.length] ?? { x: 50, y: 50 },
      order: record.order,
    }
    normalized.push(question)
    coordinateIds.forEach((coordinateId, coordinateIndex) => {
      const id = `${record.id}--${coordinateId}`
      if (relationshipIds.has(id)) {
        findings.push(finding('U03-RELATIONSHIP-DUPLICATE', id, 'Relationship identifiers must be unique.'))
        return
      }
      if (!coordinateById.has(coordinateId)) {
        findings.push(finding('U03-RELATIONSHIP-ENDPOINT', id, 'Relationship coordinate endpoint does not exist.'))
        return
      }
      relationshipIds.add(id)
      relationships.push({ id, questionId: record.id, coordinateId, order: index * 10 + coordinateIndex })
    })
  })

  return {
    questions: Object.freeze(normalized),
    relationships: Object.freeze(relationships),
    findings: Object.freeze(findings),
  }
}

export const projectRelationships = (
  questions: readonly ResearchQuestionViewModel[],
  relationships: readonly QuestionDisciplineRelationship[],
): Pick<ResearchQuestionsViewModel, 'semanticRows' | 'visualization'> => {
  const questionsById = new Map(questions.map((question) => [question.id, question]))
  const relationshipsByQuestion = new Map<string, QuestionDisciplineRelationship[]>()
  relationships.forEach((relationship) => {
    const matches = relationshipsByQuestion.get(relationship.questionId)
    if (matches) matches.push(relationship)
    else relationshipsByQuestion.set(relationship.questionId, [relationship])
  })
  const semanticRows: SemanticRelationshipRow[] = questions.map((question) => {
    const matches = relationshipsByQuestion.get(question.id) ?? []
    return {
      questionId: question.id,
      question: question.text,
      disciplines: Object.freeze(matches.map((relationship) => coordinateById.get(relationship.coordinateId)?.label ?? '')),
      relationshipIds: Object.freeze(matches.map((relationship) => relationship.id)),
    }
  })
  const values: RelationshipValue[] = relationships.map((relationship) => {
    const question = questionsById.get(relationship.questionId)
    const coordinate = coordinateById.get(relationship.coordinateId)
    if (!question || !coordinate) throw new Error(`Invalid relationship endpoint: ${relationship.id}`)
    return {
      id: relationship.id,
      sourceId: question.id,
      sourceLabel: question.text,
      targetId: coordinate.contentId,
      targetLabel: coordinate.label,
      category: {
        id: coordinate.id,
        label: coordinate.label,
        textMarker: coordinate.textMarker,
        colorToken: coordinate.colorToken,
      },
    }
  })
  return {
    semanticRows: Object.freeze(semanticRows),
    visualization: {
      purpose: 'informational',
      id: 'question-discipline-constellation',
      title: 'Questions and fields in exploration',
      description: 'Three research questions connect to six supported scientific and analytical fields.',
      summaryKind: 'table',
      values: Object.freeze(values),
    },
  }
}

export const assembleIdentityQuestions = (
  source: VerifiedPortfolioSource,
  evidence: readonly EvidenceRecord[],
): U03SelectionResult => {
  const findings: U03Finding[] = []
  const identities = source.records.filter((record) => record.status === 'verified' && record.kind === 'identity' && record.id === source.identityId)
  if (identities.length !== 1) findings.push(finding('U03-IDENTITY-CARDINALITY', source.identityId, 'Exactly one verified identity must resolve.'))
  const identity = identities[0]
  const role = identity?.facts.role
  const location = identity?.facts.location
  if (identity && (!isNonEmpty(identity.title) || !isNonEmpty(identity.summary) || !isNonEmpty(role) || !isNonEmpty(location))) {
    findings.push(finding('U03-IDENTITY-FIELD', identity.id, 'Identity name, summary, role, and location are required.'))
  }

  const published = new Map(evidence.filter((record) => record.status === 'published').map((record) => [record.id, record]))
  const portrait = published.get(evidenceId(PORTRAIT_ID))
  if (!portrait || portrait.full.mediaKind !== 'image') findings.push(finding('U03-PORTRAIT-MISSING', PORTRAIT_ID, 'The published portrait is required for accepted assembly.'))

  const questionRecords = source.records
    .filter((record) => record.status === 'verified' && record.kind === 'question')
    .sort((left, right) => left.order - right.order || left.id.localeCompare(right.id))
  if (questionRecords.length !== 3) findings.push(finding('U03-QUESTION-COUNT', 'questions', 'Exactly three verified research questions are required.'))
  const built = buildQuestionRelationships(questionRecords)
  findings.push(...built.findings)

  if (findings.length > 0 || !identity || !isNonEmpty(role) || !isNonEmpty(location) || !portrait) {
    return { ok: false, findings: Object.freeze(findings) }
  }

  const projected = projectRelationships(built.questions, built.relationships)
  const value: IdentityQuestionsSelection = {
    identity: {
      id: identity.id,
      name: identity.title,
      role,
      location,
      summary: identity.summary,
      direction: {
        label: 'Currently exploring',
        statement: 'Molecular science and data-driven research for public health and sustainable futures.',
        topics,
      },
      fieldsInExploration: topics,
      portrait: { evidence: portrait, width: 1920, height: 2560, alt: portrait.title },
      curriculumVitae: { label: 'Download CV', status: 'awaiting-file', statusText: 'Available soon' },
      questionsTarget: 'questions',
    },
    questions: {
      questions: built.questions,
      coordinates: disciplineCoordinates,
      relationships: built.relationships,
      semanticRows: projected.semanticRows,
      visualization: projected.visualization,
    },
  }
  return { ok: true, value, findings: [] }
}
