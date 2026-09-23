import type { ResearchNoteDestination } from './research.types'
import styles from './ResearchData.module.css'

export function PublicationStatus({ destinations }: Readonly<{ destinations: readonly ResearchNoteDestination[] }>) {
  if (destinations.length === 0) return null
  return <div className={styles.publicationStatus} aria-label="Local research notes" data-testid="data-stories-note-discovery">
    <span>Research note</span>
    {destinations.map((destination) => <a key={destination.slug} href={destination.href} data-note-project={destination.projectId}>
      <strong>{destination.title}</strong>
      <small>Read project note <span aria-hidden="true">→</span></small>
    </a>)}
  </div>
}
