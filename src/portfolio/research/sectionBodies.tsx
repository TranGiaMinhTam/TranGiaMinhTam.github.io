import type { SectionId } from '../model/portfolio.types'
import { verifiedPortfolioSource } from '../model/verifiedPortfolioSource'
import type { SectionBodyFactory, SectionBodyRegistry } from '../shell/SectionBodyResolver'
import { ComputationalProjects } from './ComputationalProjects'
import { DataStories } from './DataStories'
import { LaboratoryResearch } from './LaboratoryResearch'
import { researchEvidenceManifest } from './projectCatalog'
import styles from './ResearchData.module.css'
import { assembleResearchData } from './researchDataModel'

export const researchDataSelection = assembleResearchData(verifiedPortfolioSource, researchEvidenceManifest)

const unavailable = researchDataSelection.ok ? null : <div className={styles.validationFailure} role="status">
  <p>Research content is unavailable.</p>
  <small>{researchDataSelection.findings.map((finding) => finding.code).join(' · ')}</small>
</div>

export const researchDataBodyRegistry: SectionBodyRegistry = Object.freeze({
  'computational-projects': () => researchDataSelection.ok
    ? <ComputationalProjects model={researchDataSelection.value.computational} />
    : unavailable,
  'laboratory-research': () => researchDataSelection.ok
    ? <LaboratoryResearch model={researchDataSelection.value.laboratory} />
    : unavailable,
  'data-stories': () => researchDataSelection.ok
    ? <DataStories model={researchDataSelection.value.dataStory} />
    : unavailable,
})

export const composePortfolioBodyRegistries = (...registries: readonly SectionBodyRegistry[]): SectionBodyRegistry => {
  const composed: Partial<Record<SectionId, SectionBodyFactory>> = {}
  for (const registry of registries) {
    for (const key of Object.keys(registry) as SectionId[]) {
      const body = registry[key]
      if (!body) continue
      if (Object.hasOwn(composed, key)) throw new Error(`Duplicate section body registration: ${key}`)
      composed[key] = body
    }
  }
  return Object.freeze(composed) as SectionBodyRegistry
}
