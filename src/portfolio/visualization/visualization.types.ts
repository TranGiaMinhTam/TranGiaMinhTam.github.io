import type { ContentId } from '../model/portfolio.types'

export type VisualizationCategory = Readonly<{
  id: string
  label: string
  textMarker: string
  colorToken: string
}>

export type RelationshipValue = Readonly<{
  id: string
  sourceId: ContentId
  sourceLabel: string
  targetId: ContentId
  targetLabel: string
  category: VisualizationCategory
}>

export type CategoricalValue = Readonly<{
  id: string
  label: string
  category: VisualizationCategory
  value: string
  basis: 'verified' | 'derived-count'
}>

export type InformationalVisualization = Readonly<{
  purpose: 'informational'
  id: string
  title: string
  description: string
  summaryKind: 'list' | 'table'
  values: readonly (RelationshipValue | CategoricalValue)[]
}>

export type DecorativeVisualization = Readonly<{
  purpose: 'decorative'
  id: string
  ariaHidden: true
}>

export type VisualizationModel = InformationalVisualization | DecorativeVisualization

export const isRelationshipValue = (value: RelationshipValue | CategoricalValue): value is RelationshipValue =>
  'sourceId' in value
