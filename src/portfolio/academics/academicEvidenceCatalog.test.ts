import { describe, expect, it } from 'vitest'
import { evidenceManifest } from '../model/evidenceManifest'
import { academicProgramSpecs, evidenceEligibility, evidenceGroupCatalog } from './academicEvidenceCatalog'

describe('U-05 closed academic and evidence catalogs', () => {
  it('defines exactly two programs with explicit current and completed status', () => {
    expect(academicProgramSpecs.map(({ id, status }) => [id, status])).toEqual([
      ['academic-1', 'in-progress'],
      ['academic-2', 'completed'],
    ])
    const factLabels = academicProgramSpecs.reduce<string[]>(
      (labels, program) => [...labels, ...program.facts.map(({ label }) => label)],
      [],
    )
    expect(factLabels).toEqual(expect.arrayContaining([
      'GPA 9.0/10 in Grade 10',
      'Grade 11 AS-level: AAA',
      'Grade 12 Semester 1 is in progress',
      'IELTS 7.0 (September 2025)',
      'A* in Mathematics',
    ]))
  })

  it('allows exactly eight canonical evidence records in three ordered groups', () => {
    expect(evidenceEligibility).toHaveLength(8)
    expect(new Set(evidenceEligibility.map(({ id }) => id))).toHaveLength(8)
    expect(evidenceGroupCatalog.map(({ id }) => id)).toEqual([
      'scholarships', 'research-outputs', 'project-visuals',
    ])
    expect(evidenceEligibility.map(({ id }) => id)).not.toContain('evidence-profile-portrait')
    expect(evidenceEligibility.map(({ id }) => id)).not.toContain('evidence-academic-transcript')
    expect(evidenceEligibility.map(({ id }) => id)).not.toContain('evidence-docking-research-completion')
    expect(evidenceEligibility.every(({ id }) => evidenceManifest.some((record) => record.id === id))).toBe(true)
  })
})
