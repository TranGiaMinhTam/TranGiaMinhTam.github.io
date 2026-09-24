import type { PdfViewerCapability } from './mediaViewer.types'
import { ViewerActions } from './ViewerActions'
import styles from './MediaViewer.module.css'

export function PdfViewerBody({ item, onFailed }: Readonly<{ item: PdfViewerCapability; onFailed: () => void }>) {
  return <div className={styles.body} data-testid="media-viewer-pdf-body">
    <div className={styles.pdfFrame}>
      {item.embedAllowed
        ? <iframe src={item.href} title={`${item.title} PDF`} onError={onFailed} />
        : <p role="status">This document is available through the actions below.</p>}
    </div>
    <p className={styles.context}>{item.context}</p>
    <ViewerActions actions={item.actions} />
  </div>
}
