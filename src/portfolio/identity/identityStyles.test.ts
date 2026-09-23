import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = fs.readFileSync('src/portfolio/identity/IdentityQuestions.module.css', 'utf8')

describe('identity and questions style boundary', () => {
  it('contains custom responsive, focus, media, and reduced-motion structures', () => {
    expect(css).toMatch(/grid-template-areas/)
    expect(css).toMatch(/aspect-ratio:\s*3\s*\/\s*4/)
    expect(css).toMatch(/\.portraitImage[\s\S]*object-position:\s*50%\s+38%/)
    expect(css).toMatch(/var\(--color-accent\)/)
    expect(css).toMatch(/@media \(max-width: 52rem\)/)
    expect(css).toMatch(/@media \(max-width: 30rem\)/)
    expect(css).toMatch(/prefers-reduced-motion/)
    expect(css).toMatch(/:focus|focus/)
    expect(css).toMatch(/\.identityField[\s\S]*border-inline-start:[\s\S]*background: var\(--color-surface\)/)
    expect(css).toMatch(/\.connectionLayer line \{ stroke: var\(--color-accent\);[\s\S]*opacity: 0\.78/)
    expect(css).toMatch(/\.questionsIntroduction[^}]*minmax\(0, 1\.35fr\)/)
    expect(css).not.toMatch(/\.relationshipSummary|overflow-x:\s*auto/)
  })

  it('contains none of the rejected layout or unsafe style patterns', () => {
    expect(css).not.toMatch(/!important/)
    expect(css).not.toMatch(/sidebar|drawer|hamburger|layout-selector/i)
    expect(css).not.toMatch(/\.card(?:\b|[-_])/i)
    expect(css).not.toMatch(/\.timeline(?:\b|[-_])/i)
  })
})
