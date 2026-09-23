import { useState } from 'react'
import type { ContentId } from '../model/portfolio.types'
import type { ResearchQuestionsViewModel } from './identity.types'
import { QuestionConstellation } from './QuestionConstellation'
import { QuestionLedger } from './QuestionLedger'
import { RelationshipSummary } from './RelationshipSummary'
import styles from './IdentityQuestions.module.css'

export function ResearchQuestions({ model }: Readonly<{ model: ResearchQuestionsViewModel }>) {
  const [emphasizedId, setEmphasizedId] = useState<ContentId>()

  return <div className={styles.questionsField} data-testid="research-questions-body">
    <header className={styles.questionsIntroduction}>
      <p>Question atlas</p>
      <h3>Three questions define the current field of inquiry.</h3>
      <p>Select a question to see the scientific fields it brings together.</p>
    </header>
    <QuestionLedger questions={model.questions} emphasizedId={emphasizedId} onEmphasize={setEmphasizedId} />
    <QuestionConstellation model={model} emphasizedId={emphasizedId} />
    <RelationshipSummary rows={model.semanticRows} emphasizedId={emphasizedId} />
  </div>
}
