import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const root = process.cwd()
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/portfolio/u01/recovery-manifest.json'), 'utf8'))
const verification = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/portfolio/u01/recovery-verification.json'), 'utf8'))
const payloadRoot = path.join(root, manifest.payloadDirectory)
const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
const payloadChecks = [manifest.trackedPatch, manifest.untrackedArchive].map((item) => ({ path: item.path, expected: item.sha256, actual: sha256(path.join(payloadRoot, item.path)) }))
const members = execFileSync('tar', ['-tzf', path.join(payloadRoot, manifest.untrackedArchive.path)], { encoding: 'utf8' }).trim().split('\n').filter(Boolean)
const unsafeMembers = members.filter((item) => item.startsWith('/') || item.includes('../') || item.startsWith('src/assets/minh-tam/source/'))

const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((item) => {
  const resolved = path.join(directory, item.name)
  return item.isDirectory() ? walk(resolved) : [resolved]
})
const rawRoot = path.join(root, manifest.protectedSourceEvidence.path)
const rawLines = walk(rawRoot).map((file) => `${sha256(file)}  ${path.relative(root, file).replaceAll('\\', '/')}`).sort()
const rawInventorySha256 = crypto.createHash('sha256').update(`${rawLines.join('\n')}\n`).digest('hex')
const findings = []
for (const check of payloadChecks) if (check.actual !== check.expected) findings.push({ code: 'REC-003', target: check.path, message: 'Payload hash mismatch.' })
if (members.length !== manifest.untrackedArchive.memberCount) findings.push({ code: 'REC-003', target: 'untracked-application.tar.gz', message: 'Archive member count mismatch.' })
if (unsafeMembers.length) findings.push({ code: 'REC-003', target: 'untracked-application.tar.gz', message: 'Archive contains unsafe or protected members.' })
if (rawLines.length !== manifest.protectedSourceEvidence.fileCount || rawInventorySha256 !== manifest.protectedSourceEvidence.inventorySha256) findings.push({ code: 'REC-003', target: manifest.protectedSourceEvidence.path, message: 'Protected source inventory changed.' })
if (!verification.normalizedInventoryMatched || !verification.withinObjective) findings.push({ code: 'REC-003', target: 'recovery-verification.json', message: 'Restoration rehearsal is incomplete or outside its objective.' })
const report = { schemaVersion: 1, check: 'portfolio-recovery', payloadChecks, archiveMemberCount: members.length, unsafeMembers, protectedSourceFileCount: rawLines.length, protectedSourceInventorySha256: rawInventorySha256, findings, canProceed: findings.length === 0 }
console.log(JSON.stringify(report, null, 2))
process.exitCode = report.canProceed ? 0 : 1
