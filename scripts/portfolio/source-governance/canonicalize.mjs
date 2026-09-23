import { createFinding, createValidationReport } from './findings.mjs'

const canonicalIdForHash = (hash) => `asset-${hash.slice(0, 20)}`

const normalizeFacts = (facts) => [...facts]
  .map((fact) => Object.freeze({ ...fact }))
  .sort((left, right) => left.relativePath.localeCompare(right.relativePath))

export const referenceGroupByHash = (facts) => {
  const groups = {}
  for (const fact of facts) (groups[fact.sha256] ??= []).push(fact.id)
  return Object.fromEntries(Object.entries(groups).sort().map(([hash, members]) => [hash, [...members].sort()]))
}

export const canonicalizeAssets = (inputFacts, aliases = []) => {
  const facts = normalizeFacts(inputFacts)
  const findings = []
  const factsByHash = new Map()
  const seenPhysicalIds = new Set()
  for (const fact of facts) {
    if (seenPhysicalIds.has(fact.id)) {
      findings.push(createFinding({ code: 'U01-CAN-PHYSICAL-ID', target: fact.relativePath, message: 'Physical identity is duplicated.', resolution: 'Resolve the path identity collision.' }))
      continue
    }
    seenPhysicalIds.add(fact.id)
    const members = factsByHash.get(fact.sha256) ?? []
    members.push(fact)
    factsByHash.set(fact.sha256, members)
  }

  const ownerByHash = new Map()
  for (const alias of aliases) {
    for (const hash of alias.contentHashes) {
      if (!factsByHash.has(hash)) {
        findings.push(createFinding({ code: 'U01-CAN-ALIAS-MISSING', target: alias.canonicalId, message: 'Reviewed alias refers to unavailable content.', resolution: 'Update the reviewed alias declaration.' }))
        continue
      }
      const existing = ownerByHash.get(hash)
      if (existing && existing !== alias.canonicalId) {
        findings.push(createFinding({ code: 'U01-CAN-ALIAS-CONFLICT', target: alias.canonicalId, message: 'Reviewed alias has conflicting ownership.', resolution: 'Assign each content hash to one canonical owner.' }))
      } else {
        ownerByHash.set(hash, alias.canonicalId)
      }
    }
  }

  const itemMap = new Map()
  for (const [hash, members] of [...factsByHash.entries()].sort(([left], [right]) => left.localeCompare(right))) {
    const id = ownerByHash.get(hash) ?? canonicalIdForHash(hash)
    const item = itemMap.get(id) ?? { id, contentHashes: [], physicalSources: [] }
    item.contentHashes.push(hash)
    item.physicalSources.push(...members)
    itemMap.set(id, item)
  }

  const items = [...itemMap.values()].map((item) => Object.freeze({
    id: item.id,
    contentHashes: Object.freeze([...new Set(item.contentHashes)].sort()),
    physicalSources: Object.freeze([...item.physicalSources].sort((left, right) => left.id.localeCompare(right.id))),
  })).sort((left, right) => left.id.localeCompare(right.id))

  const memberIds = items.flatMap((item) => item.physicalSources.map((source) => source.id))
  if (memberIds.length !== facts.length || new Set(memberIds).size !== facts.length) {
    findings.push(createFinding({ code: 'U01-CAN-MEMBERSHIP', target: 'archive-catalog', message: 'Canonical membership is incomplete or repeated.', resolution: 'Reconcile every physical source exactly once.' }))
  }

  return Object.freeze({ items: Object.freeze(items), report: createValidationReport(findings) })
}
