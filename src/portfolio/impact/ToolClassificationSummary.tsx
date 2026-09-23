import type { ToolSemanticGroup } from './impact.types'
import styles from './ToolsFieldwork.module.css'

export function ToolClassificationSummary({ groups }: Readonly<{ groups: readonly ToolSemanticGroup[] }>) {
  return <dl className={styles.toolSemantic} aria-label="Tool classification summary" data-testid="tool-classification-summary">
    {groups.map((group) => <div className={styles.semanticGroup} key={group.id} data-semantic-group={group.id}>
      <dt>{group.label} <span>{group.count}</span></dt>
      <dd><ul>{group.entries.map((entry) => <li key={entry.id} data-semantic-id={entry.id}>
        <strong>{entry.title}</strong> — {entry.classification === 'demonstrated' ? `Demonstrated — ${entry.contextLabel ?? 'Context unavailable'}` : 'Interest'}
      </li>)}</ul></dd>
    </div>)}
  </dl>
}
