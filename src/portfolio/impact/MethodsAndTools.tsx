import type { ToolsViewModel } from './impact.types'
import styles from './ToolsFieldwork.module.css'

export function MethodsAndTools({ model }: Readonly<{ model: ToolsViewModel }>) {
  return <article className={styles.tools} data-testid="methods-and-tools-body">
    <header className={styles.toolsHeader}>
      <div>
        <p className={styles.eyebrow}>CAPABILITY MAP / 16 TOOLS</p>
        <h2>What I use, and where it shows up.</h2>
      </div>
      <p className={styles.headerNote}>A concise inventory of academic, research, laboratory, language, and creative tools.</p>
    </header>

    <div className={styles.categories}>
      {model.categories.map((category) => <article className={styles.category} key={category.id} aria-labelledby={`${category.id}-title`}>
        <h3 id={`${category.id}-title`}>{category.label}</h3>
        <ul className={styles.toolList}>
          {category.tools.map((tool) => <li key={tool.id} data-tool-id={tool.id}>
            <span className={styles.toolTitle}>{tool.title}</span>
          </li>)}
        </ul>
      </article>)}
    </div>
  </article>
}
