import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const styles = fs.readFileSync('src/portfolio/impact/ToolsFieldwork.module.css', 'utf8')

describe('U-06 tools and fieldwork styles', () => {
  it('defines distinct category and activity geometry with local responsive behavior', () => {
    expect(styles).toMatch(/\.categories[\s\S]*grid-template-columns/)
    expect(styles).toMatch(/\.groupRecords[\s\S]*display:\s*grid/)
    expect(styles).toMatch(/@media \(max-width: 760px\)/)
    expect(styles).toMatch(/var\(--color-/)
    expect(styles).not.toMatch(/!important|position:\s*fixed|100vw|\.timeline|\.cardGrid|\.carousel|\.ledger/i)
  })

  it('provides an opaque reading surface and resets explanatory copy', () => {
    expect(styles).toMatch(/\.tools,[\s\S]*background:\s*var\(--color-surface\)/)
    expect(styles).toMatch(/\.headerNote\s*\{[^}]*font:[^}]*var\(--font-body\)/)
    expect(styles).toMatch(/\.headerNote\s*\{[^}]*text-transform:\s*none/)
  })

  it('preserves visible focus for interactive context links', () => {
    expect(styles).toMatch(/\.contextLink:focus-visible/)
    expect(styles).toMatch(/\.contextLink\s*\{[^}]*min-block-size/)
    expect(styles).toMatch(/\.toolList li\s*\{[^}]*grid-template-columns[^}]*align-items:\s*start/)
    expect(styles).toMatch(/\.categories\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)/)
    expect(styles).toMatch(/\.toolConnections\s*\{[^}]*display:\s*grid/)
    expect(styles).toMatch(/\.classificationMarker\s*\{[^}]*min-block-size:\s*2\.5rem/)
    expect(styles).toMatch(/\.activityRecord\s*\{[^}]*grid-template-columns/)
  })

  it('uses defined design tokens only', () => {
    expect(styles).not.toMatch(/--space-(?:5|7|10|12|14|16)\b|--color-(?:rule-strong|surface-muted)\b|--font-display\b/)
  })
})
