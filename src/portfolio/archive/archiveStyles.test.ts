import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const styles = fs.readFileSync('src/portfolio/archive/ArchiveExplorer.module.css', 'utf8')

describe('archive card styles', () => {
  it('gives every evidence card an internal gutter and one fixed preview ratio', () => {
    expect(styles).toMatch(/\.cardGrid\s*\{[^}]*gap:\s*clamp\(/s)
    expect(styles).toMatch(/\.card\s*\{[^}]*padding:\s*var\(--space-4\)/s)
    expect(styles).toMatch(/\.imageFrame,[\s\S]*\.documentFrame,[\s\S]*\.originalFrame\s*\{[^}]*aspect-ratio:\s*4 \/ 3/s)
    expect(styles).toMatch(/\.imageFrame img,[\s\S]*\.documentFrame img\s*\{[^}]*object-fit:\s*cover/s)
    expect(styles).not.toMatch(/\.documentFrame\s*\{[^}]*aspect-ratio:\s*3 \/ 4/s)
  })
})
