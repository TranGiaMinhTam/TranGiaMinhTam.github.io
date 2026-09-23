import type { SemanticSummaryModel } from './semanticSummary.types'
import styles from './SemanticSummary.module.css'

export function SemanticSummary({ model, testId, className }: Readonly<{
  model: SemanticSummaryModel
  testId?: string
  className?: string
}>) {
  const titleId = `${model.id}-title`
  const classes = [styles.semanticSummary, className].filter(Boolean).join(' ')
  return <div className={classes} aria-labelledby={titleId} data-testid={testId ?? 'semantic-summary'}>
    <h3 id={titleId}>{model.title}</h3>
    {model.description ? <p>{model.description}</p> : null}
    <ol>
      {model.rows.map((row) => <li key={row.id} data-semantic-row-id={row.id} data-emphasized={row.emphasized || undefined}>
        <strong>{row.primary}</strong>
        <dl>
          {row.details.map((detail) => <div key={`${row.id}-${detail.label}`}>
            <dt>{detail.label}</dt>
            <dd>{detail.value}</dd>
          </div>)}
        </dl>
      </li>)}
    </ol>
  </div>
}
