import type { ExtractMediaState } from './viewerTypeHelpers'
import { ViewerActions } from './ViewerActions'
import styles from './MediaViewer.module.css'

export function ImageViewerBody({ state, onPrevious, onNext, onFailed }: Readonly<{
  state: ExtractMediaState<'image'>
  onPrevious: () => void
  onNext: () => void
  onFailed: () => void
}>) {
  const item = state.group.items[state.index]
  if (!item) return null
  const position = `Image ${state.index + 1} of ${state.group.items.length}`
  return <div className={styles.body} data-testid="media-viewer-image-body">
    <div className={styles.imageFrame} tabIndex={0} aria-label="Scrollable full image preview">
      {item.embedAllowed
        ? <img src={item.href} alt={item.alt} width={item.width} height={item.height} onError={onFailed} />
        : <p role="status">This image is available through the actions below.</p>}
    </div>
    <div className={styles.imageMeta}>
      <p className={styles.context}>{item.context}</p>
      <p aria-live="polite" data-testid="media-viewer-position">{position}</p>
    </div>
    <div className={styles.navigation} aria-label="Image navigation">
      <button type="button" onClick={onPrevious} disabled={state.index === 0} data-testid="media-viewer-previous-button">← Previous</button>
      <button type="button" onClick={onNext} disabled={state.index === state.group.items.length - 1} data-testid="media-viewer-next-button">Next →</button>
    </div>
    <ViewerActions actions={item.actions} />
  </div>
}
