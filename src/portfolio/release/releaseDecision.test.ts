import { describe, expect, it } from 'vitest'
import { assessResponseHeaders } from './headerAssessment'
import { decideRelease, normalizeRequirementResults } from './releaseDecision'

const compliantHeaders = assessResponseHeaders('https://portfolio.example/', {
  'Content-Security-Policy': "default-src 'self'; object-src 'none'",
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
})

describe('decideRelease', () => {
  it('returns candidate-ready only for complete passing evidence, compliant headers, and exact recovery', () => {
    expect(decideRelease({
      expectedRequirementIds: ['FR-036'],
      results: [{ requirementId: 'FR-036', status: 'pass', evidence: [{ path: 'artifacts/u06/result.json', description: 'Integrated result' }] }],
      findings: [],
      headerAssessment: compliantHeaders,
      recovery: { isolated: true, exact: true, findings: [] },
    }).outcome).toBe('candidate-ready')
  })

  it('returns deploy-not-authorized when the only unmet gate is production headers', () => {
    const decision = decideRelease({
      expectedRequirementIds: ['SEC-R01'],
      results: [{ requirementId: 'SEC-R01', status: 'pass', evidence: [{ path: 'artifacts/u06/headers.json', description: 'Observed headers' }] }],
      findings: [],
      headerAssessment: assessResponseHeaders('https://example.github.io/', {}),
      recovery: { isolated: true, exact: true, findings: [] },
    })
    expect(decision).toMatchObject({ outcome: 'deploy-not-authorized', complete: true })
  })

  it('fails closed for unavailable or duplicate results', () => {
    const result = { requirementId: 'FR-038', status: 'unavailable' as const, evidence: [{ path: 'artifacts/u06/unavailable.json', description: 'Unavailable evidence' }] }
    const decision = decideRelease({ expectedRequirementIds: ['FR-038'], results: [result, result], findings: [], headerAssessment: compliantHeaders, recovery: { isolated: true, exact: true, findings: [] } })
    expect(decision.outcome).toBe('blocked')
    expect(decision.duplicateRequirementIds).toEqual(['FR-038'])
  })

  it('normalizes the shrunk duplicate-ID counterexample independently of input order', () => {
    const first = { requirementId: 'FR-002', status: 'pass' as const, evidence: [{ path: 'artifacts/a/a.json', description: 'Evidence for a' }] }
    const second = { requirementId: 'FR-002', status: 'pass' as const, evidence: [{ path: 'artifacts/0/a.json', description: 'Evidence for a' }] }
    expect(normalizeRequirementResults([first, second])).toEqual(normalizeRequirementResults([second, first]))
  })
})
