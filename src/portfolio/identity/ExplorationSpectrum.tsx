import type { ExplorationTopic, ScientificDirection } from './identity.types'
import styles from './IdentityQuestions.module.css'

export function ExplorationSpectrum({
  direction,
  topics,
}: Readonly<{ direction: ScientificDirection; topics: readonly ExplorationTopic[] }>) {
  return <div className={styles.spectrum} aria-labelledby="exploration-spectrum-heading">
    <p className={styles.spectrumLabel} id="exploration-spectrum-heading">Fields in exploration</p>
    <ol className={styles.spectrumList}>
      {topics.map((topic, index) => <li key={topic}>
        <span aria-hidden="true">0{index + 1}</span>
        {topic}
      </li>)}
    </ol>
    <p className={styles.directionLine}>
      <strong>{direction.label}:</strong> {direction.statement}
    </p>
  </div>
}
