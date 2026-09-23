import { sectionRegistry } from './sectionRegistry'
import type { FoundationValidationContext, RuleCode, ValidationFinding } from './validation.types'

const finding = (code: RuleCode, target: string, message: string, resolution: string, severity: 'error' | 'warning' = 'error'): ValidationFinding => ({ code, severity, target, message, resolution })

export const validateRecovery = (context: FoundationValidationContext) => context.recoveryVerified === false
  ? [finding('REC-003', 'recovery', 'Recovery material is not verified.', 'Recreate and rehearse the recovery package.')]
  : []

export const validateContent = (context: FoundationValidationContext) => {
  const findings: ValidationFinding[] = []
  if (context.identityName !== undefined && context.identityName !== 'TRAN GIA MINH TAM') findings.push(finding('CNT-001', 'identity', 'Canonical identity is not Tran Gia Minh Tam.', 'Use only the approved Minh Tam source adapter.'))
  for (const id of context.duplicateContentIds ?? []) findings.push(finding('CNT-002', id, 'Content ID is duplicated.', 'Assign a unique stable content ID.'))
  return findings
}

export const validateSections = (context: FoundationValidationContext) => {
  if (!context.sectionIds) return []
  const expected = sectionRegistry.map(({ id }) => id)
  return JSON.stringify(context.sectionIds) === JSON.stringify(expected)
    ? []
    : [finding('SEC-001', 'section-registry', 'Section registry does not match the approved ten-section order.', 'Restore the exact approved registry.')]
}

export const validateEvidence = (context: FoundationValidationContext) => (context.unsafeEvidencePaths ?? []).map((path) =>
  finding('EVD-004', path, 'Evidence path is raw, private, or outside the publication boundary.', 'Publish only an explicit curated manifest entry.'),
)

export const validateDerivation = (context: FoundationValidationContext) => (context.invalidRelationships ?? []).map((id) =>
  finding('DRV-005', id, 'Relationship target cannot be resolved.', 'Remove the optional relationship or restore its required target.'),
)

export const validateVisualizationFacts = (context: FoundationValidationContext) => context.visualizationValid === false
  ? [finding('VIS-003', 'visualization', 'Informational visual and semantic summary are not equivalent.', 'Derive both representations from the same values.')]
  : []

export const validateUiFacts = (context: FoundationValidationContext) => context.uiSemanticsValid === false
  ? [finding('UI-001', 'semantic-primitives', 'Required native semantics are absent.', 'Restore the labelled native semantic contract.')]
  : []

export const validateBoundaryFacts = (context: FoundationValidationContext) => context.boundaryValid === false
  ? [finding('BND-001', 'src/portfolio', 'The isolated portfolio boundary contains a prohibited dependency.', 'Remove the prohibited import or selector.')]
  : []

export const validatePerformanceFacts = (context: FoundationValidationContext) => {
  const results: ValidationFinding[] = []
  if ((context.javascriptBytes ?? 0) > 460800) results.push(finding('PER-001', 'initial-javascript', 'Initial JavaScript exceeds 460,800 bytes.', 'Reduce the eager JavaScript graph.'))
  if ((context.cssBytes ?? 0) > 76800) results.push(finding('PER-002', 'initial-css', 'Initial CSS exceeds 76,800 bytes.', 'Reduce eager CSS.'))
  return results
}

export const validateIntegrationFacts = (context: FoundationValidationContext) => context.integrationStatic === false
  ? [finding('INT-001', 'runtime', 'Unexpected runtime integration was detected.', 'Keep U-01 local, static, and persistence-free.')]
  : []

export const foundationValidators = Object.freeze([
  validateRecovery, validateContent, validateSections, validateEvidence, validateDerivation,
  validateVisualizationFacts, validateUiFacts, validateBoundaryFacts, validatePerformanceFacts, validateIntegrationFacts,
])
