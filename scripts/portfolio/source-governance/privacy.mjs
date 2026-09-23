import { execFile } from 'node:child_process'
import { readFile, readdir, realpath, stat } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import { createFinding, createValidationReport } from './findings.mjs'
import { isWithinRoot, normalizeRepositoryPath } from './paths.mjs'

const TEXT_EXTENSIONS = new Set(['.css', '.html', '.js', '.json', '.jsx', '.md', '.mjs', '.svg', '.ts', '.tsx', '.txt', '.yml', '.yaml'])
const IGNORED_DIRECTORIES = new Set(['.git', '.aidlc-recovery', 'node_modules'])
const executeFile = promisify(execFile)
const PHONE_CANDIDATE = /(?:\+?\s*84|0)(?:[\s().-]*\d){8,10}/gu

const walkTextFiles = async (root) => {
  const info = await stat(root).catch(() => null)
  if (!info) return []
  if (info.isFile()) return TEXT_EXTENSIONS.has(path.extname(root).toLowerCase()) ? [root] : []
  const files = []
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (entry.isDirectory() && IGNORED_DIRECTORIES.has(entry.name)) continue
    const candidate = path.join(root, entry.name)
    if (entry.isDirectory()) files.push(...await walkTextFiles(candidate))
    else if (entry.isFile() && TEXT_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) files.push(candidate)
  }
  return files
}

export const readPrivateMarker = async ({ direct, markerFile, workspaceRoot }) => {
  if (typeof direct === 'string' && direct.trim()) return direct.trim()
  if (!markerFile) return null
  const resolved = await realpath(markerFile).catch(() => null)
  if (!resolved || !isWithinRoot(workspaceRoot, resolved)) return null
  const relative = path.relative(workspaceRoot, resolved).split(path.sep).join('/')
  if (!relative.startsWith('.private/')) return null
  const value = (await readFile(resolved, 'utf8')).trim()
  return value || null
}

const normalizedDigits = (value) => value.replace(/\D/gu, '')

const canonicalPhoneDigits = (value) => {
  const digits = normalizedDigits(value)
  return digits.startsWith('84') && digits.length === 11 ? `0${digits.slice(2)}` : digits
}

export const selectPrivatePhoneMarker = (text) => {
  const normalized = [...text.matchAll(PHONE_CANDIDATE)]
    .map((match) => canonicalPhoneDigits(match[0]))
    .filter((value) => value.length >= 9 && value.length <= 11)
  const unique = [...new Set(normalized)]
  return unique.length === 1 ? unique[0] : null
}

export const extractPrivateMarkerFromPdf = async ({ resumePath }) => {
  try {
    const result = await executeFile('gs', ['-q', '-dNOPAUSE', '-dBATCH', '-sDEVICE=txtwrite', '-sOutputFile=-', resumePath], { timeout: 30_000, maxBuffer: 4 * 1024 * 1024, windowsHide: true })
    return selectPrivatePhoneMarker(result.stdout)
  } catch {
    return null
  }
}

const containsMarker = (text, marker) => {
  const canonicalMarker = canonicalPhoneDigits(marker)
  if (text.includes(marker) || normalizedDigits(text).includes(normalizedDigits(marker))) return true
  return [...text.matchAll(PHONE_CANDIDATE)].some((match) => canonicalPhoneDigits(match[0]) === canonicalMarker)
}

export const scanPhonePrivacy = async ({ workspaceRoot, roots, resumePath, resumeSha256, marker, markerFile = null }) => {
  const findings = []
  if (!marker) {
    findings.push(createFinding({ code: 'U01-PRI-MARKER-REQUIRED', target: 'privacy-input', message: 'Private verification input is unavailable.', resolution: 'Provide the marker through the approved non-committed local input.' }))
    return Object.freeze({ scannedFileCount: 0, report: createValidationReport(findings) })
  }
  const digits = canonicalPhoneDigits(marker)
  if (digits.length < 7) {
    findings.push(createFinding({ code: 'U01-PRI-MARKER-INVALID', target: 'privacy-input', message: 'Private verification input is invalid.', resolution: 'Provide the complete marker through the approved local input.' }))
    return Object.freeze({ scannedFileCount: 0, report: createValidationReport(findings) })
  }
  const excluded = new Set([path.resolve(resumePath), ...(markerFile ? [path.resolve(markerFile)] : [])])
  const resumeBytes = await readFile(resumePath)
  const { createHash } = await import('node:crypto')
  if (createHash('sha256').update(resumeBytes).digest('hex') !== resumeSha256) {
    findings.push(createFinding({ code: 'U01-PRI-RESUME-HASH', target: normalizeRepositoryPath(path.relative(workspaceRoot, resumePath).split(path.sep).join('/')), message: 'Resume privacy exception does not match the approved bytes.', resolution: 'Restore and verify the approved resume copy.' }))
    return Object.freeze({ scannedFileCount: 0, report: createValidationReport(findings) })
  }
  const files = [...new Set((await Promise.all(roots.map(walkTextFiles))).flat().map((file) => path.resolve(file)))].filter((file) => !excluded.has(file)).sort()
  for (const file of files) {
    const text = await readFile(file, 'utf8')
    if (containsMarker(text, marker)) {
      const relative = normalizeRepositoryPath(path.relative(workspaceRoot, file).split(path.sep).join('/'))
      findings.push(createFinding({ code: 'U01-PRI-PHONE-LEAK', target: relative, message: 'Document-only contact data appears outside the approved document.', resolution: 'Remove the value from the public text-bearing boundary.' }))
    }
  }
  return Object.freeze({ scannedFileCount: files.length, report: createValidationReport(findings) })
}
