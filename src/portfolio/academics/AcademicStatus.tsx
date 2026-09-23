import type { AcademicStatusKind } from './academic.types'
import styles from './AcademicEvidence.module.css'

export function AcademicStatus({ status }: Readonly<{ status: AcademicStatusKind }>) {
  return <span className={styles.academicStatus} data-status={status}>
    <span aria-hidden="true">{status === 'in-progress' ? '◐' : '●'}</span>
    {status === 'in-progress' ? 'In progress' : 'Completed'}
  </span>
}
