import type { ContentId } from '../model/portfolio.types'
import type { ResearchQuestionsViewModel } from './identity.types'
import styles from './IdentityQuestions.module.css'

export function QuestionConstellation({
  model,
  emphasizedId,
}: Readonly<{
  model: ResearchQuestionsViewModel
  emphasizedId?: ContentId
}>) {
  const questions = new Map(model.questions.map((question) => [question.id, question]))
  const coordinates = new Map(model.coordinates.map((coordinate) => [coordinate.id, coordinate]))

  return <figure className={styles.constellationFigure} data-testid="question-constellation">
    <svg viewBox="0 0 100 100" role="img" aria-labelledby="constellation-title constellation-description">
      <title id="constellation-title">{model.visualization.title}</title>
      <desc id="constellation-description">{model.visualization.description} Full relationships follow in a table.</desc>
      <g className={styles.connectionLayer}>
        {model.relationships.map((relationship) => {
          const question = questions.get(relationship.questionId)
          const coordinate = coordinates.get(relationship.coordinateId)
          if (!question || !coordinate) return null
          return <line
            key={relationship.id}
            x1={question.position.x}
            y1={question.position.y}
            x2={coordinate.position.x}
            y2={coordinate.position.y}
            data-related={emphasizedId === relationship.questionId || undefined}
            style={{ '--relationship-color': coordinate.colorToken } as React.CSSProperties}
          />
        })}
      </g>
      <g className={styles.coordinateLayer}>
        {model.coordinates.map((coordinate) => <g key={coordinate.id} transform={`translate(${coordinate.position.x} ${coordinate.position.y})`}>
          <circle r="3.2" style={{ '--relationship-color': coordinate.colorToken } as React.CSSProperties} />
          <text y="-5" textAnchor="middle">{coordinate.textMarker}</text>
        </g>)}
      </g>
      <g className={styles.questionLayer}>
        {model.questions.map((question, index) => <g key={question.id} transform={`translate(${question.position.x} ${question.position.y})`} data-emphasized={emphasizedId === question.id || undefined}>
          <rect x="-4.8" y="-3.2" width="9.6" height="6.4" rx="1" />
          <text y="1.25" textAnchor="middle">Q{index + 1}</text>
        </g>)}
      </g>
    </svg>
    <figcaption>Select a question to highlight its connected fields.</figcaption>
  </figure>
}
