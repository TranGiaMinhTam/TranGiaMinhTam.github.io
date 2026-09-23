import { describe, expect, it } from 'vitest'
import { sectionRegistry } from '../model/sectionRegistry'
import { approvedResumeIntegrity, resumeContentSelection, resumeDownload, toMastheadResumeAction } from './resumeContentModel'
import { reviewedResumeCategories, reviewedResumeClaims } from './resumeClaims'

describe('reviewed resume content model', () => {
  it('admits the complete reviewed catalog into all ten stable section groups', () => {
    expect(resumeContentSelection.ok).toBe(true)
    if (!resumeContentSelection.ok) return

    expect(resumeContentSelection.value.claims).toHaveLength(reviewedResumeClaims.length)
    expect(resumeContentSelection.value.categoryCount).toBe(reviewedResumeCategories.length)
    expect(Object.keys(resumeContentSelection.value.sections)).toEqual(sectionRegistry.map(({ id }) => id))
    expect(resumeContentSelection.value.primaryCount + resumeContentSelection.value.referenceOnlyCount).toBe(reviewedResumeClaims.length)
  })

  it('shares one local PDF capability with the masthead adapter', () => {
    const masthead = toMastheadResumeAction(resumeDownload)

    expect(masthead.href).toBe(resumeDownload.source.href)
    expect(masthead.download).toBe(resumeDownload.filename)
    expect(resumeDownload.source.mediaType).toBe('application/pdf')
    expect(approvedResumeIntegrity).toEqual({
      bytes: 113775,
      sha256: '8de5fc42ca8c443a7dcad6daa2766d7cd5f3a596369a463e54a74b101ec49282',
    })
  })

  it('contains no document-only contact field in the public model', () => {
    const publicModel = JSON.stringify(resumeContentSelection).toLocaleLowerCase()
    expect(publicModel).not.toContain('phone')
    expect(publicModel).not.toContain('email')
  })
})
