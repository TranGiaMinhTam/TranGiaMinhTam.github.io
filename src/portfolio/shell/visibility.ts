import { sectionRegistry } from '../model/sectionRegistry'
import type { SectionDefinition, SectionId } from '../model/portfolio.types'
import type { NavigationIntent, VisibilityFact } from './shell.types'

export function selectVisibilityWinner(
  facts: readonly VisibilityFact[],
  previous: SectionId,
  pendingIntent?: NavigationIntent,
  registry: readonly SectionDefinition[] = sectionRegistry,
): SectionId {
  const newestSequence = facts.reduce((latest, fact) => Math.max(latest, fact.sequence), -1)
  if (pendingIntent && pendingIntent.sequence >= newestSequence) return pendingIntent.sectionId

  const order = new Map(registry.map((section, index) => [section.id, index]))
  const visible = [...facts]
    .filter((fact) => fact.isIntersecting && order.has(fact.sectionId))
    .sort((left, right) =>
      Math.abs(left.anchorDistance) - Math.abs(right.anchorDistance)
      || right.ratio - left.ratio
      || (order.get(left.sectionId) ?? 0) - (order.get(right.sectionId) ?? 0),
    )

  return visible[0]?.sectionId ?? previous
}
