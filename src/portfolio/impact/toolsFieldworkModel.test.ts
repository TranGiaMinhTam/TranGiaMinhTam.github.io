import { describe, expect, it } from 'vitest'
import { contentId, evidenceId, type ContentRecord, type SectionId, type VerifiedPortfolioSource } from '../model/portfolio.types'
import { verifiedPortfolioSource } from '../model/verifiedPortfolioSource'
import { toolLinkById, type ToolLinkSpec } from './toolLinkingTable'
import { assembleToolsFieldwork, buildActivityGroups, buildToolCategories } from './toolsFieldworkModel'

const withRecords = (records: VerifiedPortfolioSource['records']): VerifiedPortfolioSource => ({ ...verifiedPortfolioSource, records })

describe('assembleToolsFieldwork', () => {
  it('assembles exact tool categories and activity groups deterministically', () => {
    const first = assembleToolsFieldwork(verifiedPortfolioSource)
    const second = assembleToolsFieldwork(verifiedPortfolioSource)
    expect(first).toEqual(second)
    expect(first.ok).toBe(true)
    if (!first.ok) throw new Error('Expected accepted U-06 selection.')

    expect(first.value.tools.categories.map(({ id, count }) => [id, count])).toEqual([
      ['academic', 4], ['research-data', 4], ['laboratory', 4], ['languages-interests', 4],
    ])
    expect(first.value.tools.semanticGroups.flatMap(({ entries }) => entries)).toHaveLength(16)
    expect(first.value.fieldworkLeadership.groups.map(({ kind, count }) => [kind, count])).toEqual([
      ['fieldwork', 1], ['leadership', 3],
    ])
    expect(first.value.fieldworkLeadership.semanticGroups.flatMap(({ entries }) => entries)).toHaveLength(4)
    expect(first.value.tools.semanticGroups.map(({ id, label, count, order }) => ({ id, label, count, order }))).toEqual(
      first.value.tools.categories.map(({ id, label, count, order }) => ({ id, label, count, order })),
    )
    expect(first.value.fieldworkLeadership.semanticGroups.map(({ kind, label, count, order }) => ({ kind, label, count, order }))).toEqual(
      first.value.fieldworkLeadership.groups.map(({ kind, label, count, order }) => ({ kind, label, count, order })),
    )
  })

  it('never invents a numeric proficiency rating anywhere in the accepted output', () => {
    const result = assembleToolsFieldwork(verifiedPortfolioSource)
    expect(result.ok).toBe(true)
    expect(JSON.stringify(result)).not.toMatch(/rating|proficiency|"level"\s*:\s*\d/i)
  })

  it('classifies Vietnamese, Sustainability, and Debate as interest and English/Biology as demonstrated', () => {
    const result = assembleToolsFieldwork(verifiedPortfolioSource)
    expect(result.ok).toBe(true)
    if (!result.ok) throw new Error('Expected accepted U-06 selection.')
    const byTitle = new Map(result.value.tools.categories.flatMap((category) => category.tools.map((tool) => [tool.title, tool])))
    expect(byTitle.get('Vietnamese')?.classification).toBe('interest')
    expect(byTitle.get('Sustainability')?.classification).toBe('interest')
    expect(byTitle.get('Debate')?.classification).toBe('interest')
    expect(byTitle.get('English')?.classification).toBe('demonstrated')
    expect(byTitle.get('Biology')?.classification).toBe('demonstrated')
    expect(byTitle.get('Biology')?.context?.sectionId).toBe('academic-trajectory')
    expect(result.value.tools.categories.at(-1)?.tools.map(({ title }) => title)).toEqual(['English', 'Vietnamese', 'Sustainability', 'Debate'])
  })

  it('fails closed for a missing tool, a duplicate activity, and a tool absent from the linking table', () => {
    const toolId = contentId('tool-1-1')
    const missing = assembleToolsFieldwork(withRecords(verifiedPortfolioSource.records.filter(({ id }) => id !== toolId)))
    expect(missing.ok).toBe(false)
    expect(missing.findings.map(({ code }) => code)).toContain('U06-TOOL-CARDINALITY')

    const duplicateActivity = withRecords([...verifiedPortfolioSource.records, verifiedPortfolioSource.records.find(({ kind }) => kind === 'fieldwork')!])
    const duplicate = assembleToolsFieldwork(duplicateActivity)
    expect(duplicate.ok).toBe(false)
    expect(duplicate.findings.map(({ code }) => code)).toContain('U06-ACTIVITY-DUPLICATE')

    const unmappedTool: ContentRecord = { ...verifiedPortfolioSource.records.find(({ id }) => id === toolId)!, id: contentId('tool-unmapped') }
    const unmapped = assembleToolsFieldwork(withRecords([...verifiedPortfolioSource.records, unmappedTool]))
    expect(unmapped.ok).toBe(false)
    expect(unmapped.findings.map(({ code }) => code)).toContain('U06-TOOL-UNMAPPED')
  })

  it('fails closed for an activity record missing required fields', () => {
    const activityId = verifiedPortfolioSource.records.find(({ kind }) => kind === 'leadership')!.id
    const malformed = assembleToolsFieldwork(withRecords(verifiedPortfolioSource.records.map((record) =>
      record.id === activityId ? { ...record, period: undefined } : record,
    )))
    expect(malformed.ok).toBe(false)
    expect(malformed.findings.map(({ code }) => code)).toContain('U06-ACTIVITY-FIELD')
  })

  it('fails closed for an empty required tool field and localizes an unresolved reserved evidence id', () => {
    const tool = verifiedPortfolioSource.records.find(({ kind }) => kind === 'tool')!
    const malformed = assembleToolsFieldwork(withRecords(verifiedPortfolioSource.records.map((record) =>
      record.id === tool.id ? { ...record, title: '' } : record,
    )))
    expect(malformed.ok).toBe(false)
    expect(malformed.findings.map(({ code }) => code)).toContain('U06-TOOL-FIELD')

    const unresolved = assembleToolsFieldwork(withRecords(verifiedPortfolioSource.records.map((record) =>
      record.id === tool.id ? { ...record, evidenceIds: [evidenceId('evidence-not-published')] } : record,
    )))
    expect(unresolved.ok).toBe(true)
    expect(unresolved.findings.map(({ code }) => code)).toContain('U06-EVIDENCE-UNRESOLVED')
    if (!unresolved.ok) throw new Error('Expected optional evidence failure to preserve accepted content.')
    expect(unresolved.value.tools.categories.flatMap(({ tools }) => tools).find(({ id }) => id === tool.id)?.evidence).toEqual([])
  })

  it('fails closed when a required activity is missing and preserves a broken context as an optional finding', () => {
    const activityId = verifiedPortfolioSource.records.find(({ kind }) => kind === 'fieldwork')!.id
    const missing = assembleToolsFieldwork(withRecords(verifiedPortfolioSource.records.filter(({ id }) => id !== activityId)))
    expect(missing.ok).toBe(false)
    expect(missing.findings.map(({ code }) => code)).toContain('U06-ACTIVITY-CARDINALITY')

    const firstTool = verifiedPortfolioSource.records.find(({ kind }) => kind === 'tool')!
    const brokenLinks = new Map(toolLinkById)
    brokenLinks.set(firstTool.id, {
      ...toolLinkById.get(firstTool.id)!,
      linkedSectionId: 'removed-section' as SectionId,
    })
    const findings: Parameters<typeof buildToolCategories>[1] = []
    const result = buildToolCategories(verifiedPortfolioSource, findings, brokenLinks)
    expect(result.categories.flatMap(({ tools }) => tools).find(({ id }) => id === firstTool.id)?.context).toBeUndefined()
    expect(findings.map(({ code }) => code)).toContain('U06-TOOL-CONTEXT-UNRESOLVED')
  })

  it('processes thirty-two tool records and eight activity records through linear indexed passes', () => {
    const capacityLinks = new Map<ContentRecord['id'], ToolLinkSpec>(
      Array.from({ length: 32 }, (_, index) => {
        const id = contentId(`capacity-tool-${index + 1}`)
        return [id, {
          id, categoryId: (['academic', 'research-data', 'laboratory', 'languages-interests'] as const)[index % 4],
          classification: index % 2 === 0 ? 'demonstrated' : 'interest',
          ...(index % 2 === 0 ? { linkedSectionId: 'academic-trajectory', linkedLabel: 'Capacity link' } : {}),
          order: index + 1,
        }]
      }),
    )
    const capacityToolRecords: ContentRecord[] = Array.from({ length: 32 }, (_, index) => ({
      id: contentId(`capacity-tool-${index + 1}`), kind: 'tool', title: `Capacity Tool ${index + 1}`, summary: '',
      facts: { category: 'Capacity' }, provenanceIds: [], evidenceIds: [], status: 'verified', order: index + 1,
    }))
    const categoryCatalog = [
      { id: 'academic', label: 'Academic', order: 1 },
      { id: 'research-data', label: 'Research & Data', order: 2 },
      { id: 'laboratory', label: 'Laboratory', order: 3 },
      { id: 'languages-interests', label: 'Languages & Interests', order: 4 },
    ] as const
    const first = buildToolCategories(withRecords(capacityToolRecords), [], capacityLinks, categoryCatalog)
    const second = buildToolCategories(withRecords(capacityToolRecords), [], capacityLinks, categoryCatalog)
    expect(first).toEqual(second)
    expect(first.categories.reduce((sum, category) => sum + category.count, 0)).toBe(32)
    expect(first.semanticGroups.flatMap(({ entries }) => entries)).toHaveLength(32)

    const capacityActivityRecords: ContentRecord[] = Array.from({ length: 8 }, (_, index) => ({
      id: contentId(`capacity-activity-${index + 1}`), kind: index % 2 === 0 ? 'fieldwork' : 'leadership',
      title: `Activity ${index + 1}`, summary: 'Organization', period: '2024-2025',
      facts: { details: ['Point one', 'Point two'] }, provenanceIds: [], evidenceIds: [], status: 'verified', order: index + 1,
    }))
    const activityFirst = buildActivityGroups(withRecords(capacityActivityRecords), [], 8)
    const activitySecond = buildActivityGroups(withRecords(capacityActivityRecords), [], 8)
    expect(activityFirst).toEqual(activitySecond)
    expect(activityFirst.groups.reduce((sum, group) => sum + group.count, 0)).toBe(8)
    expect(activityFirst.semanticGroups.flatMap(({ entries }) => entries)).toHaveLength(8)
  })

  it('confirms every real tool resolves through the closed linking table', () => {
    expect(toolLinkById.size).toBe(16)
  })

  it('keeps former-owner, raw, and award/gallery legacy content outside accepted output', () => {
    const result = assembleToolsFieldwork(verifiedPortfolioSource)
    expect(result.ok).toBe(true)
    expect(JSON.stringify(result)).not.toMatch(/wordpress|former-owner|raw archive|gallery|vsic|icpc|wico/i)
    if (!result.ok) throw new Error('Expected accepted U-06 selection.')
    expect(result.value.tools.categories.flatMap(({ tools }) => tools).every(({ evidence }) => evidence.length === 0)).toBe(true)
    expect(result.value.fieldworkLeadership.groups.flatMap(({ records }) => records).every(({ evidence }) => evidence.length === 0)).toBe(true)
  })
})
