import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['scripts/portfolio/source-governance/tests/**/*.test.mjs'],
    setupFiles: [],
  },
})
