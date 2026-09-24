import { useCallback, useMemo, useReducer, useState, type ReactNode } from 'react'
import { MediaViewerHost } from './MediaViewerHost'
import { MediaViewerControllerContext } from './MediaViewerController'
import { closedMediaDialogState, mediaViewerReducer } from './mediaViewerReducer'
import type { ImageViewerGroup, PdfViewerCapability } from './mediaViewer.types'

export function MediaViewerProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [state, dispatch] = useReducer(mediaViewerReducer, closedMediaDialogState)
  const [trigger, setTrigger] = useState<HTMLElement | null>(null)
  const openPdf = useCallback((item: PdfViewerCapability, nextTrigger: HTMLElement) => {
    setTrigger(nextTrigger)
    dispatch({ type: 'OPEN_PDF', item, triggerId: nextTrigger.dataset.testid ?? nextTrigger.id ?? item.id })
  }, [])
  const openImage = useCallback((group: ImageViewerGroup, index: number, nextTrigger: HTMLElement) => {
    setTrigger(nextTrigger)
    dispatch({ type: 'OPEN_IMAGE', group, index, triggerId: nextTrigger.dataset.testid ?? nextTrigger.id ?? group.id })
  }, [])
  const value = useMemo(() => Object.freeze({ openPdf, openImage }), [openImage, openPdf])

  return <MediaViewerControllerContext.Provider value={value}>
    {children}
    <MediaViewerHost state={state} dispatch={dispatch} trigger={trigger} />
  </MediaViewerControllerContext.Provider>
}
