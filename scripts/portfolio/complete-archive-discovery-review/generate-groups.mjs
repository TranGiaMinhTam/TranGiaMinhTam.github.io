import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const GROUPS = Object.freeze({
  'scientific-research': Object.freeze({ label: 'Scientific Research', description: 'Research projects, presentations, publications, and participation records.', order: 1 }),
  'academic-competitions': Object.freeze({ label: 'Academic Competitions', description: 'Competition photographs, certificates, presentations, and awards.', order: 2 }),
  volunteering: Object.freeze({ label: 'Community and Conservation', description: 'Community service, field activities, and conservation projects.', order: 3 }),
  scholarships: Object.freeze({ label: 'Scholarships', description: 'Published scholarship offer documents.', order: 4 }),
  'public-speaking': Object.freeze({ label: 'Public Speaking', description: 'Debate and public-speaking activities.', order: 5 }),
  sport: Object.freeze({ label: 'Sport', description: 'Sport participation and achievement records.', order: 6 }),
})

const EXCLUDED_IDS = new Set([
  'asset-0857163ebd922f5c0723',
  'asset-1fa6103b2d5218d4582b',
])

const NARRATIVE_IDS = new Set([
  'asset-949b0facaa575830d071',
  'asset-d5561a78f6b611308cef',
  'asset-02ed8286ffa69acd6cd0',
])

const SUBCOLLECTIONS = Object.freeze(new Map([
  ['GYS 2025_Certificate', 'GYS 2025 Certificate'],
  ['Volunteer Cert', 'Volunteer Certificates'],
  ['IAM VOLUNTEEN 2025', 'IAM Volunteen 2025'],
  ['WSC 2024', "World Scholar's Cup 2024"],
]))

const PUBLIC_DOCUMENT_OVERRIDES = Object.freeze(new Map([
  ['asset-387e7a940cacfc2d6326', 'src/assets/generated/minh-tam/document-preview/borsworth-scholarship-first-2-pages.pdf'],
  ['asset-dc6125151ef633adf31a', 'src/assets/generated/minh-tam/document-preview/worthgate-scholarship-first-2-pages.pdf'],
]))

const quote = (value) => JSON.stringify(value)
const preferredSource = (item) => item.physicalSources.find(({ sourceRelativePath }) => sourceRelativePath.startsWith('source/')) ?? item.physicalSources[0]
const readyDerivative = (item, purpose) => item.derivatives.find((derivative) => derivative.status === 'ready' && derivative.purpose === purpose)
const importPathFor = (repositoryPath) => {
  const relative = path.posix.relative('src/portfolio/archive/generated/groups', repositoryPath)
  return relative.startsWith('.') ? relative : `./${relative}`
}
const derivativePathFor = (href) => `src${href}`
const subcollectionFor = (source, group) => {
  const parts = source.sourceRelativePath.split('/').map((part) => part.trim()).filter(Boolean)
  const candidate = parts[0] === 'source' && parts.length > 3 ? parts[2] : group.label
  return SUBCOLLECTIONS.get(candidate) ?? candidate.replaceAll('_', ' ')
}

const renderCard = ({ item, source, index, imports, group }) => {
  const originalName = `original${index}`
  const publicOriginalPath = PUBLIC_DOCUMENT_OVERRIDES.get(item.id) ?? source.relativePath
  imports.push(`import ${originalName} from ${quote(`${importPathFor(publicOriginalPath)}?url`)}`)
  const base = [
    `id: asCanonicalAssetId(${quote(item.id)})`,
    `title: ${quote(item.metadata.title)}`,
    `caption: ${quote(item.metadata.caption)}`,
    `accessibilityText: ${quote(item.metadata.accessibility.kind === 'description' ? item.metadata.accessibility.text : '')}`,
    `subcollection: ${quote(subcollectionFor(source, group))}`,
    `order: ${item.metadata.order}`,
    `originalHref: ${originalName}`,
    `originalMediaType: ${quote(source.mediaType)}`,
  ]
  if (item.metadata.disposition === 'gallery') {
    const thumbnail = readyDerivative(item, 'thumbnail')
    if (!thumbnail?.width || !thumbnail.height) throw new Error(`GROUP_THUMBNAIL_MISSING:${item.id}`)
    const thumbnailName = `thumbnail${index}`
    imports.push(`import ${thumbnailName} from ${quote(importPathFor(derivativePathFor(thumbnail.href)))}`)
    return `    Object.freeze({ kind: 'image', ${base.join(', ')}, thumbnailHref: ${thumbnailName}, width: ${thumbnail.width}, height: ${thumbnail.height} }),`
  }
  if (item.metadata.disposition === 'document-collection') {
    const preview = readyDerivative(item, 'pdf-first-page')
    if (preview?.width && preview.height) {
      const previewName = `preview${index}`
      imports.push(`import ${previewName} from ${quote(importPathFor(derivativePathFor(preview.href)))}`)
      return `    Object.freeze({ kind: 'document', ${base.join(', ')}, previewHref: ${previewName}, previewWidth: ${preview.width}, previewHeight: ${preview.height} }),`
    }
    return `    Object.freeze({ kind: 'document', ${base.join(', ')} }),`
  }
  return `    Object.freeze({ kind: 'original', ${base.join(', ')} }),`
}

const renderGroupModule = (groupId, group, items) => {
  const imports = []
  const cards = items.map((item, index) => {
    const source = preferredSource(item)
    if (!source) throw new Error(`GROUP_SOURCE_MISSING:${item.id}`)
    return renderCard({ item, source, index, imports, group })
  })
  return `${imports.join('\n')}\nimport { asArchiveGroupId, asCanonicalAssetId, type ArchiveGroupData } from '../../archive.types'\n\nexport const archiveGroup = Object.freeze({\n  id: asArchiveGroupId(${quote(groupId)}),\n  label: ${quote(group.label)},\n  description: ${quote(group.description)},\n  order: ${group.order},\n  items: Object.freeze([\n${cards.join('\n')}\n  ]),\n}) satisfies ArchiveGroupData\n`
}

const renderSummaries = (groups) => {
  const records = groups.map(({ id, group, items }) => {
    const imageCount = items.filter(({ metadata }) => metadata.disposition === 'gallery').length
    const documentCount = items.filter(({ metadata }) => metadata.disposition === 'document-collection').length
    const originalCount = items.length - imageCount - documentCount
    return `  Object.freeze({ id: asArchiveGroupId(${quote(id)}), label: ${quote(group.label)}, description: ${quote(group.description)}, order: ${group.order}, count: ${items.length}, imageCount: ${imageCount}, documentCount: ${documentCount}, originalCount: ${originalCount} }),`
  })
  return `import { asArchiveGroupId, type ArchiveGroupSummary } from './archive.types'\n\nexport const archiveGroups = Object.freeze([\n${records.join('\n')}\n]) satisfies readonly ArchiveGroupSummary[]\n`
}

export const generateArchiveGroups = async ({ workspaceRoot }) => {
  const manifestPath = path.join(workspaceRoot, 'src/portfolio/archive/generated/archive-manifest.json')
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
  const selected = manifest.items.filter((item) => !EXCLUDED_IDS.has(item.id) && !NARRATIVE_IDS.has(item.id))
  const unknown = selected.filter((item) => !GROUPS[item.metadata.groupId])
  if (unknown.length > 0) throw new Error(`GROUP_UNKNOWN:${unknown.map(({ id }) => id).join(',')}`)
  const groups = Object.entries(GROUPS).map(([id, group]) => ({
    id,
    group,
    items: selected
      .filter((item) => item.metadata.groupId === id)
      .sort((left, right) => left.metadata.order - right.metadata.order || left.id.localeCompare(right.id)),
  })).filter(({ items }) => items.length > 0)
  const outputRoot = path.join(workspaceRoot, 'src/portfolio/archive/generated/groups')
  await mkdir(outputRoot, { recursive: true })
  for (const { id, group, items } of groups) {
    await writeFile(path.join(outputRoot, `${id}.ts`), renderGroupModule(id, group, items))
  }
  await writeFile(path.join(workspaceRoot, 'src/portfolio/archive/archiveGroups.ts'), renderSummaries(groups))
  return Object.freeze({ groupCount: groups.length, publicCardCount: selected.length })
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify(await generateArchiveGroups({ workspaceRoot: process.cwd() })))
}
