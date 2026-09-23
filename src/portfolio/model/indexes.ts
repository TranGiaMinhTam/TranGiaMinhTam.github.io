import type { ContentId, ContentRecord, EvidenceId, EvidenceRecord, RelationshipId, ContentRelationship } from './portfolio.types'

export type IndexResult<Key, Value> = Readonly<{
  index: ReadonlyMap<Key, Value>
  duplicateKeys: readonly Key[]
}>

export const buildUniqueIndex = <Key, Value>(values: readonly Value[], keyOf: (value: Value) => Key): IndexResult<Key, Value> => {
  const index = new Map<Key, Value>()
  const duplicateKeys: Key[] = []
  for (const value of values) {
    const key = keyOf(value)
    if (index.has(key)) duplicateKeys.push(key)
    else index.set(key, value)
  }
  return { index, duplicateKeys: Object.freeze(duplicateKeys) }
}

export const buildPortfolioIndexes = (
  records: readonly ContentRecord[],
  relationships: readonly ContentRelationship[],
  evidence: readonly EvidenceRecord[],
) => ({
  content: buildUniqueIndex<ContentId, ContentRecord>(records, (record) => record.id),
  relationships: buildUniqueIndex<RelationshipId, ContentRelationship>(relationships, (relationship) => relationship.id),
  evidence: buildUniqueIndex<EvidenceId, EvidenceRecord>(evidence, (record) => record.id),
})
