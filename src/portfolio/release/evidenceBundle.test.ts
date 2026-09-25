import { describe, expect, it } from 'vitest'
import { assessResponseHeaders } from './headerAssessment'
import { isSafeEvidenceLocator, parseEvidenceBundle, serializeEvidenceBundle } from './evidenceBundle'
import type { IntegratedEvidenceBundle } from './release.types'

const bundle: IntegratedEvidenceBundle = {
  schemaVersion: 1,
  generatedAt: '2026-09-25T00:00:00.000Z',
  toolVersions: { node: '20.0.0' },
  seeds: [6062026],
  results: [{ requirementId: 'FR-036', status: 'pass', evidence: [{ path: 'artifacts/portfolio/u06/result.json', description: 'Result' }] }],
  findings: [],
  headerAssessment: assessResponseHeaders('https://example.test/', {}),
  recovery: { isolated: true, exact: true, findings: [] },
}

describe('evidenceBundle', () => {
  it('round-trips a valid schema-versioned bundle', () => {
    expect(parseEvidenceBundle(serializeEvidenceBundle(bundle))).toEqual(bundle)
  })

  it('rejects absolute and traversing evidence paths', () => {
    expect(isSafeEvidenceLocator({ path: '/Users/example/private.json', description: 'Unsafe' })).toBe(false)
    expect(isSafeEvidenceLocator({ path: '../private.json', description: 'Unsafe' })).toBe(false)
  })
})
