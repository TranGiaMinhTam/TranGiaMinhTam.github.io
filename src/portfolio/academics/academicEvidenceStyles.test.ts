import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const styles = fs.readFileSync('src/portfolio/academics/AcademicEvidence.module.css', 'utf8')

describe('U-05 academic and evidence styles', () => {
  it('defines distinct curriculum and archival geometry with local responsive behavior', () => {
    expect(styles).toMatch(/\.stratum[\s\S]*grid-template-columns/)
    expect(styles).toMatch(/\.archiveRow[\s\S]*grid-template-columns/)
    expect(styles).toMatch(/\.spectrumTrack[\s\S]*repeating-linear-gradient/)
    expect(styles).toMatch(/\.spectrumBlock\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)/)
    expect(styles).toMatch(/\.spectrumSemantic\s*\{[^}]*repeat\(4, minmax\(0, 1fr\)\)/)
    expect(styles).toMatch(/@media \(max-width: 1100px\)/)
    expect(styles).toMatch(/@media \(max-width: 760px\)/)
    expect(styles).toMatch(/@media \(prefers-reduced-motion: reduce\)/)
    expect(styles).toMatch(/var\(--color-/)
    expect(styles).not.toMatch(/!important|position:\s*fixed|100vw|\.timeline|\.cardGrid|\.carousel/i)
  })

  it('preserves focus, removes table overflow, and reserves image geometry', () => {
    expect(styles).toMatch(/\.evidenceAction:focus-visible/)
    expect(styles).not.toMatch(/\.relationshipSummary|overflow-x:\s*auto/)
    expect(styles).toMatch(/\.imageFrame[\s\S]*overflow:\s*hidden/)
  })

  it('uses defined design tokens and one shared archive alignment grid', () => {
    expect(styles).not.toMatch(/--space-(?:5|7|10|12|14|16)\b|--color-(?:rule-strong|surface-muted)\b|--font-display\b/)
    expect(styles).toMatch(/--archive-index-column:\s*4rem/)
    expect(styles).toMatch(/--archive-document-column:\s*5rem/)
    expect(styles).toMatch(/\.groupHeader\s*\{[^}]*grid-template-columns:\s*var\(--archive-index-column\)\s+var\(--archive-document-column\)/)
    expect(styles).toMatch(/\.archiveRow\s*\{[^}]*grid-template-columns:\s*var\(--archive-index-column\)/)
    expect(styles).toMatch(/\.documentPreview\s*\{[^}]*grid-template-columns:\s*var\(--archive-document-column\)/)
    expect(styles).not.toMatch(/\.stratum:nth-child\(2\)\s*\{[^}]*margin-inline-start/)
    expect(styles).toMatch(/\.resultsCell:last-child\s*\{[^}]*grid-column:\s*4\s*\/\s*-1/)
    expect(styles).not.toMatch(/\.stratumIndex\s*\{[^}]*border-inline-end/)
  })
})
