import resumePdf from '../../assets/documents/Tran-Gia-Minh-Tam-Resume.pdf'
import { evidenceManifest } from '../model/evidenceManifest'
import { verifiedPortfolioSource } from '../model/verifiedPortfolioSource'
import type { MastheadResumeAction } from '../shell/shell.types'
import { reviewedResumeCategories, reviewedResumeClaims } from './resumeClaims'
import { reconcileResumeClaims } from './resumeReconciliation'
import { createResumeDownload } from './resumeSource'
import type { ResumeContentResult } from './resume.types'

export const approvedResumeIntegrity = Object.freeze({
  bytes: 113775,
  sha256: '8de5fc42ca8c443a7dcad6daa2766d7cd5f3a596369a463e54a74b101ec49282',
} as const)

export const resumeDownload = createResumeDownload(resumePdf)

const reconciled = reconcileResumeClaims(reviewedResumeClaims, verifiedPortfolioSource, evidenceManifest, reviewedResumeCategories)

export const resumeContentSelection: ResumeContentResult = reconciled.findings.length > 0
  ? Object.freeze({ ok: false, findings: reconciled.findings })
  : Object.freeze({
      ok: true,
      value: Object.freeze({
        claims: reconciled.claims,
        sections: reconciled.sections,
        download: resumeDownload,
        categoryCount: reviewedResumeCategories.length,
        primaryCount: reconciled.claims.filter(({ presentation }) => presentation === 'primary').length,
        referenceOnlyCount: reconciled.claims.filter(({ presentation }) => presentation === 'reference-only').length,
      }),
      findings: Object.freeze([] as const),
    })

export const toMastheadResumeAction = (download = resumeDownload): MastheadResumeAction => Object.freeze({
  href: download.source.href,
  label: 'Download resume',
  download: download.filename,
})
