import type { ContextLinkCapability } from './impact.types'
import styles from './ToolsFieldwork.module.css'

export function ToolContextLink({ toolTitle, context }: Readonly<{ toolTitle: string; context: ContextLinkCapability }>) {
  return <a
    className={styles.contextLink}
    href={context.hash}
    data-testid={context.testId}
    aria-label={`${toolTitle}: demonstrated in ${context.label}`}
  >
    <span>{context.label}</span>
    <span className={styles.contextMeta} aria-hidden="true">↓</span>
  </a>
}
