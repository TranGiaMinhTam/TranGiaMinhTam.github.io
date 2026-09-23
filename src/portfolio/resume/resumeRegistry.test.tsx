import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { academicEvidenceBodyRegistry } from '../academics'
import { contactBodyRegistry } from '../contact'
import { createIdentityQuestionBodyRegistry } from '../identity'
import { toolsFieldworkBodyRegistry } from '../impact'
import { sectionRegistry } from '../model/sectionRegistry'
import { composePortfolioBodyRegistries, researchDataBodyRegistry } from '../research'
import { SectionBodyResolver } from '../shell/SectionBodyResolver'
import { resumeContentSelection, resumeDownload } from './resumeContentModel'
import { decorateRegistryWithResumeContent } from './resumeRegistry'

afterEach(() => cleanup())

describe('candidate resume registry composition', () => {
  it('preserves all ten domain bodies and adds each non-empty resume group once', () => {
    expect(resumeContentSelection.ok).toBe(true)
    if (!resumeContentSelection.ok) return
    const base = composePortfolioBodyRegistries(
      createIdentityQuestionBodyRegistry(resumeDownload),
      researchDataBodyRegistry,
      academicEvidenceBodyRegistry,
      toolsFieldworkBodyRegistry,
      contactBodyRegistry,
    )
    const candidate = decorateRegistryWithResumeContent(base, resumeContentSelection.value.sections)
    render(<>{sectionRegistry.map((section) => <SectionBodyResolver
      key={section.id}
      section={section}
      bodies={candidate}
      onNavigate={() => false}
    />)}</>)

    expect(Object.keys(candidate)).toEqual(sectionRegistry.map(({ id }) => id))
    expect(screen.getByTestId('resume-download-identity')).toHaveAttribute('href', resumeDownload.source.href)
    const visibleGroups = Object.values(resumeContentSelection.value.sections).filter(({ claims }) => claims.length > 0)
    expect(screen.getAllByTestId(/^resume-content-/)).toHaveLength(visibleGroups.length)
    expect(screen.queryByTestId('temporary-section-body-contact')).not.toBeInTheDocument()
  })
})
