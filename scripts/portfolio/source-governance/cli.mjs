import { promoteManifestCandidate } from './generate-manifest.mjs'

const command = process.argv[2] ?? 'promote'

try {
  if (command !== 'promote') throw new Error('COMMAND_UNSUPPORTED')
  const result = await promoteManifestCandidate({ workspaceRoot: process.cwd() })
  process.stdout.write(`${JSON.stringify(result)}\n`)
} catch (error) {
  const code = error instanceof Error ? error.message : 'SOURCE_GOVERNANCE_FAILED'
  process.stderr.write(`${JSON.stringify({ ok: false, code })}\n`)
  process.exitCode = 1
}
