import { useState } from 'react'
import { createImageViewerGroup, resolveImageCapability, resolvePdfCapability, useMediaViewer } from '../media-viewer'
import type { ArchiveCard, ArchiveDetailTrigger, ArchiveDocumentCard, ArchiveGroupData, ArchiveImageCard } from './archive.types'
import styles from './ArchiveExplorer.module.css'

type DetailHandler = (trigger: ArchiveDetailTrigger) => void

const Action = ({ card, group, onDetail, children }: Readonly<{
  card: ArchiveImageCard | ArchiveDocumentCard
  group?: ArchiveGroupData
  onDetail?: DetailHandler
  children: string
}>) => {
  const viewer = useMediaViewer()
  const detail = Object.freeze({
    id: card.id,
    kind: card.kind,
    title: card.title,
    href: card.originalHref,
    mediaType: card.originalMediaType,
  }) satisfies ArchiveDetailTrigger
  const open = (trigger: HTMLButtonElement) => {
    if (onDetail) { onDetail(detail); return }
    if (!viewer) return
    if (card.kind === 'document') {
      const result = resolvePdfCapability({ id: card.id, title: card.title, description: card.caption, context: card.subcollection, href: card.originalHref, mediaType: card.originalMediaType })
      if (result.ok) viewer.openPdf(result.capability, trigger)
      return
    }
  }
  if (onDetail || viewer) return <button
    className={styles.cardAction}
    type="button"
    data-testid={`archive-${card.kind}-${card.id}-detail-button`}
    onClick={(event) => {
      if (card.kind === 'image' && viewer && !onDetail) {
        const images = (group?.items.filter((item): item is ArchiveImageCard => item.kind === 'image') ?? [card])
          .flatMap((item) => {
            const result = resolveImageCapability({ id: item.id, title: item.title, description: item.caption, context: `${group?.label ?? 'Portfolio archive'} — ${item.subcollection}`, href: item.originalHref, mediaType: item.originalMediaType, width: item.width, height: item.height, alt: item.accessibilityText })
            return result.ok ? [result.capability] : []
          })
        const imageGroup = createImageViewerGroup(`archive-${group?.id ?? card.id}`, group?.label ?? card.subcollection, images)
        const index = images.findIndex(({ id }) => String(id) === String(card.id))
        if (imageGroup) viewer.openImage(imageGroup, Math.max(0, index), event.currentTarget)
      } else open(event.currentTarget)
    }}
  >{children}<span aria-hidden="true">↗</span></button>
  return <a className={styles.cardAction} href={card.originalHref} target="_blank" rel="noreferrer">{children}<span aria-hidden="true">↗</span></a>
}

const ImageCard = ({ card, group, onDetail }: Readonly<{ card: ArchiveImageCard; group?: ArchiveGroupData; onDetail?: DetailHandler }>) => {
  const [failed, setFailed] = useState(false)
  return <article className={styles.card} data-archive-item={card.id} data-archive-kind="image">
    <div className={styles.imageFrame}>
      {failed
        ? <p role="status">Preview unavailable.</p>
        : <img src={card.thumbnailHref} width={card.width} height={card.height} loading="lazy" decoding="async" alt={card.accessibilityText} onError={() => setFailed(true)} />}
    </div>
    <div className={styles.cardCopy}>
      <p className={styles.cardKind}>Photograph</p>
      <h4>{card.title}</h4>
      <p>{card.caption}</p>
      <Action card={card} group={group} onDetail={onDetail}>View larger image</Action>
    </div>
  </article>
}

const DocumentCard = ({ card, onDetail }: Readonly<{ card: ArchiveDocumentCard; onDetail?: DetailHandler }>) => {
  const [failed, setFailed] = useState(false)
  return <article className={styles.card} data-archive-item={card.id} data-archive-kind="document">
    <div className={styles.documentFrame}>
      {card.previewHref && !failed
        ? <img src={card.previewHref} width={card.previewWidth} height={card.previewHeight} loading="lazy" decoding="async" alt="" onError={() => setFailed(true)} />
        : <span aria-hidden="true">PDF</span>}
    </div>
    <div className={styles.cardCopy}>
      <p className={styles.cardKind}>Document</p>
      <h4>{card.title}</h4>
      <p>{card.caption}</p>
      <Action card={card} onDetail={onDetail}>View document</Action>
    </div>
  </article>
}

const OriginalCard = ({ card }: Readonly<{ card: Extract<ArchiveCard, { kind: 'original' }> }>) => <article className={styles.card} data-archive-item={card.id} data-archive-kind="original">
  <div className={styles.originalFrame} aria-hidden="true">FILE</div>
  <div className={styles.cardCopy}>
    <p className={styles.cardKind}>Supporting file</p>
    <h4>{card.title}</h4>
    <p>{card.caption}</p>
    <a className={styles.cardAction} href={card.originalHref} download>Download file<span aria-hidden="true">↓</span></a>
  </div>
</article>

export function ArchiveCardView({ card, group, onDetail }: Readonly<{ card: ArchiveCard; group?: ArchiveGroupData; onDetail?: DetailHandler }>) {
  if (card.kind === 'image') return <ImageCard card={card} group={group} onDetail={onDetail} />
  if (card.kind === 'document') return <DocumentCard card={card} onDetail={onDetail} />
  return <OriginalCard card={card} />
}
