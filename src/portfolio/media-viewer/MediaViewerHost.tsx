import { lazy, Suspense, useEffect, useId, useRef, type Dispatch, type KeyboardEvent } from 'react'
import type { MediaDialogEvent, MediaDialogState } from './mediaViewer.types'
import styles from './MediaViewer.module.css'

const PdfViewerBody = lazy(() => import('./PdfViewerBody').then(({ PdfViewerBody: component }) => ({ default: component })))
const ImageViewerBody = lazy(() => import('./ImageViewerBody').then(({ ImageViewerBody: component }) => ({ default: component })))
const MediaFailureBody = lazy(() => import('./MediaFailureBody').then(({ MediaFailureBody: component }) => ({ default: component })))

const focusableSelector = 'a[href],button:not([disabled]),iframe,[tabindex]:not([tabindex="-1"])'

export function MediaViewerHost({ state, dispatch, trigger }: Readonly<{
  state: MediaDialogState
  dispatch: Dispatch<MediaDialogEvent>
  trigger: HTMLElement | null
}>) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const descriptionId = useId()
  const open = state.kind !== 'closed'

  useEffect(() => {
    const dialog = dialogRef.current
    const main = document.querySelector<HTMLElement>('#scan-field')
    if (!open) {
      if (dialog?.open && typeof dialog.close === 'function') dialog.close()
      main?.removeAttribute('inert')
      document.documentElement.classList.remove(styles.viewerLocked)
      if (trigger?.isConnected) trigger.focus()
      return
    }
    if (!dialog) return
    if (!dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal()
      else dialog.setAttribute('open', '')
    }
    if (main && !dialog.contains(main)) main.setAttribute('inert', '')
    document.documentElement.classList.add(styles.viewerLocked)
    closeRef.current?.focus()
    return () => {
      main?.removeAttribute('inert')
      document.documentElement.classList.remove(styles.viewerLocked)
    }
  }, [open, trigger])

  useEffect(() => () => {
    document.querySelector<HTMLElement>('#scan-field')?.removeAttribute('inert')
    document.documentElement.classList.remove(styles.viewerLocked)
  }, [])

  if (!open) return null
  const item = state.kind === 'pdf' ? state.item : state.kind === 'image' ? state.group.items[state.index] : undefined
  const title = state.kind === 'failure' ? state.title : item?.title ?? 'Media'
  const description = state.kind === 'failure' ? state.description : item?.description ?? 'Media detail.'
  const close = () => dispatch({ type: 'CLOSE' })
  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
      return
    }
    if (event.key !== 'Tab') return
    const focusable = [...event.currentTarget.querySelectorAll<HTMLElement>(focusableSelector)].filter((node) => !node.hasAttribute('disabled'))
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable.at(-1)
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }

  return <dialog
    ref={dialogRef}
    className={styles.dialog}
    aria-labelledby={titleId}
    aria-describedby={descriptionId}
    data-testid="media-viewer-dialog"
    onCancel={(event) => { event.preventDefault(); close() }}
    onClick={(event) => { if (event.target === event.currentTarget) close() }}
    onKeyDown={onKeyDown}
  >
    <div className={styles.surface}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Media review</p>
          <h2 id={titleId}>{title}</h2>
          <p id={descriptionId}>{description}</p>
        </div>
        <button ref={closeRef} className={styles.closeButton} type="button" onClick={close} data-testid="media-viewer-close-button">Close <span aria-hidden="true">×</span></button>
      </header>
      <Suspense fallback={<p className={styles.loadingState} role="status">Loading media…</p>}>
        {state.kind === 'pdf' ? <PdfViewerBody item={state.item} onFailed={() => dispatch({ type: 'MEDIA_FAILED' })} /> : null}
        {state.kind === 'image' ? <ImageViewerBody state={state} onPrevious={() => dispatch({ type: 'PREVIOUS' })} onNext={() => dispatch({ type: 'NEXT' })} onFailed={() => dispatch({ type: 'MEDIA_FAILED' })} /> : null}
        {state.kind === 'failure' ? <MediaFailureBody message={state.publicMessage} actions={state.actions} /> : null}
      </Suspense>
    </div>
  </dialog>
}
