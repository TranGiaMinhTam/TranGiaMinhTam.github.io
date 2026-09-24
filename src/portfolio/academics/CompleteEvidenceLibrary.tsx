import { ArchiveExplorer } from '../archive/ArchiveExplorer'
import { archiveGroups } from '../archive/archiveGroups'
import styles from './AcademicEvidence.module.css'

export function CompleteEvidenceLibrary() {
  const recordCount = archiveGroups.reduce((count, group) => count + group.count, 0)
  return <article className={styles.library} data-testid="complete-evidence-library-body">
    <header className={styles.libraryHeader}>
      <div>
        <p className={styles.eyebrow}>PORTFOLIO ARCHIVE / {recordCount} ITEMS</p>
        <h2>Certificates, projects, and fieldwork—organized by activity.</h2>
      </div>
      <div className={styles.archiveHeaderNote}>
        <p>Select a category to explore the related photographs and documents.</p>
        <p>Project-specific highlights, including the selected 2026 Protein Docking conference photograph, stay with their project stories.</p>
      </div>
    </header>
    <ArchiveExplorer />
  </article>
}
