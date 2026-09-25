import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { evidenceRoot, printReport, root, writeReport } from './reports.mjs'

const lock = JSON.parse(await readFile(path.join(root, 'package-lock.json'), 'utf8'))
if (lock.lockfileVersion !== 3 || !lock.packages || typeof lock.packages !== 'object') throw new Error('UNSUPPORTED_LOCKFILE_SCHEMA')

const packageEntries = Object.entries(lock.packages).filter(([packagePath]) => packagePath !== '')
const packages = packageEntries.map(([packagePath, metadata]) => {
  const name = metadata.name ?? packagePath.split('node_modules/').at(-1)
  const version = metadata.version
  if (!name || !version) throw new Error(`INCOMPLETE_LOCK_PACKAGE:${packagePath}`)
  const suffix = createHash('sha256').update(packagePath).digest('hex').slice(0, 16)
  return {
    SPDXID: `SPDXRef-Package-${suffix}`,
    name,
    versionInfo: version,
    downloadLocation: metadata.resolved ?? 'NOASSERTION',
    filesAnalyzed: false,
    externalRefs: [{ referenceCategory: 'PACKAGE-MANAGER', referenceType: 'purl', referenceLocator: `pkg:npm/${encodeURIComponent(name)}@${version}` }],
  }
})

const document = {
  spdxVersion: 'SPDX-2.3',
  dataLicense: 'CC0-1.0',
  SPDXID: 'SPDXRef-DOCUMENT',
  name: 'TranGiaMinhTam-portfolio-production-sbom',
  documentNamespace: `https://trangiaminhtam.github.io/spdx/${createHash('sha256').update(JSON.stringify(lock)).digest('hex')}`,
  creationInfo: { created: new Date().toISOString(), creators: [`Tool: node-${process.version}`] },
  packages,
  relationships: packages.map(({ SPDXID }) => ({ spdxElementId: 'SPDXRef-DOCUMENT', relationshipType: 'DESCRIBES', relatedSpdxElement: SPDXID })),
}

const findings = []
if (new Set(packages.map(({ SPDXID }) => SPDXID)).size !== packages.length) findings.push({ code: 'U06-SBOM-DUPLICATE-ID', severity: 'blocking' })
if (packages.length !== packageEntries.length) findings.push({ code: 'U06-SBOM-INCOMPLETE', severity: 'blocking' })
await writeReport('sbom.spdx.json', document)
const report = await writeReport('sbom-validation.json', { schemaVersion: 1, format: document.spdxVersion, packageCount: packages.length, output: path.relative(root, path.join(evidenceRoot, 'sbom.spdx.json')), findings, passed: findings.length === 0 })
printReport(report)
if (!report.passed) process.exitCode = 1
