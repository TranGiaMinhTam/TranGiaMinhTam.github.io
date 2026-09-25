import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { parseEvidenceBundle, serializeEvidenceBundle } from './evidenceBundle'
import { assessResponseHeaders } from './headerAssessment'
import { gateFindingArbitrary, requirementResultArbitrary } from './releaseArbitraries'
import type { IntegratedEvidenceBundle } from './release.types'
import { decideRelease, normalizeRequirementResults } from './releaseDecision'

const seed = 6062026
const headers = assessResponseHeaders('https://portfolio.example/', {
  'content-security-policy': "default-src 'self'",
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'referrer-policy': 'strict-origin-when-cross-origin',
})

describe('release properties', () => {
  it('normalization is idempotent and order independent', () => {
    fc.assert(fc.property(fc.array(requirementResultArbitrary, { maxLength: 30 }), (results) => {
      const normalized = normalizeRequirementResults(results)
      expect(normalizeRequirementResults(normalized)).toEqual(normalized)
      expect(normalizeRequirementResults([...results].reverse())).toEqual(normalized)
    }), { seed, numRuns: 120 })
  })

  it('adding a blocking finding can never improve an outcome', () => {
    fc.assert(fc.property(fc.array(requirementResultArbitrary, { maxLength: 20 }), gateFindingArbitrary, (results, finding) => {
      const expectedRequirementIds = [...new Set(results.map(({ requirementId }) => requirementId))]
      const baseline = decideRelease({ expectedRequirementIds, results, findings: [], headerAssessment: headers, recovery: { isolated: true, exact: true, findings: [] } })
      const blocked = decideRelease({ expectedRequirementIds, results, findings: [{ ...finding, severity: 'blocking' }], headerAssessment: headers, recovery: { isolated: true, exact: true, findings: [] } })
      expect(blocked.outcome).toBe('blocked')
      if (baseline.outcome === 'blocked') expect(blocked.outcome).toBe(baseline.outcome)
    }), { seed, numRuns: 120 })
  })

  it('valid evidence bundles survive JSON round trips', () => {
    fc.assert(fc.property(fc.array(requirementResultArbitrary, { maxLength: 12 }), fc.array(gateFindingArbitrary, { maxLength: 8 }), (results, findings) => {
      const bundle: IntegratedEvidenceBundle = { schemaVersion: 1, generatedAt: '2026-09-25T00:00:00.000Z', toolVersions: { node: '20' }, seeds: [seed], results, findings, headerAssessment: headers, recovery: { isolated: true, exact: true, findings: [] } }
      expect(parseEvidenceBundle(serializeEvidenceBundle(bundle))).toEqual(bundle)
    }), { seed, numRuns: 120 })
  })
})
