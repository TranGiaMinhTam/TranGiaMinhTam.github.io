import type { SafeViewerAction } from './mediaViewer.types'
import styles from './MediaViewer.module.css'

export function ViewerActions({ actions }: Readonly<{ actions: readonly SafeViewerAction[] }>) {
  return <div className={styles.actions}>{actions.map((action) => <a
    href={action.href}
    key={`${action.kind}-${action.href}`}
    target={action.kind === 'open' ? '_blank' : undefined}
    rel={action.kind === 'open' ? 'noopener noreferrer' : undefined}
    download={action.kind === 'download' ? action.filename ?? '' : undefined}
    data-testid={`media-viewer-${action.kind}-action`}
  >{action.label}<span aria-hidden="true">{action.kind === 'open' ? ' ↗' : ' ↓'}</span></a>)}</div>
}
