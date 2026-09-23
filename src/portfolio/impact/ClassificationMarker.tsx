import type { ToolClassification } from './impact.types'
import styles from './ToolsFieldwork.module.css'

export function ClassificationMarker({ classification }: Readonly<{ classification: ToolClassification }>) {
  return <span className={styles.classificationMarker} data-classification={classification}>
    <span aria-hidden="true">{classification === 'demonstrated' ? '●' : '◇'}</span>
    {classification === 'demonstrated' ? 'Demonstrated' : 'Interest'}
  </span>
}
