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
  return <div className={styles.dataField} data-testid="data-stories-body">
    <section className={styles.simLseProject} aria-labelledby="sim-lse-project-title">
      <header className={styles.signalHeader}>
        <p>Data project 01 / SIM-LSE</p>
        <h3 id="sim-lse-project-title">Top 10 Finalist — SIM-LSE Data Analytics Challenge</h3>
        <p><strong className={styles.projectQuestion}>{model.question}</strong>{model.context}</p>
        <ContributionStatus contribution={model.contribution} />
      </header>

      <div className={styles.signalSheet} aria-label="Analytical workflow signal sheet">
        <div className={styles.signalAxis} aria-hidden="true"><span>Step</span><span>Method</span></div>
        <ol>{model.methods.map((method, index) => <li
          key={method.id}
          data-visual-relationship={relationshipFor(model, method.id)}
        >
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{method.label}</strong>
        </li>)}</ol>
      </div>

      <div className={styles.analysisContext}>
        <div>
          <p>Analysis environment</p>
          <ul>{model.tools.map((tool) => <li key={tool.id} data-visual-relationship={relationshipFor(model, tool.id)}>{tool.label}</li>)}</ul>
        </div>
        <p className={styles.timeBand} data-visual-relationship={relationshipFor(model, model.time.id)}><strong>Challenge context</strong> {model.time.label}</p>
      </div>

      <div className={styles.evidenceStrip} aria-label="SIM-LSE project evidence">
        {model.evidence.map((capability) => <div key={capability.id} data-visual-relationship={relationshipFor(model, capability.id)}>
          <ResearchEvidenceAction capability={capability} />
        </div>)}
      </div>
      <PublicationStatus destinations={model.destinations} />
      <div className={styles.fullWidthSummary}>
        <ResearchRelationshipSummary domain={model.domain} rows={model.semanticRows} />
      </div>
    </section>

    {futureInnovatorPreview ? <section className={styles.innovationPreview} aria-labelledby="future-innovator-preview-title">
      <header>
        <p>Data project 02 / Future Innovator Camp</p>
        <h4 id="future-innovator-preview-title">1st Place — Future Innovator Camp</h4>
        <p>Cool Ride combined a customizable helmet concept, product planning, and an investment pitch. The project received first prize and VND 5 million in programme funding.</p>
      </header>
      <ResearchFigure capability={futureInnovatorPreview} />
    </section> : null}
  </div>
}
