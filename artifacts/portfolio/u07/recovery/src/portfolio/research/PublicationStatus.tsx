import styles from './ResearchData.module.css'

export function PublicationStatus({ children }: Readonly<{ children: 'Research notes are being prepared' }>) {
  return <p className={styles.publicationStatus} role="status" data-testid="data-stories-publication-status">
    <span aria-hidden="true">···</span>
    {children}
  </p>
}
