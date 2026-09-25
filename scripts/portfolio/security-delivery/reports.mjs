import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

export const root = process.cwd()
export const evidenceRoot = path.join(root, 'artifacts/portfolio/u06-security-delivery')

export const writeReport = async (filename, report) => {
  await mkdir(evidenceRoot, { recursive: true })
  await writeFile(path.join(evidenceRoot, filename), `${JSON.stringify(report, null, 2)}\n`)
  return report
}

export const printReport = (report) => process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
export const failOnFindings = (report) => {
  if ((report.findings ?? []).some(({ severity }) => severity === 'blocking')) process.exitCode = 1
}
