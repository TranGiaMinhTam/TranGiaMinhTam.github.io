import { sectionRegistry } from '../model/sectionRegistry'
import type { SectionDefinition, SectionId } from '../model/portfolio.types'
import type { ProgressState } from './shell.types'

export function deriveProgress(
  sectionId: SectionId,
  registry: readonly SectionDefinition[] = sectionRegistry,
): ProgressState {
  const activeIndex = registry.findIndex((section) => section.id === sectionId)
  if (activeIndex < 0) throw new Error(`Unknown registered section: ${sectionId}`)

  const count = registry.length
  const ordinal = activeIndex + 1
  const denominator = Math.max(1, count - 1)
  const section = registry[activeIndex]

  return Object.freeze({
    sectionId,
    activeIndex,
    ordinal,
    count,
    locusRatio: activeIndex / denominator,
    completionRatio: ordinal / count,
    label: section.label,
    semanticText: `${section.label}, section ${ordinal} of ${count}`,
  })
}

