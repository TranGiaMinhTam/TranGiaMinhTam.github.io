import { EvidenceAction } from '../shared/EvidenceAction'
import type { ReconciledResumeClaim, ResumeSectionGroup } from './resume.types'
import styles from './ResumeContent.module.css'

function ResumeClaim({ claim }: Readonly<{ claim: ReconciledResumeClaim }>) {
  return <li className={styles.claim} data-resume-claim={claim.id}>
    <article aria-labelledby={`${claim.id}-title`}>
      <header className={styles.claimHeader}>
        <div>
          {claim.period ? <p className={styles.period}>{claim.period}</p> : null}
          <h4 id={`${claim.id}-title`}>{claim.title}</h4>
        </div>
      </header>
      <p className={styles.summary}>{claim.summary}</p>
      {claim.evidence.length > 0 ? <div className={styles.evidence} aria-label={`Evidence for ${claim.title}`}>
        {claim.evidence.map((item) => <EvidenceAction
          className={styles.evidenceAction}
          evidence={item}
          key={item.id}
        />)}
      </div> : null}
    </article>
  </li>
}

export function ResumeContentGroup({ group }: Readonly<{ group: ResumeSectionGroup }>) {
  if (group.claims.length === 0) return null

  return <section
    className={styles.group}
    aria-labelledby={`resume-group-${group.sectionId}`}
    data-testid={`resume-content-${group.sectionId}`}
  >
    <header className={styles.groupHeader}>
      <p>Selected experience</p>
      <h3 id={`resume-group-${group.sectionId}`}>{group.label}</h3>
      <p>Additional background and achievements connected to this section.</p>
    </header>
    <ul className={styles.claims}>
      {group.claims.map((claim) => <ResumeClaim claim={claim} key={claim.id} />)}
    </ul>
  </section>
}
