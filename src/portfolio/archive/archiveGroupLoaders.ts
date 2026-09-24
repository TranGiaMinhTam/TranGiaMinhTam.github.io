import { archiveGroups } from './archiveGroups'
import { createArchiveGroupLoader, type ArchiveGroupImporterRegistry } from './archiveDiscoveryModel'

export const archiveGroupImporters: ArchiveGroupImporterRegistry = Object.freeze({
  'scientific-research': () => import('./generated/groups/scientific-research'),
  'academic-competitions': () => import('./generated/groups/academic-competitions'),
  volunteering: () => import('./generated/groups/volunteering'),
  scholarships: () => import('./generated/groups/scholarships'),
  'public-speaking': () => import('./generated/groups/public-speaking'),
  sport: () => import('./generated/groups/sport'),
})

export const loadArchiveGroup = createArchiveGroupLoader(archiveGroups, archiveGroupImporters)
