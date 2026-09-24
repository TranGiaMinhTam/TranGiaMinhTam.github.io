import { useEffect, useState } from 'react'
import { loadArchiveGroup } from './archiveGroupLoaders'
import { archiveGroups } from './archiveGroups'
import type { ArchiveDetailTrigger, ArchiveGroupId, ArchiveGroupLoadResult, ArchiveGroupSummary } from './archive.types'
import { ArchiveGroup } from './ArchiveGroup'
import styles from './ArchiveExplorer.module.css'

type LoadGroup = (id: string) => Promise<ArchiveGroupLoadResult>

export function ArchiveExplorer({
  summaries = archiveGroups,
  loadGroup = loadArchiveGroup,
  onDetail,
}: Readonly<{
  summaries?: readonly ArchiveGroupSummary[]
  loadGroup?: LoadGroup
  onDetail?: (trigger: ArchiveDetailTrigger) => void
}>) {
  const [activeId, setActiveId] = useState<ArchiveGroupId | null>(null)
  const [result, setResult] = useState<ArchiveGroupLoadResult | null>(null)
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    if (!activeId) return
    let current = true
    void loadGroup(activeId).then((next) => { if (current) setResult(next) })
    return () => { current = false }
  }, [activeId, loadGroup, requestVersion])

  const activate = (id: ArchiveGroupId) => {
    setResult(null)
    setActiveId((current) => current === id ? null : id)
    setRequestVersion(0)
  }

  return <div className={styles.explorer}>
    <div className={styles.summaryGrid} aria-label="Portfolio archive categories">
      {summaries.map((summary) => {
        const expanded = summary.id === activeId
        return <button
          className={styles.summaryButton}
          type="button"
          key={summary.id}
          aria-expanded={expanded}
          aria-controls={`archive-panel-${summary.id}`}
          data-archive-summary={summary.id}
          onClick={() => activate(summary.id)}
        >
          <span className={styles.summaryIndex}>{String(summary.order).padStart(2, '0')}</span>
          <strong>{summary.label}</strong>
          <small>{summary.description}</small>
          <span className={styles.summaryCounts}>{summary.count} items · {summary.imageCount} images · {summary.documentCount + summary.originalCount} documents</span>
          <span className={styles.summaryAction} aria-hidden="true">{expanded ? 'Close −' : 'Explore +'}</span>
        </button>
      })}
    </div>

    {activeId ? <section className={styles.groupRegion} id={`archive-panel-${activeId}`} aria-live="polite" aria-label={summaries.find(({ id }) => id === activeId)?.label}>
      {!result ? <p className={styles.safeState} role="status">Loading portfolio items…</p> : null}
      {result?.ok ? <ArchiveGroup group={result.group} onDetail={onDetail} /> : null}
      {result && !result.ok ? <div className={styles.safeState} role="status">
        <p>{result.publicMessage}</p>
        {result.code === 'ARCHIVE_GROUP_LOAD_FAILED' ? <button type="button" onClick={() => { setResult(null); setRequestVersion((version) => version + 1) }}>Retry</button> : null}
      </div> : null}
    </section> : null}
  </div>
}
