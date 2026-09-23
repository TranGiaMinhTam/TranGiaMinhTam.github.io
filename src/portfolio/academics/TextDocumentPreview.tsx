import type { TextDocumentCapability } from './academic.types'
import { AcademicEvidenceAction } from './AcademicEvidenceAction'
import styles from './AcademicEvidence.module.css'

export function TextDocumentPreview({ capability }: Readonly<{ capability: TextDocumentCapability }>) {
  return <div className={styles.documentPreview} data-testid={`document-preview-${capability.id}`}>
    <span className={styles.documentGlyph} aria-hidden="true">PDF</span>
    <div className={styles.documentCopy}>
      <p className={styles.itemKind}>{capability.evidence.kind.replace('-', ' ')}</p>
      <h4>{capability.evidence.title}</h4>
      <p>{capability.evidence.caption}</p>
    </div>
    <AcademicEvidenceAction capability={capability} label="Open full document" />
  </div>
}
