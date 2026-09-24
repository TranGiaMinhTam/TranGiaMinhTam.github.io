import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { canonicalizeAssets } from './canonicalize.mjs'
import { inventoryArchive } from './inventory.mjs'
import { serializeCanonicalJson } from './evidence.mjs'

const GROUPS = Object.freeze({
  'Academic competitions': Object.freeze({ id: 'academic-competitions', label: 'Academic Competitions' }),
  'Public speaking': Object.freeze({ id: 'public-speaking', label: 'Public Speaking' }),
  'School Scholarship': Object.freeze({ id: 'scholarships', label: 'Scholarships' }),
  'School Transcript': Object.freeze({ id: 'academic-records', label: 'Academic Records' }),
  'Science research': Object.freeze({ id: 'scientific-research', label: 'Scientific Research' }),
  Sport: Object.freeze({ id: 'sport', label: 'Sport' }),
  Volunteer: Object.freeze({ id: 'volunteering', label: 'Community and Conservation' }),
  certificates: Object.freeze({ id: 'curated-certificates', label: 'Published Documents' }),
  gallery: Object.freeze({ id: 'curated-gallery', label: 'Featured Project Visuals' }),
  generated: Object.freeze({ id: 'identity-material', label: 'Identity Material' }),
  projects: Object.freeze({ id: 'curated-projects', label: 'Featured Projects' }),
  '_root': Object.freeze({ id: 'identity-material', label: 'Identity Material' }),
})

const preferredSource = (item) =>
  item.physicalSources.find((source) => source.sourceRelativePath.startsWith('source/')) ?? item.physicalSources[0]

const preferredCategory = (item) => {
  const source = preferredSource(item)
  if (!source) return '_root'
  return source.sourceRelativePath.includes('/') ? source.category : '_root'
}

const dispositionFor = (item) => {
  const mediaTypes = new Set(item.physicalSources.map(({ mediaType }) => mediaType))
  if (mediaTypes.has('application/pdf')) return 'document-collection'
  if (mediaTypes.has('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) return 'original-download'
  if ([...mediaTypes].some((mediaType) => mediaType.startsWith('image/'))) return 'gallery'
  return 'honest-fallback'
}

const titleOverrides = Object.freeze(new Map([
  ['profile_pic.jpg', 'Profile portrait'],
  ['biomedical-mark.svg', 'Biomedical research mark'],
  ['cashew-polyphenol.jpg', 'Cashew testa polyphenol project figure'],
  ['data-analytics.jpg', 'Future Innovator Camp first-place recognition'],
  ['molecular-docking.jpg', 'Molecular docking project visual'],
  ['7381606024551.jpg', 'Protein docking workstation'],
  ['IMG_4206.JPG', 'Protein docking research completion'],
  ['IMG_4207.JPG', 'Protein docking oral presentation'],
  ['IMG_4208.JPG', 'Protein docking conference poster'],
  ['IMG_4213.JPG', 'Protein docking poster presentation'],
  ['Certificate of Participation_Tran Gia Minh Tam - FredAndBob.pdf', 'SIM-LSE Data Analytics Challenge certificate'],
  ['FredAndBob - SIM-LSE Data Analytics Challenge 2026.pdf', 'SIM-LSE Data Analytics Challenge presentation'],
  ['Global round.jpg', 'World Scholar\'s Cup Global Round certificate'],
  ['Regional Round.jpg', 'World Scholar\'s Cup Regional Round certificate'],
  ['GYS Finalist.jpg', 'Global Youth Summit finalist certificate'],
  ['WICO awards.jpg', 'WICO award recognition'],
  ['WICO cert.jpg', 'WICO participation certificate'],
  ['Badminton.pdf', 'Badminton achievement certificate'],
  ['Offer pack 80_.pdf', '80% scholarship offer'],
  ['Offer Pack 90_.pdf', '90% scholarship offer'],
]))

const collectionFor = (source) => {
  const parts = source.sourceRelativePath.split('/').map((value) => value.trim()).filter(Boolean)
  if (parts[0] === 'source') return parts.length > 3 ? parts[2] : parts[1]
  if (parts.length > 1) return GROUPS[parts[0]]?.label ?? parts[0]
  return 'Portfolio identity'
}

const fileNameFor = (source) => source.sourceRelativePath.split('/').at(-1) ?? 'Portfolio item'
const extensionFor = (name) => path.extname(name).toLowerCase()
const humanize = (name) => path.basename(name, path.extname(name))
  .normalize('NFC')
  .replace(/^z\d+_[a-f\d]+$/iu, '')
  .replace(/^IMG[_ -]?\d+$/iu, '')
  .replace(/^DSC\d+$/iu, '')
  .replace(/^\d{8,}$/u, '')
  .replace(/^[a-f\d]{16,}$/iu, '')
  .replace(/^\d{8}_\d+$/u, '')
  .replace(/[_-]+/gu, ' ')
  .replace(/\s+/gu, ' ')
  .trim()

const presentationFor = ({ item, group, collection, sequenceInCollection }) => {
  const source = preferredSource(item)
  const fileName = source ? fileNameFor(source) : 'Portfolio item'
  const overridden = titleOverrides.get(fileName)
  const mediaTypes = new Set(item.physicalSources.map(({ mediaType }) => mediaType))
  const image = [...mediaTypes].some((mediaType) => mediaType.startsWith('image/'))
  const derivedName = humanize(fileName)
  const title = overridden ?? (derivedName || `${collection} photograph ${String(sequenceInCollection).padStart(2, '0')}`)
  const kind = image ? 'Photograph' : extensionFor(fileName) === '.docx' ? 'Document' : 'Published document'
  const caption = `${kind} from the ${collection} collection.`
  return Object.freeze({
    title,
    caption,
    accessibility: `${title}. ${caption}`,
    groupLabel: group.label,
  })
}

export const createNeutralReviewedMetadata = (items) => {
  const collectionCounts = new Map()
  return items.map((item, index) => {
    const group = GROUPS[preferredCategory(item)] ?? Object.freeze({ id: 'complete-archive', label: 'Complete archive' })
    const source = preferredSource(item)
    const collection = source ? collectionFor(source) : group.label
    const sequenceInCollection = (collectionCounts.get(collection) ?? 0) + 1
    collectionCounts.set(collection, sequenceInCollection)
    const presentation = presentationFor({ item, group, collection, sequenceInCollection })
    return Object.freeze({
      canonicalId: item.id,
      title: presentation.title,
      caption: presentation.caption,
      groupId: group.id,
      order: index + 1,
      authority: 'owner-reviewed',
      accessibility: Object.freeze({ kind: 'description', text: presentation.accessibility }),
      disposition: dispositionFor(item),
    })
  })
}

const quote = (value) => JSON.stringify(value)

export const renderMetadataModule = (metadata) => {
  const records = metadata.map((record) => `  Object.freeze({\n    canonicalId: asCanonicalAssetId(${quote(record.canonicalId)}),\n    title: ${quote(record.title)},\n    caption: ${quote(record.caption)},\n    groupId: asArchiveGroupId(${quote(record.groupId)}),\n    order: ${record.order},\n    authority: 'owner-reviewed',\n    accessibility: Object.freeze({ kind: 'description', text: ${quote(record.accessibility.text)} }),\n    disposition: ${quote(record.disposition)},\n  }),`).join('\n')
  return `import { asArchiveGroupId, asCanonicalAssetId, type CuratedArchiveMetadata } from './archive.types'\n\n// Generated from the approved reviewed presentation policy. Public copy uses curated activity context and never exposes source paths.\nexport const archiveMetadata = Object.freeze([\n${records}\n]) satisfies readonly CuratedArchiveMetadata[]\n`
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
