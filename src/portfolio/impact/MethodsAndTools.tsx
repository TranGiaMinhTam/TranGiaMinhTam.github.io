import type { ToolsViewModel } from './impact.types'
import { ClassificationMarker } from './ClassificationMarker'
import { ToolClassificationSummary } from './ToolClassificationSummary'
import { ToolContextLink } from './ToolContextLink'
import { EvidenceAction } from '../shared/EvidenceAction'
import styles from './ToolsFieldwork.module.css'

export function MethodsAndTools({ model }: Readonly<{ model: ToolsViewModel }>) {
  return <article className={styles.tools} data-testid="methods-and-tools-body">
    <header className={styles.toolsHeader}>
      <div>
        <p className={styles.eyebrow}>CAPABILITY MAP / 16 TOOLS</p>
        <h2>What I use, and where it shows up.</h2>
      </div>
      <p className={styles.headerNote}>Each demonstrated tool links to the project or academic experience where it was used. Other entries show current areas of interest.</p>
    </header>

    <div className={styles.categories}>
      {model.categories.map((category) => <article className={styles.category} key={category.id} aria-labelledby={`${category.id}-title`}>
        <h3 id={`${category.id}-title`}>{category.label}</h3>
        <ul className={styles.toolList}>
          {category.tools.map((tool) => <li key={tool.id} data-tool-id={tool.id}>
            <span className={styles.toolTitle}>{tool.title}</span>
            <ClassificationMarker classification={tool.classification} />
            <div className={styles.toolConnections}>
              {tool.context && <ToolContextLink toolTitle={tool.title} context={tool.context} />}
              {tool.evidence.map((evidence) => <EvidenceAction className={styles.evidenceAction} evidence={evidence} key={evidence.id} />)}
            </div>
          </li>)}
        </ul>
      </article>)}
    </div>

    <ToolClassificationSummary groups={model.semanticGroups} />
  </article>
}
