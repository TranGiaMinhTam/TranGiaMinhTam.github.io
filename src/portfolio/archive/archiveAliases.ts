import type { CanonicalAssetId, ContentHash } from './archive.types'

export type ReviewedArchiveAlias = Readonly<{
  canonicalId: CanonicalAssetId
  contentHashes: readonly ContentHash[]
  relationship: 'alternate-file-representation' | 'curated-export' | 'source-export'
}>

// Exact byte duplicates are grouped automatically. No non-identical equivalence
// declaration has enough reviewed evidence yet, so none is guessed here.
export const archiveAliases: readonly ReviewedArchiveAlias[] = Object.freeze([])
