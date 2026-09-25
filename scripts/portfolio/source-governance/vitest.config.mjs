import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['scripts/portfolio/source-governance/tests/**/*.test.mjs'],
    // recovery.example.test.mjs verifies a developer-machine disaster-recovery
    // snapshot under .aidlc-recovery/, which is gitignored (40MB local backup
    // tied to a specific past revision) and never present in CI checkouts.
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{git,cache,output,temp}/**',
      '**/tests/recovery.example.test.mjs',
    ],
    setupFiles: [],
  },
})
