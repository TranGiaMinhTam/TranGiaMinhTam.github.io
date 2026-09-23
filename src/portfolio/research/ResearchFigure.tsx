import { useState } from 'react'
import type { ResearchEvidenceCapability } from './research.types'
import styles from './ResearchData.module.css'

export function ResearchFigure({ capability }: Readonly<{ capability: ResearchEvidenceCapability }>) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div className={styles.figureFallback} role="status" data-testid={`${capability.testId}-fallback`}>
    <strong>Project figure unavailable.</strong>
    <span>Project context and relationships remain available in text.</span>
  </div>

  return <figure className={styles.researchFigure}>
    <img
      src={capability.evidence.full.source}
      alt={capability.evidence.accessibleText}
      width={capability.width}
      height={capability.height}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      data-testid={capability.testId.replace('-link', '-image')}
    />
    <figcaption>{capability.evidence.caption}</figcaption>
  </figure>
}
