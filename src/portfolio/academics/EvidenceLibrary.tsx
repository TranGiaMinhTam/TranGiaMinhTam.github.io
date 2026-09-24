import type { EvidenceLibraryViewModel, LazyImageCapability } from './academic.types'
import { EvidenceCountSummary } from './EvidenceCountSummary'
import { LazyEvidenceImage } from './LazyEvidenceImage'
import { TextDocumentPreview } from './TextDocumentPreview'
import styles from './AcademicEvidence.module.css'

export function EvidenceLibrary({ model }: Readonly<{ model: EvidenceLibraryViewModel }>) {
  const recordCount = model.groups.reduce((count, group) => count + group.count, 0)
  return <article className={styles.library} data-testid="evidence-library-body">
    <header className={styles.libraryHeader}>
      <div>
        <p className={styles.eyebrow}>PROJECT ARCHIVE / {recordCount} RECORDS</p>
        <h2>Project materials, organized by category.</h2>
      </div>
      <nav className={styles.categoryNav} aria-label="Evidence categories">
        {model.groups.map((group) => <a href={`#evidence-${group.id}`} key={group.id}>{group.label} <span>{group.count}</span></a>)}
      </nav>
    </header>

    <EvidenceCountSummary entries={model.semanticCounts} />

    <div className={styles.archive}>
      {model.groups.map((group) => {
        const imageGroup = group.items.flatMap(({ capability }) => capability.kind === 'lazy-image' ? [capability] : []) satisfies readonly LazyImageCapability[]
        return <section className={styles.archiveGroup} id={`evidence-${group.id}`} key={group.id} tabIndex={-1}>
        <header className={styles.groupHeader}>
          <span className={styles.groupMarker} aria-hidden="true">{group.marker}</span>
          <div><p>{String(group.order).padStart(2, '0')} / {group.count} records</p><h3>{group.label}</h3><small>{group.description}</small></div>
        </header>
        <div className={styles.archiveRows}>
          {group.items.map((item) => <div className={styles.archiveRow} key={item.id} data-evidence-id={item.id}>
            <span className={styles.rowIndex} aria-hidden="true">{String(item.order).padStart(2, '0')}</span>
            {item.capability.kind === 'text-document'
              ? <TextDocumentPreview capability={item.capability} />
              : <LazyEvidenceImage capability={item.capability} group={imageGroup} />}
          </div>)}
        </div>
      </section>})}
    </div>
  </article>
}
