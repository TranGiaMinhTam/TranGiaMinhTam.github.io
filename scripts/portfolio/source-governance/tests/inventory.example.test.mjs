// @vitest-environment node
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { inventoryArchive, validateCapacity } from '../inventory.mjs'

const temporaryRoots = []

afterEach(async () => {
  await Promise.all(temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })))
})

describe('streaming archive inventory', () => {
  it('reconciles the complete protected archive deterministically', async () => {
    const workspaceRoot = process.cwd()
    const first = await inventoryArchive({ workspaceRoot, sourceRoot: path.join(workspaceRoot, 'src/assets/minh-tam') })
    const second = await inventoryArchive({ workspaceRoot, sourceRoot: path.join(workspaceRoot, 'src/assets/minh-tam') })
    expect(first.report).toMatchObject({ canProceed: true, blockingCount: 0 })
    expect(first.summary.fileCount).toBe(127)
    expect(first.summary.totalBytes).toBe(311218906)
    expect(second.facts).toEqual(first.facts)
  }, 60_000)

  it('rejects a signature and extension conflict without dropping accountability', async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), 'u01-inventory-'))
    temporaryRoots.push(root)
    const sourceRoot = path.join(root, 'archive')
    await mkdir(sourceRoot)
    await writeFile(path.join(sourceRoot, 'not-a-pdf.pdf'), 'plain text')
    const result = await inventoryArchive({ workspaceRoot: root, sourceRoot })
    expect(result.facts).toEqual([])
    expect(result.report.findings).toMatchObject([{ code: 'U01-INV-TYPE', severity: 'blocking' }])
  })

  it('marks architecture review at either approved capacity boundary', () => {
    expect(validateCapacity({ fileCount: 500, totalBytes: 1024 ** 3, maxFiles: 500, maxBytes: 1024 ** 3 }).withinCapacity).toBe(true)
    expect(validateCapacity({ fileCount: 501, totalBytes: 1, maxFiles: 500, maxBytes: 1024 ** 3 }).exceeded).toEqual(['file-count'])
  })
})
