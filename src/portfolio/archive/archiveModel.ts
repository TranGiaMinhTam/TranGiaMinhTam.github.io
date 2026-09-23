import type { ArchiveManifest, CanonicalArchiveItem } from './archive.types'

const SHA256 = /^[a-f0-9]{64}$/u
const hasControlCharacter = (value: string): boolean => [...value].some((character) => {
  const codePoint = character.codePointAt(0) ?? 0
  return codePoint <= 31 || codePoint === 127
})

const isSafeRelativePath = (value: string): boolean =>
  value.length > 0 && !value.startsWith('/') && !value.includes('\\') && !hasControlCharacter(value) && !value.split('/').includes('..')

export type ArchiveManifestValidation = Readonly<{
  ok: boolean
  codes: readonly string[]
}>

export const validateArchiveManifest = (manifest: ArchiveManifest): ArchiveManifestValidation => {
  const codes = new Set<string>()
  if (manifest.schemaVersion !== 1) codes.add('ARCHIVE_SCHEMA_UNSUPPORTED')
  const physicalIds = new Set<string>()
  const canonicalIds = new Set<string>()
  let bytes = 0
  for (const item of manifest.items) {
    if (canonicalIds.has(item.id)) codes.add('ARCHIVE_CANONICAL_ID_DUPLICATE')
    canonicalIds.add(item.id)
    if (item.metadata.canonicalId !== item.id) codes.add('ARCHIVE_METADATA_OWNER_MISMATCH')
    if (!item.contentHashes.every((hash) => SHA256.test(hash))) codes.add('ARCHIVE_HASH_INVALID')
    for (const source of item.physicalSources) {
      if (physicalIds.has(source.id)) codes.add('ARCHIVE_PHYSICAL_MEMBER_DUPLICATE')
      physicalIds.add(source.id)
      bytes += source.bytes
      if (!SHA256.test(source.sha256)) codes.add('ARCHIVE_HASH_INVALID')
      if (!isSafeRelativePath(source.relativePath)) codes.add('ARCHIVE_PATH_UNSAFE')
    }
  }
  if (physicalIds.size !== manifest.physicalFileCount) codes.add('ARCHIVE_PHYSICAL_COUNT_MISMATCH')
  if (bytes !== manifest.totalBytes) codes.add('ARCHIVE_BYTE_COUNT_MISMATCH')
  return Object.freeze({ ok: codes.size === 0, codes: Object.freeze([...codes].sort()) })
}

export const orderArchiveItems = (items: readonly CanonicalArchiveItem[]): readonly CanonicalArchiveItem[] =>
  Object.freeze([...items].sort((left, right) => left.metadata.order - right.metadata.order || left.id.localeCompare(right.id)))
