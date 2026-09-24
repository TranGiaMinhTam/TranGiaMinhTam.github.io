import type { ArchiveDetailTrigger, ArchiveGroupData } from './archive.types'
import { ArchiveCardView } from './ArchiveCards'
import styles from './ArchiveExplorer.module.css'

export function ArchiveGroup({ group, onDetail }: Readonly<{
  group: ArchiveGroupData
  onDetail?: (trigger: ArchiveDetailTrigger) => void
}>) {
  const subcollections = [...new Set(group.items.map(({ subcollection }) => subcollection))]
  if (group.items.length === 0) return <p className={styles.safeState}>No public items are available in this group.</p>
  return <div className={styles.loadedGroup} data-archive-group={group.id}>
    {subcollections.map((subcollection) => <section className={styles.subcollection} key={subcollection}>
      <header className={styles.subcollectionHeader}>
        <p>{String(group.order).padStart(2, '0')} / COLLECTION</p>
        <h3>{subcollection}</h3>
        <span>{group.items.filter((item) => item.subcollection === subcollection).length} items</span>
      </header>
      <div className={styles.cardGrid}>
        {group.items.filter((item) => item.subcollection === subcollection).map((card) => <ArchiveCardView card={card} group={group} onDetail={onDetail} key={card.id} />)}
      </div>
    </section>)}
  </div>
}
