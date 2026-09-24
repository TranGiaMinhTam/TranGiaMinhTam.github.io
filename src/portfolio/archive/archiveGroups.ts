import { asArchiveGroupId, type ArchiveGroupSummary } from './archive.types'

export const archiveGroups = Object.freeze([
  Object.freeze({ id: asArchiveGroupId("scientific-research"), label: "Scientific Research", description: "Research projects, presentations, publications, and participation records.", order: 1, count: 46, imageCount: 39, documentCount: 6, originalCount: 1 }),
  Object.freeze({ id: asArchiveGroupId("academic-competitions"), label: "Academic Competitions", description: "Competition photographs, certificates, presentations, and awards.", order: 2, count: 20, imageCount: 18, documentCount: 2, originalCount: 0 }),
  Object.freeze({ id: asArchiveGroupId("volunteering"), label: "Community and Conservation", description: "Community service, field activities, and conservation projects.", order: 3, count: 34, imageCount: 34, documentCount: 0, originalCount: 0 }),
  Object.freeze({ id: asArchiveGroupId("scholarships"), label: "Scholarships", description: "Published scholarship offer documents.", order: 4, count: 2, imageCount: 0, documentCount: 2, originalCount: 0 }),
  Object.freeze({ id: asArchiveGroupId("public-speaking"), label: "Public Speaking", description: "Debate and public-speaking activities.", order: 5, count: 1, imageCount: 1, documentCount: 0, originalCount: 0 }),
  Object.freeze({ id: asArchiveGroupId("sport"), label: "Sport", description: "Sport participation and achievement records.", order: 6, count: 2, imageCount: 1, documentCount: 1, originalCount: 0 }),
]) satisfies readonly ArchiveGroupSummary[]
