import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { canonicalizeAssets } from './canonicalize.mjs'
import { inventoryArchive } from './inventory.mjs'
import { serializeCanonicalJson } from './evidence.mjs'

const GROUPS = Object.freeze({
  'Academic competitions': Object.freeze({ id: 'academic-competitions', label: 'Academic competitions' }),
  'Public speaking': Object.freeze({ id: 'public-speaking', label: 'Public speaking' }),
  'School Scholarship': Object.freeze({ id: 'scholarships', label: 'Scholarships' }),
  'School Transcript': Object.freeze({ id: 'academic-records', label: 'Academic records' }),
  'Science research': Object.freeze({ id: 'scientific-research', label: 'Scientific research' }),
  Sport: Object.freeze({ id: 'sport', label: 'Sport' }),
  Volunteer: Object.freeze({ id: 'volunteering', label: 'Volunteering' }),
  certificates: Object.freeze({ id: 'curated-certificates', label: 'Curated certificates' }),
  gallery: Object.freeze({ id: 'curated-gallery', label: 'Curated gallery' }),
  generated: Object.freeze({ id: 'identity-material', label: 'Identity material' }),
  projects: Object.freeze({ id: 'curated-projects', label: 'Curated projects' }),
  '_root': Object.freeze({ id: 'identity-material', label: 'Identity material' }),
})

const preferredCategory = (item) => {
  const sourceMember = item.physicalSources.find((source) => source.sourceRelativePath.startsWith('source/'))
  return sourceMember?.category ?? item.physicalSources[0]?.category ?? '_root'
}

const dispositionFor = (item) => {
  const mediaTypes = new Set(item.physicalSources.map(({ mediaType }) => mediaType))
  if (mediaTypes.has('application/pdf')) return 'document-collection'
  if (mediaTypes.has('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) return 'original-download'
  if ([...mediaTypes].some((mediaType) => mediaType.startsWith('image/'))) return 'gallery'
  return 'honest-fallback'
}

export const createNeutralReviewedMetadata = (items) => items.map((item, index) => {
  const group = GROUPS[preferredCategory(item)] ?? Object.freeze({ id: 'complete-archive', label: 'Complete archive' })
  const sequence = String(index + 1).padStart(3, '0')
  return Object.freeze({
    canonicalId: item.id,
    title: `Archive record ${sequence}`,
    caption: `Preserved evidence from the reviewed ${group.label.toLowerCase()} collection.`,
    groupId: group.id,
    order: index + 1,
    authority: 'owner-reviewed',
    accessibility: Object.freeze({ kind: 'description', text: `Preview of archive record ${sequence} in the ${group.label.toLowerCase()} collection.` }),
    disposition: dispositionFor(item),
  })
})

const quote = (value) => JSON.stringify(value)

export const renderMetadataModule = (metadata) => {
  const records = metadata.map((record) => `  Object.freeze({\n    canonicalId: asCanonicalAssetId(${quote(record.canonicalId)}),\n    title: ${quote(record.title)},\n    caption: ${quote(record.caption)},\n    groupId: asArchiveGroupId(${quote(record.groupId)}),\n    order: ${record.order},\n    authority: 'owner-reviewed',\n    accessibility: Object.freeze({ kind: 'description', text: ${quote(record.accessibility.text)} }),\n    disposition: ${quote(record.disposition)},\n  }),`).join('\n')
  return `import { asArchiveGroupId, asCanonicalAssetId, type CuratedArchiveMetadata } from './archive.types'\n\n// Generated from the approved neutral metadata policy. Descriptions intentionally do not infer facts from filenames.\nexport const archiveMetadata = Object.freeze([\n${records}\n]) satisfies readonly CuratedArchiveMetadata[]\n`
}

export const generateReviewedMetadata = async ({ workspaceRoot }) => {
  const inventory = await inventoryArchive({ workspaceRoot, sourceRoot: path.join(workspaceRoot, 'src/assets/minh-tam') })
  const canonical = canonicalizeAssets(inventory.facts)
  if (!inventory.report.canProceed || !canonical.report.canProceed) throw new Error('CATALOG_INPUT_BLOCKED')
  const metadata = createNeutralReviewedMetadata(canonical.items)
  const metadataTarget = path.join(workspaceRoot, 'src/portfolio/archive/archiveMetadata.ts')
  await writeFile(metadataTarget, renderMetadataModule(metadata))
  const duplicateGroups = canonical.items.filter((item) => item.physicalSources.length > 1).map((item) => ({
    canonicalId: item.id,
    sha256: item.contentHashes[0],
    members: item.physicalSources.map(({ relativePath }) => relativePath),
    decision: 'exact-content-duplicate',
  }))
  const evidenceTarget = path.join(workspaceRoot, 'artifacts/portfolio/source-governance/exact-duplicate-review.json')
  await mkdir(path.dirname(evidenceTarget), { recursive: true })
  await writeFile(evidenceTarget, serializeCanonicalJson({ schemaVersion: 1, physicalFileCount: inventory.facts.length, canonicalItemCount: canonical.items.length, duplicateGroups, reviewedNonIdenticalAliases: [] }))
  return Object.freeze({ physicalFileCount: inventory.facts.length, canonicalItemCount: canonical.items.length, metadataCount: metadata.length, duplicateGroupCount: duplicateGroups.length })
}
