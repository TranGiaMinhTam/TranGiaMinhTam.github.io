import { createImageViewerGroup, resolveImageCapability, resolvePdfCapability, useMediaViewer } from '../media-viewer'
import type { EvidenceCapability, LazyImageCapability } from './academic.types'
import styles from './AcademicEvidence.module.css'

export function AcademicEvidenceAction({ capability, group, label = 'Open evidence' }: Readonly<{
  capability: EvidenceCapability
  group?: readonly LazyImageCapability[]
  label?: string
}>) {
  const viewer = useMediaViewer()
  const format = capability.evidence.full.mediaKind === 'pdf' ? 'PDF' : 'image'
  const openViewer = (trigger: HTMLButtonElement) => {
    if (!viewer) return
    if (capability.kind === 'text-document') {
      const result = resolvePdfCapability({
        id: capability.id,
        title: capability.evidence.title,
        description: capability.evidence.caption,
        context: capability.purpose,
        href: capability.evidence.full.source,
        mediaType: 'application/pdf',
      })
      if (result.ok) viewer.openPdf(result.capability, trigger)
      return
    }
    const members = group ?? [capability]
    const items = members.flatMap((item) => {
      const result = resolveImageCapability({
        id: item.id,
        title: item.evidence.title,
        description: item.evidence.caption,
        context: item.purpose,
        href: item.evidence.full.source,
        mediaType: 'image/jpeg',
        width: item.width,
        height: item.height,
        alt: item.evidence.accessibleText,
      })
      return result.ok ? [result.capability] : []
    })
    const imageGroup = createImageViewerGroup(`academic-${capability.id}`, capability.purpose, items)
    const index = items.findIndex(({ id }) => String(id) === String(capability.id))
    if (imageGroup) viewer.openImage(imageGroup, Math.max(0, index), trigger)
  }
  if (viewer) return <button
    className={styles.evidenceAction}
    type="button"
    data-testid={capability.testId}
    aria-label={`${label}: ${capability.purpose}, ${format}`}
    onClick={(event) => openViewer(event.currentTarget)}
  >
    <span>{label}</span>
    <span className={styles.actionMeta} aria-hidden="true">{format} ↗</span>
  </button>
  return <a
    className={styles.evidenceAction}
    href={capability.evidence.full.source}
    target="_blank"
    rel="noreferrer"
    data-testid={capability.testId}
    aria-label={`${label}: ${capability.purpose}, ${format}, opens in a new tab`}
  >
    <span>{label}</span>
    <span className={styles.actionMeta} aria-hidden="true">{format} ↗</span>
  </a>
}
