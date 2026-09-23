import type { FieldworkLeadershipViewModel } from './impact.types'
import { ActivityRecordCard } from './ActivityRecordCard'
import { ActivitySummary } from './ActivitySummary'
import styles from './ToolsFieldwork.module.css'

export function FieldworkAndLeadership({ model }: Readonly<{ model: FieldworkLeadershipViewModel }>) {
  return <article className={styles.activity} data-testid="fieldwork-and-leadership-body">
    <header className={styles.activityHeader}>
      <div>
        <p className={styles.eyebrow}>FIELDWORK AND LEADERSHIP / 4 EXPERIENCES</p>
        <h2>Where responsibility met the field.</h2>
      </div>
      <p className={styles.headerNote}>Grouped by activity rather than chronology, each entry keeps its role, organization, and period easy to scan.</p>
    </header>

    <div className={styles.groups}>
      {model.groups.map((group) => <article className={styles.group} key={group.kind} aria-labelledby={`${group.kind}-title`}>
        <h3 id={`${group.kind}-title`}>{group.label} <span>{group.count}</span></h3>
        <div className={styles.groupRecords}>
          {group.records.map((record) => <ActivityRecordCard record={record} key={record.id} />)}
        </div>
      </article>)}
    </div>

    <ActivitySummary groups={model.semanticGroups} />
  </article>
}
