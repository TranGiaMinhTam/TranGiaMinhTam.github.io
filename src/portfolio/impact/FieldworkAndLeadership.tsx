import type { FieldworkLeadershipViewModel } from './impact.types'
import { ActivityRecordCard } from './ActivityRecordCard'
import styles from './ToolsFieldwork.module.css'

export function FieldworkAndLeadership({ model }: Readonly<{ model: FieldworkLeadershipViewModel }>) {
  const records = model.groups.flatMap((group) => group.records).sort((left, right) => left.order - right.order)
  return <article className={styles.activity} data-testid="fieldwork-and-leadership-body">
    <div className={styles.activityRecords} aria-label="Fieldwork and leadership experiences">
      {records.map((record) => <ActivityRecordCard record={record} key={record.id} />)}
    </div>
  </article>
}
