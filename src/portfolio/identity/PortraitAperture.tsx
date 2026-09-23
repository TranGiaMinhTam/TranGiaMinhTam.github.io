import { useState } from 'react'
import type { PublishedPortrait } from './identity.types'
import styles from './IdentityQuestions.module.css'

export function PortraitAperture({ portrait }: Readonly<{ portrait: PublishedPortrait }>) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div className={styles.portraitFallback} role="status" data-testid="identity-portrait-fallback">
      <span aria-hidden="true">Ø</span>
      <p>Portrait unavailable. Identity details remain available in text.</p>
    </div>
  }

  return <figure className={styles.portraitFigure} data-testid="identity-portrait-figure">
    <div className={styles.apertureFrame}>
      <img
        className={styles.portraitImage}
        src={portrait.evidence.full.source}
        width={portrait.width}
        height={portrait.height}
        alt={portrait.alt}
        loading="eager"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
    <figcaption>{portrait.evidence.caption}</figcaption>
  </figure>
}
