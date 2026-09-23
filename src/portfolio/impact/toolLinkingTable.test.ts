import { describe, expect, it } from 'vitest'
import { sectionById } from '../model/sectionRegistry'
import { verifiedPortfolioSource } from '../model/verifiedPortfolioSource'
import { toolCategoryCatalog, toolLinkById, toolLinkingTable, type ToolLinkSpec } from './toolLinkingTable'

describe('U-06 closed Tool Linking Table', () => {
  it('classifies exactly the sixteen verified tool records with no duplicates', () => {
    const toolIds = verifiedPortfolioSource.records.filter(({ kind }) => kind === 'tool').map(({ id }) => id)
    expect(toolIds).toHaveLength(16)
    expect(toolLinkingTable).toHaveLength(16)
    expect(new Set(toolLinkingTable.map(({ id }) => id))).toHaveLength(16)
    expect(toolLinkById.size).toBe(16)
    for (const id of toolIds) expect(toolLinkById.has(id)).toBe(true)
  })

  it('defines the four categories in approved order', () => {
    expect(toolCategoryCatalog.map(({ id }) => id)).toEqual([
      'academic', 'research-data', 'laboratory', 'languages-interests',
    ])
  })

  it('classifies Vietnamese, Sustainability, and Debate as interest with no linked context', () => {
    const interests: readonly ToolLinkSpec[] = toolLinkingTable.filter((entry) => entry.classification === 'interest')
    expect(interests).toHaveLength(3)
    for (const entry of interests) expect(entry.linkedSectionId).toBeUndefined()
  })

  it('resolves every demonstrated tool to an existing section id', () => {
    const demonstrated: readonly ToolLinkSpec[] = toolLinkingTable.filter((entry) => entry.classification === 'demonstrated')
    expect(demonstrated).toHaveLength(13)
    for (const entry of demonstrated) {
      expect(entry.linkedSectionId).toBeDefined()
      expect(sectionById[entry.linkedSectionId!]).toBeDefined()
    }
  })

  it('never invents a numeric rating or proficiency field', () => {
    const serialized = JSON.stringify(toolLinkingTable)
    expect(serialized).not.toMatch(/rating|proficiency|level"\s*:\s*\d/i)
  })
})
