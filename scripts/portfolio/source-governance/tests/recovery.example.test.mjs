// @vitest-environment node
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { verifyRecoveryManifest } from '../recovery.mjs'

describe('source-governance recovery record', () => {
  it('verifies the approved pre-mutation payload', async () => {
    const workspaceRoot = process.cwd()
    const result = await verifyRecoveryManifest({
      workspaceRoot,
      manifestPath: path.join(workspaceRoot, '.aidlc-recovery/source-governance-safe-foundation/manifest.json'),
    })
    expect(result.findings).toEqual([])
    expect(result.canProceed).toBe(true)
    expect(result.manifest.protectedArchive.fileCount).toBe(122)
  })
})
