import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { printReport, root, writeReport } from './reports.mjs'

const { values } = parseArgs({ options: { workflow: { type: 'string', default: '.github/workflows/deploy.yml' }, candidate: { type: 'boolean', default: false } } })
const workflowPath = path.resolve(root, values.workflow)
const workflow = await readFile(workflowPath, 'utf8')
const actionReferences = [...workflow.matchAll(/^\s*uses:\s*([^\s#]+)\s*$/gmu)].map((match) => match[1])
const mutableActions = actionReferences.filter((reference) => !/@[a-f0-9]{40}$/u.test(reference))
const findings = []
if (mutableActions.length > 0) findings.push({ code: 'U06-CI-MUTABLE-ACTION', severity: 'blocking', references: mutableActions })
if (!/^permissions:\s*\n(?:\s+[^\n]+\n)+/mu.test(workflow)) findings.push({ code: 'U06-CI-PERMISSIONS-MISSING', severity: 'blocking' })
if (!workflow.includes('npm ci')) findings.push({ code: 'U06-CI-NONDETERMINISTIC-INSTALL', severity: 'blocking' })
if (!workflow.includes("node-version: '20'") && !workflow.includes('node-version: 20')) findings.push({ code: 'U06-CI-NODE-VERSION', severity: 'blocking' })
if (values.candidate && !workflow.includes('verify:security-delivery:candidate')) findings.push({ code: 'U06-CI-INTEGRATED-GATE-MISSING', severity: 'blocking' })
const report = await writeReport(values.candidate ? 'candidate-ci-integrity.json' : 'active-ci-integrity.json', { schemaVersion: 1, workflow: path.relative(root, workflowPath), actionReferences, mutableActions, findings, passed: findings.length === 0 })
printReport(report)
if (!report.passed) process.exitCode = 1
