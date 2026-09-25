import type { HeaderCheck, HeaderName, HostHeaderAssessment } from './release.types'

const requiredHeaders: readonly HeaderName[] = [
  'content-security-policy',
  'strict-transport-security',
  'x-content-type-options',
  'x-frame-options',
  'referrer-policy',
]

const normalizeHeaders = (headers: Readonly<Record<string, string | undefined>>): Readonly<Record<string, string>> =>
  Object.fromEntries(Object.entries(headers).filter((entry): entry is [string, string] => typeof entry[1] === 'string').map(([name, value]) => [name.toLowerCase(), value.trim()]))

const assessHeader = (name: HeaderName, observed: string | null): HeaderCheck => {
  const value = observed?.toLowerCase() ?? ''
  const passed = (() => {
    if (name === 'content-security-policy') return value.includes("default-src 'self'") && !value.includes("'unsafe-eval'")
    if (name === 'strict-transport-security') return /(?:^|;)\s*max-age=(?:3[1-9]\d{6,}|[4-9]\d{7,}|\d{9,})/u.test(value) && value.includes('includesubdomains')
    if (name === 'x-content-type-options') return value === 'nosniff'
    if (name === 'x-frame-options') return value === 'deny' || value === 'sameorigin'
    return value === 'strict-origin-when-cross-origin'
  })()
  return Object.freeze({ name, observed, passed, reason: passed ? 'policy-satisfied' : observed ? 'policy-mismatch' : 'header-missing' })
}

export const assessResponseHeaders = (
  endpoint: string,
  headers: Readonly<Record<string, string | undefined>>,
  available = true,
): HostHeaderAssessment => {
  const normalized = normalizeHeaders(headers)
  const checks = requiredHeaders.map((name) => assessHeader(name, normalized[name] ?? null))
  return Object.freeze({ endpoint, available, checks, compliant: available && checks.every(({ passed }) => passed) })
}
