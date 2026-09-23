import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const styles = fs.readFileSync('src/portfolio/research/ResearchData.module.css', 'utf8')

describe('U-04 research styles', () => {
  it('uses local responsive geometry, focus inheritance, and reduced-motion support', () => {
    expect(styles).toMatch(/\.pipeline[\s\S]*grid-template-columns/)
    expect(styles).toMatch(/\.bench li[^}]*border-radius/)
    expect(styles).toMatch(/\.signalSheet[\s\S]*repeating-linear-gradient/)
    expect(styles).toMatch(/\.laboratoryField\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)/)
    expect(styles).toMatch(/\.specimenLabel\s*\{[^}]*grid-template-columns:[^}]*padding:/s)
    expect(styles).toMatch(/@media \(max-width: 48rem\)/)
    expect(styles).toMatch(/@media \(max-width: 30rem\)/)
    expect(styles).toMatch(/@media \(prefers-reduced-motion: reduce\)/)
    expect(styles).toMatch(/var\(--color-/)
    expect(styles).not.toMatch(/!important|position:\s*fixed|100vw|\.card|\.timeline|\.sidebar/i)
  })

  it('keeps evidence targets and bounded grids usable at narrow widths', () => {
    expect(styles).toMatch(/\.evidenceAction[\s\S]*min-height:\s*3rem/)
    expect(styles).toMatch(/\.bench ol[^}]*repeat\(5, minmax\(0, 1fr\)\)/)
    expect(styles).toMatch(/\.bench li strong[^}]*overflow-wrap:\s*normal/)
    expect(styles).not.toMatch(/\.relationshipSummary|overflow-x:\s*auto/)
    expect(styles).toMatch(/\.pipeline li:not\(:last-child\)::after[\s\S]*content:\s*'↓'/)
  })
})
