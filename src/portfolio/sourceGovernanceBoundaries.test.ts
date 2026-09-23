import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const browserEntries = ['src/App.tsx', 'src/main.tsx', 'src/portfolio/index.ts']
const forbidden = /source-governance|portfolio\/archive|assets\/generated\/minh-tam|archive-manifest\.json/u

describe('U-01 browser activation boundary', () => {
  it.each(browserEntries)('keeps governed catalog and Node tooling out of %s', (relativePath) => {
    const source = readFileSync(path.resolve(process.cwd(), relativePath), 'utf8')
    expect(source).not.toMatch(forbidden)
  })
})
