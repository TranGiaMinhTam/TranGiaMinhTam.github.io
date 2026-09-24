import type { ResearchEvidenceCapability } from './research.types'
import { createImageViewerGroup, resolveImageCapability, resolvePdfCapability, useMediaViewer } from '../media-viewer'
import styles from './ResearchData.module.css'

export function ResearchEvidenceAction({ capability, group }: Readonly<{ capability: ResearchEvidenceCapability; group?: readonly ResearchEvidenceCapability[] }>) {
  const viewer = useMediaViewer()
  const type = capability.evidence.full.mediaKind === 'pdf' ? 'PDF' : 'image'
  const canPreviewImage = type === 'image' && capability.width !== undefined && capability.height !== undefined
  const openViewer = (trigger: HTMLButtonElement) => {
    if (!viewer) return
    if (type === 'PDF') {
      const result = resolvePdfCapability({ id: capability.id, title: capability.evidence.title, description: capability.evidence.caption, context: capability.purpose, href: capability.evidence.full.source, mediaType: 'application/pdf' })
      if (result.ok) viewer.openPdf(result.capability, trigger)
      return
    }
    const members = (group ?? [capability]).filter((item) => item.evidence.full.mediaKind === 'image' && item.width !== undefined && item.height !== undefined)
    const items = members.flatMap((item) => {
      const result = resolveImageCapability({ id: item.id, title: item.evidence.title, description: item.evidence.caption, context: item.purpose, href: item.evidence.full.source, mediaType: 'image/jpeg', width: item.width!, height: item.height!, alt: item.evidence.accessibleText })
      return result.ok ? [result.capability] : []
    })
    const imageGroup = createImageViewerGroup(`research-${capability.id}`, capability.purpose, items)
    const index = items.findIndex(({ id }) => String(id) === capability.id)
    if (imageGroup) viewer.openImage(imageGroup, Math.max(0, index), trigger)
  }
  if (viewer && (type === 'PDF' || canPreviewImage)) return <button
    className={styles.evidenceAction}
    type="button"
    aria-label={`${capability.purpose} for this project, ${type}`}
    data-testid={capability.testId}
    onClick={(event) => openViewer(event.currentTarget)}
  >
    <span>{capability.purpose}</span>
    <small>{type} · review evidence ↗</small>
  </button>
  return <a
    className={styles.evidenceAction}
    href={capability.evidence.full.source}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${capability.purpose} for this project, ${type}; opens in a new tab`}
    data-testid={capability.testId}
  >
    <span>{capability.purpose}</span>
    <small>{type} · open evidence ↗</small>
  </a>
}
