import { canonicalizeValue, serializeCanonicalJson } from './evidence.mjs'

const isRecord = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value)

export const createArchiveManifest = ({ items, physicalFileCount, totalBytes }) => canonicalizeValue({
  schemaVersion: 1,
  physicalFileCount,
  totalBytes,
  items,
})

export const serializeArchiveManifest = (manifest) => serializeCanonicalJson(manifest)

export const parseArchiveManifest = (text) => {
  const parsed = JSON.parse(text)
  if (!isRecord(parsed) || parsed.schemaVersion !== 1 || !Array.isArray(parsed.items) || !Number.isSafeInteger(parsed.physicalFileCount) || !Number.isSafeInteger(parsed.totalBytes)) {
    throw new TypeError('ARCHIVE_MANIFEST_INVALID')
  }
  return canonicalizeValue(parsed)
}
