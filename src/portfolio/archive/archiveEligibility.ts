import type {
  ArchiveEligibilityDecision,
  ArchiveEligibilityFinding,
  ArchiveEligibilityResult,
  CanonicalArchiveItem,
  CanonicalAssetId,
} from './archive.types'

const explicitlyExcludedIds = new Set<CanonicalAssetId>([
  'asset-0857163ebd922f5c0723' as CanonicalAssetId,
  'asset-1fa6103b2d5218d4582b' as CanonicalAssetId,
])

const narrativeIds = new Set<CanonicalAssetId>([
  'asset-949b0facaa575830d071' as CanonicalAssetId,
  'asset-d5561a78f6b611308cef' as CanonicalAssetId,
  'asset-02ed8286ffa69acd6cd0' as CanonicalAssetId,
])

const finding = (code: ArchiveEligibilityFinding['code'], target: string): ArchiveEligibilityFinding =>
  Object.freeze({ code, target })

export const classifyArchiveEligibility = (
  item: CanonicalArchiveItem,
): ArchiveEligibilityDecision => {
  if (explicitlyExcludedIds.has(item.id)) {
    return Object.freeze({ id: item.id, publication: 'excluded', reason: 'explicit-user-exclusion' })
  }
  return Object.freeze({
    id: item.id,
    publication: 'public',
    primaryDisposition: narrativeIds.has(item.id) ? 'narrative' : item.metadata.disposition,
  })
}

export const buildArchiveEligibility = (
  items: readonly CanonicalArchiveItem[],
): ArchiveEligibilityResult => {
  const decisions = items.map(classifyArchiveEligibility)
  const findings: ArchiveEligibilityFinding[] = []
  const seen = new Set<CanonicalAssetId>()

  for (const decision of decisions) {
    if (seen.has(decision.id)) findings.push(finding('ARCHIVE_ELIGIBILITY_DUPLICATE', decision.id))
    seen.add(decision.id)
  }
  for (const item of items) {
    if (!seen.has(item.id)) findings.push(finding('ARCHIVE_ELIGIBILITY_MISSING', item.id))
  }
  for (const id of [...explicitlyExcludedIds, ...narrativeIds]) {
    if (!items.some((item) => item.id === id)) findings.push(finding('ARCHIVE_ELIGIBILITY_UNKNOWN', id))
  }

  return Object.freeze({
    ok: findings.length === 0,
    decisions: Object.freeze(decisions),
    findings: Object.freeze(findings.sort((left, right) => left.code.localeCompare(right.code) || left.target.localeCompare(right.target))),
  })
}

export const isPublicArchiveDecision = (
  decision: ArchiveEligibilityDecision,
): decision is Extract<ArchiveEligibilityDecision, { publication: 'public' }> =>
  decision.publication === 'public'
