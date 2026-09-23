import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const styles = fs.readFileSync(path.resolve('src/portfolio/resume/ResumeContent.module.css'), 'utf8')

describe('resume presentation styles', () => {
  it('uses shared tokens and includes narrow, reduced-motion and forced-colors handling', () => {
    expect(styles).toMatch(/var\(--color-accent\)/)
    expect(styles).toMatch(/@media \(max-width: 36rem\)/)
    expect(styles).toMatch(/prefers-reduced-motion: reduce/)
    expect(styles).toMatch(/forced-colors: active/)
    expect(styles).not.toMatch(/!important/)
  })
})
