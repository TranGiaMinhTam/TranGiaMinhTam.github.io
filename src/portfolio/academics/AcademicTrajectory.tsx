import type { AcademicTrajectoryViewModel } from './academic.types'
import { AcademicEvidenceAction } from './AcademicEvidenceAction'
import { AcademicRelationshipSummary } from './AcademicRelationshipSummary'
import { AcademicStatus } from './AcademicStatus'
import styles from './AcademicEvidence.module.css'

const scholarshipSchools: Readonly<Record<string, string>> = {
  'evidence-worthgate-scholarship': 'Worthgate School',
  'evidence-borsworth-scholarship': 'Bosworth Independent School',
}

export function AcademicTrajectory({ model }: Readonly<{ model: AcademicTrajectoryViewModel }>) {
  return <article className={styles.trajectory} data-testid="academic-trajectory-body">
    <div className={styles.strata}>
      {model.strata.map((stratum, index) => <article className={styles.stratum} key={stratum.id} aria-labelledby={`${stratum.id}-title`}>
        <div className={styles.stratumIndex} aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
        <div className={styles.programCell}>
          <AcademicStatus status={stratum.status} />
          <p className={styles.period}>{stratum.period}</p>
          <h3 id={`${stratum.id}-title`}>{stratum.program}</h3>
          <p className={styles.institution}>{stratum.institution}</p>
        </div>
        <div className={styles.subjectCell}>
          <p className={styles.cellLabel}>Subject field</p>
          <p>{stratum.subjectFocus}</p>
        </div>
        <div className={styles.resultsCell}>
          <p className={styles.cellLabel}>Academic record</p>
          <ul>{stratum.facts.map((fact) => <li key={fact.id} data-fact-kind={fact.kind}>{fact.label}</li>)}</ul>
        </div>
        {(stratum.recognitions.length > 0 || stratum.transcript) && <div className={styles.connectionCell}>
          <p className={styles.cellLabel}>Evidence connections</p>
          {stratum.recognitions.map((recognition) => <div className={styles.recognition} key={recognition.id}>
            <span>Scholarship offer</span>
            <strong>{recognition.label}</strong>
            {scholarshipSchools[recognition.evidence.evidence.id] ? <p>{scholarshipSchools[recognition.evidence.evidence.id]}</p> : null}
            <AcademicEvidenceAction capability={recognition.evidence} label="Open offer evidence" />
          </div>)}
          {stratum.transcript && <AcademicEvidenceAction capability={stratum.transcript} label="Open academic transcript" />}
        </div>}
      </article>)}
    </div>

    <AcademicRelationshipSummary rows={model.semanticRows} />
  </article>
}
