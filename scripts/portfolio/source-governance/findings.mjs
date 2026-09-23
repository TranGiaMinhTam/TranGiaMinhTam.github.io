const SEVERITY_ORDER = Object.freeze({ blocking: 0, warning: 1 })

export const createFinding = ({ code, severity = 'blocking', target, message, resolution }) => {
  if (!/^[A-Z][A-Z0-9-]+$/u.test(code)) throw new TypeError('FINDING_CODE_INVALID')
  if (!(severity in SEVERITY_ORDER)) throw new TypeError('FINDING_SEVERITY_INVALID')
  if (typeof target !== 'string' || target.startsWith('/') || target.includes('..')) throw new TypeError('FINDING_TARGET_UNSAFE')
  return Object.freeze({ code, severity, target, message, resolution })
}

export const normalizeFindings = (findings) => {
  const unique = new Map()
  for (const finding of findings) {
    const key = `${finding.severity}\u0000${finding.code}\u0000${finding.target}`
    if (!unique.has(key)) unique.set(key, finding)
  }
  return Object.freeze([...unique.values()].sort((left, right) =>
    SEVERITY_ORDER[left.severity] - SEVERITY_ORDER[right.severity]
      || left.code.localeCompare(right.code)
      || left.target.localeCompare(right.target),
  ))
}

export const createValidationReport = (findings) => {
  const normalized = normalizeFindings(findings)
  const blockingCount = normalized.filter((finding) => finding.severity === 'blocking').length
  return Object.freeze({
    findings: normalized,
    blockingCount,
    warningCount: normalized.length - blockingCount,
    canProceed: blockingCount === 0,
  })
}
