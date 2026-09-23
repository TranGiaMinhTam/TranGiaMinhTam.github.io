// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { createFinding, createValidationReport, normalizeFindings } from '../findings.mjs'
import { normalizeRepositoryPath, resolveWithinRoot } from '../paths.mjs'
import { serializeCanonicalJson } from '../evidence.mjs'

describe('source-governance path policy', () => {
  it('normalizes safe repository paths', () => {
    expect(normalizeRepositoryPath('src/assets/item.pdf')).toBe('src/assets/item.pdf')
    expect(normalizeRepositoryPath('src\\assets\\item.pdf')).toBe('src/assets/item.pdf')
  })

  it.each(['/absolute.pdf', '../escape.pdf', 'safe/../../escape.pdf', 'bad\u0000name.pdf'])(
    'rejects unsafe path %s',
    (candidate) => expect(() => normalizeRepositoryPath(candidate)).toThrow(),
  )

  it('confines resolved targets to their root', () => {
    expect(resolveWithinRoot('/workspace/root', 'nested/item.pdf').resolved).toBe('/workspace/root/nested/item.pdf')
  })
})

describe('source-governance findings and canonical evidence', () => {
  it('deduplicates, orders, and gates findings deterministically', () => {
    const warning = createFinding({ code: 'U01-WARN', severity: 'warning', target: 'b', message: 'Limited.', resolution: 'Review.' })
    const blocker = createFinding({ code: 'U01-BLOCK', target: 'a', message: 'Blocked.', resolution: 'Fix.' })
    expect(normalizeFindings([warning, blocker, blocker])).toEqual([blocker, warning])
    expect(createValidationReport([warning]).canProceed).toBe(true)
    expect(createValidationReport([blocker]).canProceed).toBe(false)
  })

  it('serializes object keys deterministically', () => {
    expect(serializeCanonicalJson({ z: 1, a: { y: 2, b: 3 } })).toBe('{\n  "a": {\n    "b": 3,\n    "y": 2\n  },\n  "z": 1\n}\n')
  })
})
