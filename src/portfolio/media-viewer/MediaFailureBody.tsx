import type { SafeViewerAction } from './mediaViewer.types'
import { ViewerActions } from './ViewerActions'
import styles from './MediaViewer.module.css'

export function MediaFailureBody({ message, actions }: Readonly<{ message: string; actions: readonly SafeViewerAction[] }>) {
  return <div className={styles.failure} role="status" data-testid="media-viewer-failure-body">
    <strong>{message}</strong>
    <p>The reviewed details remain available. You may close this view or use an available direct action.</p>
    <ViewerActions actions={actions} />
  </div>
}
