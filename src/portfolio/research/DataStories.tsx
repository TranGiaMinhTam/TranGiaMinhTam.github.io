import { ContributionStatus } from './ContributionStatus'
import { PublicationStatus } from './PublicationStatus'
import { ResearchEvidenceAction } from './ResearchEvidenceAction'
import { ResearchFigure } from './ResearchFigure'
import { ResearchRelationshipSummary } from './ResearchRelationshipSummary'
import { resolvePublishedEvidence } from '../model/evidenceManifest'
import type { ResearchEvidenceCapability } from './research.types'
import type { DataStoryViewModel } from './research.types'
import styles from './ResearchData.module.css'

const relationshipFor = (model: DataStoryViewModel, targetId: string) =>
  model.relationships.find((relationship) => relationship.targetId === targetId)?.id

const futureInnovatorEvidence = resolvePublishedEvidence('evidence-future-innovator-first-place')
const futureInnovatorPreview: ResearchEvidenceCapability | undefined = futureInnovatorEvidence
  ? Object.freeze({
      id: 'future-innovator-first-place-preview',
      evidence: futureInnovatorEvidence,
      purpose: 'Future Innovator Camp — Cool Ride innovation project',
      testId: 'future-innovator-first-place-preview-link',
      width: 2568,
      height: 1926,
    })
  : undefined

export function DataStories({ model }: Readonly<{ model: DataStoryViewModel }>) {
  const figure = model.evidence.find(({ evidence }) => evidence.full.mediaKind === 'image')
  return <div className={styles.dataField} data-testid="data-stories-body">
    <header className={styles.signalHeader}>
      <p>Analytical signal / retail context</p>
      <h3>{model.question}</h3>
      <p>{model.context}</p>
      <ContributionStatus contribution={model.contribution} />
    </header>

    <div className={styles.signalSheet} aria-label="Analytical workflow signal sheet">
      <div className={styles.signalAxis} aria-hidden="true"><span>source</span><span>structure</span><span>meaning</span><span>decision</span></div>
      <ol>{model.methods.map((method, index) => <li
        key={method.id}
        data-visual-relationship={relationshipFor(model, method.id)}
      >
        <span>{String(index + 1).padStart(2, '0')}</span>
        <strong>{method.label}</strong>
        <i aria-hidden="true" style={{ '--signal-level': `${36 + index * 16}%` } as React.CSSProperties} />
      </li>)}</ol>
    </div>

    <div className={styles.analysisContext}>
      <div>
        <p>Analysis environment</p>
        <ul>{model.tools.map((tool) => <li key={tool.id} data-visual-relationship={relationshipFor(model, tool.id)}>{tool.label}</li>)}</ul>
      </div>
      <p className={styles.timeBand} data-visual-relationship={relationshipFor(model, model.time.id)}><strong>Challenge context</strong> {model.time.label}</p>
    </div>

    {futureInnovatorPreview ? <section className={styles.innovationPreview} aria-labelledby="future-innovator-preview-title">
      <header>
        <p>Separate innovation project</p>
        <h4 id="future-innovator-preview-title">1st Place — Future Innovator Camp</h4>
        <p>Cool Ride combined a customizable helmet concept, product planning, and an investment pitch. This preview documents that project and is not evidence for the retail analytics challenge.</p>
      </header>
      <ResearchFigure capability={futureInnovatorPreview} />
    </section> : null}

    <div className={styles.evidenceStrip} aria-label="Data project evidence">
      {model.evidence.map((capability) => <div key={capability.id} data-visual-relationship={relationshipFor(model, capability.id)}>
        <ResearchEvidenceAction capability={capability} />
      </div>)}
    </div>
    {figure ? <ResearchFigure capability={figure} /> : null}
    <PublicationStatus destinations={model.destinations} />
    <div className={styles.relationshipSummary}>
      <ResearchRelationshipSummary domain={model.domain} rows={model.semanticRows} />
    </div>
  </div>
}
