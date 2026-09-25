export const requirementStatuses = ['pass', 'fail', 'not-applicable', 'unavailable'] as const
export type RequirementStatus = (typeof requirementStatuses)[number]

export const findingSeverities = ['info', 'warning', 'blocking'] as const
export type FindingSeverity = (typeof findingSeverities)[number]

export type EvidenceLocator = Readonly<{
  path: string
  description: string
}>

export type RequirementResult = Readonly<{
  requirementId: string
  status: RequirementStatus
  evidence: readonly EvidenceLocator[]
  rationale?: string
}>

export type GateFinding = Readonly<{
  code: string
  severity: FindingSeverity
  message: string
  requirementId?: string
}>

export type HeaderName =
  | 'content-security-policy'
  | 'strict-transport-security'
  | 'x-content-type-options'
  | 'x-frame-options'
  | 'referrer-policy'

export type HeaderCheck = Readonly<{
  name: HeaderName
  observed: string | null
  passed: boolean
  reason: string
}>

export type HostHeaderAssessment = Readonly<{
  endpoint: string
  available: boolean
  checks: readonly HeaderCheck[]
  compliant: boolean
}>

export type RecoveryAssessment = Readonly<{
  isolated: boolean
  exact: boolean
  findings: readonly GateFinding[]
}>

export type IntegratedEvidenceBundle = Readonly<{
  schemaVersion: 1
  generatedAt: string
  toolVersions: Readonly<Record<string, string>>
  seeds: readonly number[]
  results: readonly RequirementResult[]
  findings: readonly GateFinding[]
  headerAssessment: HostHeaderAssessment
  recovery: RecoveryAssessment
}>

export type ReleaseOutcome = 'candidate-ready' | 'deploy-not-authorized' | 'blocked'

export type ReleaseDecision = Readonly<{
  outcome: ReleaseOutcome
  complete: boolean
  blockingFindings: readonly GateFinding[]
  missingRequirementIds: readonly string[]
  duplicateRequirementIds: readonly string[]
}>
