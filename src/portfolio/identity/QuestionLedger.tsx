import type { ContentId } from '../model/portfolio.types'
import type { ResearchQuestionViewModel } from './identity.types'
import styles from './IdentityQuestions.module.css'

export function QuestionLedger({
  questions,
  emphasizedId,
  onEmphasize,
}: Readonly<{
  questions: readonly ResearchQuestionViewModel[]
  emphasizedId?: ContentId
  onEmphasize: (questionId?: ContentId) => void
}>) {
  return <ol className={styles.questionSequence} aria-label="Research questions">
    {questions.map((question, index) => <li key={question.id}>
      <article
        className={styles.questionEntry}
        data-emphasized={emphasizedId === question.id || undefined}
        data-testid={`research-question-${index + 1}`}
        tabIndex={0}
        onFocus={() => onEmphasize(question.id)}
        onBlur={() => onEmphasize(undefined)}
        onMouseEnter={() => onEmphasize(question.id)}
        onMouseLeave={() => onEmphasize(undefined)}
      >
        <div className={styles.questionIndex} aria-hidden="true">Q{String(index + 1).padStart(2, '0')}</div>
        <p className={styles.questionStatus}>{question.status}</p>
        <h3>{question.text}</h3>
        <p className={styles.questionDomain}>{question.sourceDomain}</p>
      </article>
    </li>)}
  </ol>
}
