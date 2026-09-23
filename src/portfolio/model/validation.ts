import type { FoundationValidationContext, ValidationFinding, ValidationReport } from './validation.types'
import { foundationValidators } from './validators'

const severityRank = { error: 0, warning: 1 } as const
const normalizeTarget = (target: string) => target.trim().replaceAll('\\', '/').replace(/\/{2,}/g, '/')

export const aggregateFindings = (findings: readonly ValidationFinding[]): ValidationReport => {
  const unique = new Map<string, ValidationFinding>()
  for (const raw of findings) {
    const normalized = { ...raw, target: normalizeTarget(raw.target) }
    unique.set(`${normalized.severity}|${normalized.code}|${normalized.target}|${normalized.message}`, normalized)
  }
  const ordered = [...unique.values()].sort((a, b) =>
    severityRank[a.severity] - severityRank[b.severity] || a.code.localeCompare(b.code) || a.target.localeCompare(b.target),
  )
  const errors = ordered.filter(({ severity }) => severity === 'error').length
  return Object.freeze({ findings: Object.freeze(ordered), counts: Object.freeze({ errors, warnings: ordered.length - errors }), canProceed: errors === 0 })
}

export const validateFoundation = (context: FoundationValidationContext): ValidationReport =>
  aggregateFindings(foundationValidators.flatMap((validator) => validator(context)))
