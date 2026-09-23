import { ContributionStatus } from './ContributionStatus'
import { ResearchEvidenceAction } from './ResearchEvidenceAction'
import { ResearchFigure } from './ResearchFigure'
import { ResearchRelationshipSummary } from './ResearchRelationshipSummary'
import type { ComputationalProjectViewModel } from './research.types'
import styles from './ResearchData.module.css'

const relationshipFor = (model: ComputationalProjectViewModel, targetId: string) =>
  model.relationships.find((relationship) => relationship.targetId === targetId)?.id

export function ComputationalProjects({ model }: Readonly<{ model: ComputationalProjectViewModel }>) {
  const figures = model.evidence.filter(({ evidence }) => evidence.full.mediaKind === 'image')
  return <div className={styles.computationalField} data-testid="computational-projects-body">
    <header className={styles.domainHeader}>
      <p>In silico study / ordered workflow</p>
      <h3>{model.question}</h3>
      <p>{model.context}</p>
      <ContributionStatus contribution={model.contribution} />
    </header>

    <div className={styles.pipeline} aria-label="Computational method pipeline">
      <p className={styles.axisLabel}>Input → preparation → screening → interpretation</p>
      <ol>{model.methods.map((method, index) => <li
        key={method.id}
        data-visual-relationship={relationshipFor(model, method.id)}
      >
        <span>{String(index + 1).padStart(2, '0')}</span>
        <strong>{method.label}</strong>
      </li>)}</ol>
    </div>

    <aside className={styles.toolAnnotations} aria-label="Computational tools and context">
      <p>Tool annotations</p>
      <ul>{model.tools.map((tool) => <li key={tool.id} data-visual-relationship={relationshipFor(model, tool.id)}>{tool.label}</li>)}</ul>
      <p className={styles.timeBand} data-visual-relationship={relationshipFor(model, model.time.id)}><strong>Time band</strong> {model.time.label}</p>
    </aside>

    <div className={styles.evidenceTerminal} aria-label="Computational project evidence">
      <p>Evidence terminals</p>
      {model.evidence.map((capability) => <div key={capability.id} data-visual-relationship={relationshipFor(model, capability.id)}>
        <ResearchEvidenceAction capability={capability} />
      </div>)}
    </div>
    {figures.length > 0 ? <div className={styles.researchGallery} aria-label="2026 protein docking project visuals">
      {figures.map((figure) => <ResearchFigure capability={figure} key={figure.id} />)}
    </div> : null}
    <ResearchRelationshipSummary domain={model.domain} rows={model.semanticRows} />
  </div>
}
