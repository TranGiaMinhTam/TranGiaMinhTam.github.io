import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const styles = fs.readFileSync('src/portfolio/research/ResearchData.module.css', 'utf8')

describe('U-04 research styles', () => {
  it('uses local responsive geometry, focus inheritance, and reduced-motion support', () => {
    expect(styles).toMatch(/\.pipeline[\s\S]*grid-template-columns/)
    expect(styles).toMatch(/\.bench li[^}]*border-radius/)
    expect(styles).toMatch(/\.simLseProject\s*\{[^}]*grid-template-columns:[^}]*border:/s)
    expect(styles).toMatch(/\.signalSheet\s*\{[^}]*grid-column:\s*1[^}]*min-block-size:\s*0[^}]*background:\s*var\(--color-surface\)/s)
    expect(styles).toMatch(/\.analysisContext\s*\{[^}]*grid-column:\s*2[^}]*min-block-size:\s*0/s)
    expect(styles).toMatch(/\.innovationPreview\s*\{[^}]*grid-column:\s*1 \/ -1[^}]*padding:\s*clamp\(var\(--space-6\)/s)
    expect(styles).toMatch(/\.fullWidthSummary\s*\{[^}]*grid-column:\s*1 \/ -1/s)
    expect(styles).toMatch(/\.laboratoryField\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)/)
    expect(styles).toMatch(/\.specimenLabel\s*\{[^}]*grid-template-columns:[^}]*padding:/s)
    expect(styles).toMatch(/@media \(max-width: 48rem\)/)
    expect(styles).toMatch(/@media \(max-width: 30rem\)/)
    expect(styles).toMatch(/@media \(prefers-reduced-motion: reduce\)/)
    expect(styles).toMatch(/var\(--color-/)
    expect(styles).not.toMatch(/var\(--space-(5|7|9)\)/)
    expect(styles).not.toMatch(/!important|position:\s*fixed|100vw|\.card|\.timeline|\.sidebar/i)
  })

  it('keeps evidence targets and bounded grids usable at narrow widths', () => {
    expect(styles).toMatch(/\.evidenceAction[\s\S]*min-height:\s*3rem/)
    expect(styles).toMatch(/\.bench ol[^}]*repeat\(5, minmax\(0, 1fr\)\)/)
    expect(styles).toMatch(/\.bench li strong[^}]*overflow-wrap:\s*normal/)
    expect(styles).not.toMatch(/\.relationshipSummary|repeating-linear-gradient|overflow-x:\s*auto/)
    expect(styles).not.toMatch(/\.signalSheet i|--signal-level/)
    expect(styles).toMatch(/\.pipeline li:not\(:last-child\)::after[\s\S]*content:\s*'↓'/)
  })
})
