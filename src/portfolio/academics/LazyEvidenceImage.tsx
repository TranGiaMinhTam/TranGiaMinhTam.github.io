import { useState } from 'react'
import type { LazyImageCapability } from './academic.types'
import { AcademicEvidenceAction } from './AcademicEvidenceAction'
import styles from './AcademicEvidence.module.css'

export function LazyEvidenceImage({ capability, group }: Readonly<{ capability: LazyImageCapability; group?: readonly LazyImageCapability[] }>) {
  const [failed, setFailed] = useState(false)
  return <div className={styles.imagePreview} data-testid={`image-preview-${capability.id}`}>
    <div className={styles.imageFrame}>
      {failed
        ? <p className={styles.imageUnavailable} role="status">Preview unavailable. The full image action remains available.</p>
        : <img
          src={capability.evidence.full.source}
          alt={capability.evidence.accessibleText}
          width={capability.width}
          height={capability.height}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />}
    </div>
    <div className={styles.imageCopy}>
      <p className={styles.itemKind}>project visual</p>
      <h4>{capability.evidence.title}</h4>
      <p>{capability.evidence.caption}</p>
      <AcademicEvidenceAction capability={capability} group={group} label="Open full image" />
    </div>
  </div>
}
