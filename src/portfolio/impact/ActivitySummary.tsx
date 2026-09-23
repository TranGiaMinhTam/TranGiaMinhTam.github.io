import type { ActivitySemanticGroup } from './impact.types'
import styles from './ToolsFieldwork.module.css'

export function ActivitySummary({ groups }: Readonly<{ groups: readonly ActivitySemanticGroup[] }>) {
  return <dl className={styles.activitySemantic} aria-label="Fieldwork and leadership summary" data-testid="activity-summary">
    {groups.map((group) => <div className={styles.semanticGroup} key={group.kind} data-semantic-group={group.kind}>
      <dt>{group.label} <span>{group.count}</span></dt>
      <dd><ul>{group.entries.map((entry) => <li key={entry.id} data-semantic-id={entry.id}>
        <strong>{entry.title}</strong> — {entry.organization} — {entry.period}
      </li>)}</ul></dd>
    </div>)}
  </dl>
}
