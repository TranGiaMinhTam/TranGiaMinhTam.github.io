import { createHash } from 'node:crypto'
import { open, readdir } from 'node:fs/promises'
import path from 'node:path'
import { REVIEWED_TYPE_OVERRIDES, SUPPORTED_EXTENSIONS } from './config.mjs'
import { createFinding, createValidationReport } from './findings.mjs'
import { hashFile } from './hash.mjs'
import { normalizeRepositoryPath, toPosixPath, verifyExistingPathWithinRoot } from './paths.mjs'

const physicalId = (relativePath) => `physical-${createHash('sha256').update(relativePath).digest('hex').slice(0, 20)}`

const categoryForSourcePath = (sourceRelativePath) => {
  const parts = sourceRelativePath.split('/')
  if (parts[0] === 'source' && parts[1]) return parts[1].trim()
  return parts[0] || '_root'
}

const readHeader = async (file, length = 512) => {
  const handle = await open(file, 'r')
  try {
    const buffer = Buffer.alloc(length)
    const { bytesRead } = await handle.read(buffer, 0, length, 0)
    return buffer.subarray(0, bytesRead)
  } finally {
    await handle.close()
  }
}

const detectMediaType = async (file, extension) => {
  const header = await readHeader(file)
  if (header.subarray(0, 5).toString('ascii') === '%PDF-') return 'application/pdf'
  if (header.length >= 3 && header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff) return 'image/jpeg'
  if (header.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png'
  if (header.subarray(0, 2).equals(Buffer.from([0x50, 0x4b])) && extension === '.docx') return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  const ascii = header.toString('utf8').trimStart()
  if (ascii.startsWith('<svg') || (ascii.startsWith('<?xml') && ascii.includes('<svg'))) return 'image/svg+xml'
  if (header.length >= 12 && header.subarray(4, 8).toString('ascii') === 'ftyp' && /hei[cf]|mif1|msf1/u.test(header.subarray(8, 32).toString('ascii'))) return 'image/heic'
  if (header.length >= 12 && header.subarray(0, 4).toString('ascii') === 'RIFF' && header.subarray(8, 12).toString('ascii') === 'WEBP') return 'image/webp'
  return null
}

const walk = async (root, current = root) => {
  const output = []
  const entries = await readdir(current, { withFileTypes: true })
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const candidate = path.join(current, entry.name)
    if (entry.isDirectory()) output.push(...await walk(root, candidate))
    else output.push({ candidate, entry })
  }
  return output
}

export const validateCapacity = ({ fileCount, totalBytes, maxFiles, maxBytes }) => Object.freeze({
  withinCapacity: fileCount <= maxFiles && totalBytes <= maxBytes,
  exceeded: Object.freeze([
    ...(fileCount > maxFiles ? ['file-count'] : []),
    ...(totalBytes > maxBytes ? ['total-bytes'] : []),
  ]),
})

export const inventoryArchive = async ({ workspaceRoot, sourceRoot }) => {
  const started = performance.now()
  const findings = []
  const facts = []
  await verifyExistingPathWithinRoot(workspaceRoot, sourceRoot)
  const entries = await walk(sourceRoot)
  for (const { candidate, entry } of entries) {
    const repositoryPath = normalizeRepositoryPath(toPosixPath(path.relative(workspaceRoot, candidate)))
    if (entry.isSymbolicLink()) {
      findings.push(createFinding({ code: 'U01-INV-SYMLINK', target: repositoryPath, message: 'Source is not an approved regular file.', resolution: 'Replace the link with a reviewed regular source file.' }))
      continue
    }
    if (!entry.isFile()) {
      findings.push(createFinding({ code: 'U01-INV-NONFILE', target: repositoryPath, message: 'Source is not a regular file.', resolution: 'Review the unsupported filesystem entry.' }))
      continue
    }
    try {
      await verifyExistingPathWithinRoot(sourceRoot, candidate)
      const extension = path.extname(entry.name).toLowerCase()
      const expectedType = SUPPORTED_EXTENSIONS.get(extension)
      const detectedType = await detectMediaType(candidate, extension)
      const reviewedOverride = REVIEWED_TYPE_OVERRIDES.get(repositoryPath)
      if (!expectedType || (detectedType !== expectedType && detectedType !== reviewedOverride)) {
        findings.push(createFinding({ code: 'U01-INV-TYPE', target: repositoryPath, message: 'Source type does not match the approved file policy.', resolution: 'Review the source type and extension.' }))
        continue
      }
      if (reviewedOverride) findings.push(createFinding({ code: 'U01-INV-TYPE-OVERRIDE', severity: 'warning', target: repositoryPath, message: 'A reviewed source has a mismatched extension and detected media type.', resolution: 'Preserve the source and use its detected media type.' }))
      const hashed = await hashFile(candidate)
      const sourceRelative = normalizeRepositoryPath(toPosixPath(path.relative(sourceRoot, candidate)))
      facts.push(Object.freeze({
        id: physicalId(repositoryPath),
        relativePath: repositoryPath,
        sourceRelativePath: sourceRelative,
        category: categoryForSourcePath(sourceRelative),
        disposition: 'review-required',
        mediaType: detectedType,
        bytes: hashed.bytes,
        sha256: hashed.sha256,
      }))
    } catch {
      findings.push(createFinding({ code: 'U01-INV-READ', target: repositoryPath, message: 'Source could not be read and verified safely.', resolution: 'Review the source and repeat the inventory deliberately.' }))
    }
  }
  facts.sort((left, right) => left.relativePath.localeCompare(right.relativePath))
  const report = createValidationReport(findings)
  const totalBytes = facts.reduce((sum, fact) => sum + fact.bytes, 0)
  return Object.freeze({
    schemaVersion: 1,
    facts: Object.freeze(facts),
    summary: Object.freeze({ fileCount: facts.length, totalBytes, elapsedMs: Math.round(performance.now() - started) }),
    report,
  })
}
