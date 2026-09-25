import { findingSeverities, requirementStatuses, type EvidenceLocator, type IntegratedEvidenceBundle } from './release.types'

const SAFE_PATH = /^(?!\/)(?![A-Za-z]:[\\/])(?!.*(?:^|[\\/])\.\.(?:[\\/]|$))[A-Za-z0-9._/\-]+$/u
const SAFE_DESCRIPTION = /^[^\u0000-\u001f\u007f]{1,240}$/u

export const isSafeEvidenceLocator = (locator: EvidenceLocator): boolean =>
  SAFE_PATH.test(locator.path) && !locator.path.startsWith('./') && SAFE_DESCRIPTION.test(locator.description)

export const validateEvidenceBundle = (value: unknown): value is IntegratedEvidenceBundle => {
  if (!value || typeof value !== 'object') return false
  const bundle = value as Partial<IntegratedEvidenceBundle>
  if (bundle.schemaVersion !== 1 || typeof bundle.generatedAt !== 'string' || Number.isNaN(Date.parse(bundle.generatedAt))) return false
  if (!bundle.toolVersions || typeof bundle.toolVersions !== 'object' || !Array.isArray(bundle.seeds) || !bundle.seeds.every(Number.isSafeInteger)) return false
  if (!Array.isArray(bundle.results) || !bundle.results.every((result) =>
    typeof result?.requirementId === 'string'
    && requirementStatuses.includes(result.status)
    && Array.isArray(result.evidence)
    && result.evidence.every(isSafeEvidenceLocator)
    && (result.status !== 'not-applicable' || typeof result.rationale === 'string'))) return false
  if (!Array.isArray(bundle.findings) || !bundle.findings.every((finding) => typeof finding?.code === 'string' && findingSeverities.includes(finding.severity) && typeof finding.message === 'string')) return false
  if (!bundle.headerAssessment || typeof bundle.headerAssessment.endpoint !== 'string' || !Array.isArray(bundle.headerAssessment.checks)) return false
  if (!bundle.recovery || typeof bundle.recovery.isolated !== 'boolean' || typeof bundle.recovery.exact !== 'boolean' || !Array.isArray(bundle.recovery.findings)) return false
  return true
}

export const serializeEvidenceBundle = (bundle: IntegratedEvidenceBundle): string => {
  if (!validateEvidenceBundle(bundle)) throw new TypeError('INVALID_EVIDENCE_BUNDLE')
  return `${JSON.stringify(bundle)}\n`
}

export const parseEvidenceBundle = (serialized: string): IntegratedEvidenceBundle => {
  const parsed: unknown = JSON.parse(serialized)
  if (!validateEvidenceBundle(parsed)) throw new TypeError('INVALID_EVIDENCE_BUNDLE')
  return parsed
}
