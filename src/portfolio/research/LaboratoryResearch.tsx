import { ContributionStatus } from './ContributionStatus'
import { ResearchEvidenceAction } from './ResearchEvidenceAction'
import { ResearchFigure } from './ResearchFigure'
import { ResearchRelationshipSummary } from './ResearchRelationshipSummary'
import type { LaboratoryResearchViewModel } from './research.types'
import styles from './ResearchData.module.css'

const relationshipFor = (model: LaboratoryResearchViewModel, targetId: string) =>
  model.relationships.find((relationship) => relationship.targetId === targetId)?.id

export function LaboratoryResearch({ model }: Readonly<{ model: LaboratoryResearchViewModel }>) {
  const figure = model.evidence.find(({ evidence }) => evidence.full.mediaKind === 'image')
  return <div className={styles.laboratoryField} data-testid="laboratory-research-body">
    <header className={styles.specimenLabel}>
      <p>Specimen / cashew testa</p>
      <h3>{model.question}</h3>
      <p>{model.context}</p>
      <ContributionStatus contribution={model.contribution} />
    </header>

    <div className={styles.bench} aria-label="Specimen-to-assay laboratory sequence">
      <p className={styles.axisLabel}>Material → extraction → assay → prototype boundary</p>
      <ol>{model.methods.map((method, index) => <li
        key={method.id}
        data-visual-relationship={relationshipFor(model, method.id)}
        data-prototype-boundary={index === model.methods.length - 1 || undefined}
      >
        <span>Station {index + 1}</span>
        <strong>{method.label}</strong>
        {index === model.methods.length - 1 ? <small>Prototype boundary · no outcome inferred</small> : null}
      </li>)}</ol>
    </div>

    <div className={styles.benchNotes}>
      <div>
        <p>Laboratory context</p>
        <ul>{model.tools.map((tool) => <li key={tool.id} data-visual-relationship={relationshipFor(model, tool.id)}>{tool.label}</li>)}</ul>
      </div>
      <p className={styles.timeBand} data-visual-relationship={relationshipFor(model, model.time.id)}><strong>Study period</strong> {model.time.label}</p>
    </div>

    <div className={styles.evidenceStrip} aria-label="Laboratory research evidence">
      {model.evidence.map((capability) => <div key={capability.id} data-visual-relationship={relationshipFor(model, capability.id)}>
        <ResearchEvidenceAction capability={capability} group={figure ? [figure] : undefined} />
      </div>)}
    </div>
    {figure ? <ResearchFigure capability={figure} group={[figure]} /> : null}
    <ResearchRelationshipSummary domain={model.domain} rows={model.semanticRows} />
  </div>
}
