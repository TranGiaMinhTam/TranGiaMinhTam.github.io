import { describe, expect, it } from 'vitest'
import { sectionRegistry } from './sectionRegistry'
import { aggregateFindings, validateFoundation } from './validation'

describe('foundation validation', () => {
  it('returns deterministic findings from every rule family', () => {
    const context = {
      recoveryVerified: false, identityName: 'Former Owner', sectionIds: ['home'], duplicateContentIds: ['duplicate'],
      unsafeEvidencePaths: ['src/assets/minh-tam/source/private.pdf'], invalidRelationships: ['missing-target'],
      visualizationValid: false, uiSemanticsValid: false, boundaryValid: false,
      javascriptBytes: 460801, cssBytes: 76801, integrationStatic: false,
    } as const
    const first = validateFoundation(context)
    const second = validateFoundation(context)
    expect(first).toEqual(second)
    expect(new Set(first.findings.map(({ code }) => code.slice(0, 3)))).toEqual(new Set(['REC', 'CNT', 'SEC', 'EVD', 'DRV', 'VIS', 'UI-', 'BND', 'PER', 'INT']))
    expect(first.canProceed).toBe(false)
  })

  it('de-duplicates, normalizes, and orders errors before warnings', () => {
    const repeated = { code: 'CNT-007' as const, severity: 'warning' as const, target: ' a\\b ', message: 'Optional fact omitted.', resolution: 'Review if needed.' }
    const error = { code: 'CNT-001' as const, severity: 'error' as const, target: 'identity', message: 'Wrong identity.', resolution: 'Correct it.' }
    expect(aggregateFindings([repeated, error, repeated])).toEqual({ findings: [error, { ...repeated, target: 'a/b' }], counts: { errors: 1, warnings: 1 }, canProceed: false })
  })

  it('permits a valid static foundation while preserving explicit optional omissions', () => {
    const report = validateFoundation({ recoveryVerified: true, identityName: 'TRAN GIA MINH TAM', sectionIds: sectionRegistry.map(({ id }) => id), integrationStatic: true })
    expect(report).toEqual({ findings: [], counts: { errors: 0, warnings: 0 }, canProceed: true })
  })
})
