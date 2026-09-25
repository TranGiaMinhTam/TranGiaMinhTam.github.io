import { parseArgs } from 'node:util'
import { printReport, writeReport } from './reports.mjs'

const { values } = parseArgs({ options: { endpoint: { type: 'string', default: 'https://trangiaminhtam.github.io/' } } })
const required = {
  'content-security-policy': (value) => value.includes("default-src 'self'") && !value.includes("'unsafe-eval'"),
  'strict-transport-security': (value) => /max-age=(?:3[1-9]\d{6,}|[4-9]\d{7,}|\d{9,})/u.test(value) && value.toLowerCase().includes('includesubdomains'),
  'x-content-type-options': (value) => value.toLowerCase() === 'nosniff',
  'x-frame-options': (value) => ['deny', 'sameorigin'].includes(value.toLowerCase()),
  'referrer-policy': (value) => value.toLowerCase() === 'strict-origin-when-cross-origin',
}

let response
let unavailable = null
try { response = await fetch(values.endpoint, { redirect: 'follow', signal: AbortSignal.timeout(15000) }) }
catch (error) { unavailable = error instanceof Error ? error.name : 'fetch-failed' }
const checks = Object.entries(required).map(([name, verify]) => {
  const observed = response?.headers.get(name) ?? null
  return { name, observed, passed: observed ? verify(observed) : false, reason: observed ? (verify(observed) ? 'policy-satisfied' : 'policy-mismatch') : 'header-missing' }
})
const findings = unavailable
  ? [{ code: 'U06-HEADERS-UNAVAILABLE', severity: 'blocking', message: 'Required HTTPS header assessment could not run.' }]
  : checks.filter(({ passed }) => !passed).map(({ name, reason }) => ({ code: 'U06-HEADER-NONCOMPLIANT', severity: 'blocking', header: name, reason }))
const report = await writeReport('header-assessment.json', { schemaVersion: 1, endpoint: values.endpoint, finalUrl: response?.url ?? null, status: response?.status ?? null, available: Boolean(response), checks, findings, compliant: Boolean(response) && findings.length === 0, releaseEffect: findings.length === 0 ? 'no-header-blocker' : 'deploy-not-authorized' })
printReport(report)
if (unavailable) process.exitCode = 1
