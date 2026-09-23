import { describe, expect, it } from 'vitest'
import { evidenceManifest } from './evidenceManifest'
import { buildPortfolioIndexes } from './indexes'
import { selectSectionRecords } from './selectors'
import { verifiedPortfolioSource } from './verifiedPortfolioSource'

describe('two-times structural growth', () => {
  it('keeps indexed lookup and deterministic selector ordering independent of volume', () => {
    const doubledRecords = [...verifiedPortfolioSource.records, ...verifiedPortfolioSource.records.map((item) => ({ ...item, id: `${item.id}-copy` as typeof item.id, order: item.order + 100 }))]
    const doubledEvidence = [...evidenceManifest, ...evidenceManifest.map((item) => ({ ...item, id: `${item.id}-copy` as typeof item.id }))]
    const indexes = buildPortfolioIndexes(doubledRecords, verifiedPortfolioSource.relationships, doubledEvidence)
    expect(indexes.content.index.size).toBe(doubledRecords.length)
    expect(indexes.evidence.index.size).toBe(doubledEvidence.length)
    expect(indexes.content.duplicateKeys).toEqual([])
    const tools = selectSectionRecords({ ...verifiedPortfolioSource, records: doubledRecords }, 'tools')
    expect(tools.map(({ order }) => order)).toEqual([...tools.map(({ order }) => order)].sort((a, b) => a - b))
  })
})
