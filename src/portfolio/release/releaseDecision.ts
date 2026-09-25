import type { GateFinding, HostHeaderAssessment, RecoveryAssessment, ReleaseDecision, RequirementResult } from './release.types'

const uniqueSorted = (values: readonly string[]): readonly string[] => Object.freeze([...new Set(values)].sort())

export const normalizeRequirementResults = (results: readonly RequirementResult[]): readonly RequirementResult[] =>
  Object.freeze([...results]
    .map((result) => Object.freeze({ ...result, evidence: Object.freeze([...result.evidence].sort((a, b) => `${a.path}:${a.description}`.localeCompare(`${b.path}:${b.description}`))) }))
    .sort((a, b) => `${a.requirementId}:${a.status}:${JSON.stringify(a.evidence)}:${a.rationale ?? ''}`.localeCompare(`${b.requirementId}:${b.status}:${JSON.stringify(b.evidence)}:${b.rationale ?? ''}`)))

export const decideRelease = ({
  expectedRequirementIds,
  results,
  findings,
  headerAssessment,
  recovery,
}: Readonly<{
  expectedRequirementIds: readonly string[]
  results: readonly RequirementResult[]
  findings: readonly GateFinding[]
  headerAssessment: HostHeaderAssessment
  recovery: RecoveryAssessment
}>): ReleaseDecision => {
  const counts = new Map<string, number>()
  for (const result of results) counts.set(result.requirementId, (counts.get(result.requirementId) ?? 0) + 1)
  const missingRequirementIds = uniqueSorted(expectedRequirementIds.filter((requirementId) => !counts.has(requirementId)))
  const duplicateRequirementIds = uniqueSorted([...counts].filter(([, count]) => count !== 1).map(([requirementId]) => requirementId))
  const failedResults = results.filter(({ status }) => status === 'fail' || status === 'unavailable')
  const generatedFindings: GateFinding[] = [
    ...missingRequirementIds.map((requirementId) => ({ code: 'U06-MISSING-RESULT', severity: 'blocking' as const, message: 'Required terminal result is missing.', requirementId })),
    ...duplicateRequirementIds.map((requirementId) => ({ code: 'U06-DUPLICATE-RESULT', severity: 'blocking' as const, message: 'Requirement has more than one terminal result.', requirementId })),
    ...failedResults.map(({ requirementId, status }) => ({ code: status === 'fail' ? 'U06-REQUIREMENT-FAILED' : 'U06-REQUIRED-CHECK-UNAVAILABLE', severity: 'blocking' as const, message: 'Requirement did not pass.', requirementId })),
    ...(!recovery.isolated || !recovery.exact ? [{ code: 'U06-RECOVERY-INEXACT', severity: 'blocking' as const, message: 'Exact isolated recovery has not passed.' }] : []),
  ]
  const blockingFindings = Object.freeze([...findings, ...recovery.findings, ...generatedFindings].filter(({ severity }) => severity === 'blocking').sort((a, b) => `${a.code}:${a.requirementId ?? ''}`.localeCompare(`${b.code}:${b.requirementId ?? ''}`)))
  const complete = missingRequirementIds.length === 0 && duplicateRequirementIds.length === 0
  const outcome = blockingFindings.length > 0 ? 'blocked' : headerAssessment.compliant ? 'candidate-ready' : 'deploy-not-authorized'
  return Object.freeze({ outcome, complete, blockingFindings, missingRequirementIds, duplicateRequirementIds })
}
