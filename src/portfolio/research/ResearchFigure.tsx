import { useState } from 'react'
import { createImageViewerGroup, resolveImageCapability, useMediaViewer } from '../media-viewer'
import type { ResearchEvidenceCapability } from './research.types'
import styles from './ResearchData.module.css'

export function ResearchFigure({ capability, group }: Readonly<{ capability: ResearchEvidenceCapability; group?: readonly ResearchEvidenceCapability[] }>) {
  const [failed, setFailed] = useState(false)
  const viewer = useMediaViewer()
  if (failed) return <div className={styles.figureFallback} role="status" data-testid={`${capability.testId}-fallback`}>
    <strong>Project figure unavailable.</strong>
    <span>Project context and relationships remain available in text.</span>
  </div>

  const image = <img
      src={capability.evidence.full.source}
      alt={capability.evidence.accessibleText}
      width={capability.width}
      height={capability.height}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      data-testid={capability.testId.replace('-link', '-image')}
    />
  return <figure className={styles.researchFigure}>
    {viewer && capability.width && capability.height
      ? <button type="button" className={styles.figureButton} aria-label={`View larger image: ${capability.evidence.title}`} onClick={(event) => {
          const members = (group ?? [capability]).filter((item) => item.evidence.full.mediaKind === 'image' && item.width && item.height)
          const items = members.flatMap((item) => {
            const result = resolveImageCapability({ id: item.id, title: item.evidence.title, description: item.evidence.caption, context: item.purpose, href: item.evidence.full.source, mediaType: 'image/jpeg', width: item.width!, height: item.height!, alt: item.evidence.accessibleText })
            return result.ok ? [result.capability] : []
          })
          const imageGroup = createImageViewerGroup(`research-figures-${capability.id}`, capability.purpose, items)
          const index = items.findIndex(({ id }) => String(id) === capability.id)
          if (imageGroup) viewer.openImage(imageGroup, Math.max(0, index), event.currentTarget)
        }}>{image}</button>
      : image}
    <figcaption>{capability.evidence.caption}</figcaption>
  </figure>
}
