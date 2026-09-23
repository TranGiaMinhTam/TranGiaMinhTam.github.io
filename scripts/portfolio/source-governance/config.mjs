import path from 'node:path'

export const SCHEMA_VERSION = 1
export const SOURCE_ROOT = 'src/assets/minh-tam'
export const DERIVATIVE_ROOT = 'src/assets/generated/minh-tam'
export const RESUME_TARGET = 'src/assets/documents/Tran-Gia-Minh-Tam-Resume.pdf'
export const GENERATED_MANIFEST = 'src/portfolio/archive/generated/archive-manifest.json'
export const EVIDENCE_ROOT = 'artifacts/portfolio/source-governance'
export const RECOVERY_MANIFEST = '.aidlc-recovery/source-governance-safe-foundation/manifest.json'
export const EXPECTED_CURRENT_FILE_COUNT = 128
export const MAX_SUPPORTED_FILES = 500
export const MAX_SUPPORTED_BYTES = 1024 ** 3
export const CONVERSION_CONCURRENCY = 2
export const CONVERSION_TIMEOUT_MS = 120_000

export const SUPPORTED_EXTENSIONS = Object.freeze(new Map([
  ['.pdf', 'application/pdf'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.heic', 'image/heic'],
  ['.svg', 'image/svg+xml'],
  ['.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
]))

export const REVIEWED_TYPE_OVERRIDES = Object.freeze(new Map([
  ['src/assets/minh-tam/source/Academic competitions/Kyoto Youth Summit 2026/Kyoto 1.png', 'image/webp'],
]))

export const DERIVATIVE_LIMITS = Object.freeze({
  thumbnail: Object.freeze({ maxWidth: 640, maxHeight: 640, maxBytes: 512 * 1024, outputType: 'image/webp' }),
  'web-display': Object.freeze({ maxWidth: 1920, maxHeight: 1920, maxBytes: 2 * 1024 * 1024, outputType: 'image/webp' }),
  'pdf-first-page': Object.freeze({ maxWidth: 1600, maxHeight: 2200, maxBytes: 2 * 1024 * 1024, outputType: 'image/webp' }),
  'document-preview': Object.freeze({ maxPages: 100, maxBytes: 20 * 1024 * 1024, outputType: 'application/pdf' }),
})

export const createConfig = ({ cwd = process.cwd(), env = process.env } = {}) => Object.freeze({
  schemaVersion: SCHEMA_VERSION,
  workspaceRoot: path.resolve(cwd),
  sourceRoot: path.resolve(cwd, SOURCE_ROOT),
  derivativeRoot: path.resolve(cwd, DERIVATIVE_ROOT),
  resumeTarget: path.resolve(cwd, RESUME_TARGET),
  generatedManifest: path.resolve(cwd, GENERATED_MANIFEST),
  evidenceRoot: path.resolve(cwd, EVIDENCE_ROOT),
  recoveryManifest: path.resolve(cwd, RECOVERY_MANIFEST),
  resumeSource: env.PORTFOLIO_RESUME_SOURCE ? path.resolve(env.PORTFOLIO_RESUME_SOURCE) : null,
  phoneMarker: env.PORTFOLIO_PRIVATE_PHONE_MARKER ?? null,
  phoneMarkerFile: env.PORTFOLIO_PRIVATE_PHONE_MARKER_FILE ? path.resolve(env.PORTFOLIO_PRIVATE_PHONE_MARKER_FILE) : null,
  allowedHttpsOrigins: Object.freeze([]),
})
