import fc from 'fast-check'
import type { EvidenceLocator, GateFinding, RequirementResult } from './release.types'

const requirementIdArbitrary = fc.tuple(fc.constantFrom('FR', 'NFR', 'PBT-R', 'SEC-R', 'U06-NFR'), fc.integer({ min: 1, max: 47 })).map(([prefix, value]) => `${prefix}-${String(value).padStart(3, '0')}`)
const pathSegmentArbitrary = fc.stringMatching(/^[a-z0-9][a-z0-9._-]{0,12}$/u)

export const evidenceLocatorArbitrary: fc.Arbitrary<EvidenceLocator> = fc.tuple(pathSegmentArbitrary, pathSegmentArbitrary).map(([directory, file]) => ({ path: `artifacts/${directory}/${file}.json`, description: `Evidence for ${file}` }))

export const requirementResultArbitrary: fc.Arbitrary<RequirementResult> = fc.record({
  requirementId: requirementIdArbitrary,
  status: fc.constantFrom('pass', 'fail', 'unavailable'),
  evidence: fc.array(evidenceLocatorArbitrary, { minLength: 1, maxLength: 3 }),
})

export const gateFindingArbitrary: fc.Arbitrary<GateFinding> = fc.record({
  code: fc.stringMatching(/^U06-[A-Z][A-Z0-9-]{1,20}$/u),
  severity: fc.constantFrom('info', 'warning', 'blocking'),
  message: fc.string({ minLength: 1, maxLength: 80 }).filter((value) => !/[\u0000-\u001f\u007f]/u.test(value)),
})
