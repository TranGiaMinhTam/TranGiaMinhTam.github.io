import type { ActivityRecord } from './impact.types'
import { EvidenceAction } from '../shared/EvidenceAction'
import styles from './ToolsFieldwork.module.css'

export function ActivityRecordCard({ record }: Readonly<{ record: ActivityRecord }>) {
  return <article className={styles.activityRecord} data-testid={`${record.kind}-${record.id}`}>
    <header>
      <p className={styles.period}>{record.period}</p>
      <h3>{record.title}</h3>
      <p className={styles.organization}>{record.organization}</p>
    </header>
    <ul>{record.descriptionPoints.map((point, index) => <li key={`${record.id}-point-${index + 1}`}>{point}</li>)}</ul>
    {record.evidence.map((evidence) => <EvidenceAction className={styles.evidenceAction} evidence={evidence} key={evidence.id} />)}
  </article>
}
