import { createFinding, createValidationReport } from './findings.mjs'

const REQUIRED_TEXT = ['title', 'caption', 'groupId', 'authority', 'disposition']

export const joinArchiveMetadata = ({ canonicalItems, metadata, derivatives = [] }) => {
  const findings = []
  const metadataById = new Map()
  for (const record of metadata) {
    if (metadataById.has(record.canonicalId)) {
      findings.push(createFinding({ code: 'U01-META-DUPLICATE', target: record.canonicalId, message: 'Canonical metadata is duplicated.', resolution: 'Retain one reviewed metadata record.' }))
      continue
    }
    metadataById.set(record.canonicalId, record)
  }
  const derivativesById = new Map()
  for (const outcome of derivatives) {
    const values = derivativesById.get(outcome.canonicalId) ?? []
    values.push(outcome)
    derivativesById.set(outcome.canonicalId, values)
  }
  const items = canonicalItems.map((canonical) => {
    const record = metadataById.get(canonical.id)
    if (!record) {
      findings.push(createFinding({ code: 'U01-META-MISSING', target: canonical.id, message: 'Reviewed metadata is incomplete.', resolution: 'Add a reviewed metadata record and disposition.' }))
      return null
    }
    if (REQUIRED_TEXT.some((key) => typeof record[key] !== 'string' || record[key].trim() === '')) {
      findings.push(createFinding({ code: 'U01-META-FIELD', target: canonical.id, message: 'Reviewed metadata has an empty required field.', resolution: 'Complete the reviewed metadata record.' }))
    }
    if (!(record.accessibility?.kind === 'decorative' || (record.accessibility?.kind === 'description' && record.accessibility.text.trim()))) {
      findings.push(createFinding({ code: 'U01-META-ACCESSIBILITY', target: canonical.id, message: 'Accessibility treatment is incomplete.', resolution: 'Provide reviewed descriptive text or mark the item decorative.' }))
    }
    return Object.freeze({ ...canonical, metadata: Object.freeze(record), derivatives: Object.freeze([...(derivativesById.get(canonical.id) ?? [])]) })
  }).filter(Boolean)
  for (const record of metadata) {
    if (!canonicalItems.some((item) => item.id === record.canonicalId)) findings.push(createFinding({ code: 'U01-META-ORPHAN', target: record.canonicalId, message: 'Reviewed metadata has no canonical source.', resolution: 'Remove or correct the orphan record.' }))
  }
  return Object.freeze({ items: Object.freeze(items), report: createValidationReport(findings) })
}
