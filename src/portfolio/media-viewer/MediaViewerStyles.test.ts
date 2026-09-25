import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const viewer = fs.readFileSync('src/portfolio/media-viewer/MediaViewer.module.css', 'utf8')
const academic = fs.readFileSync('src/portfolio/academics/AcademicEvidence.module.css', 'utf8')
const research = fs.readFileSync('src/portfolio/research/ResearchData.module.css', 'utf8')
const archive = fs.readFileSync('src/portfolio/archive/ArchiveExplorer.module.css', 'utf8')

describe('media viewer geometry and interaction styles', () => {
  it('contains full media while keeping cards at stable crop/preview ratios', () => {
    expect(viewer).toMatch(/\.imageFrame img[\s\S]*inline-size:\s*100%[\s\S]*block-size:\s*auto[\s\S]*object-fit:\s*contain/)
    expect(viewer).toMatch(/\.imageFrame\s*\{[^}]*max-block-size:[^}]*padding:\s*clamp\(var\(--space-3\),\s*2vw,\s*var\(--space-6\)\)[^}]*overflow:\s*auto/s)
    expect(academic).toMatch(/\.imageFrame[\s\S]*aspect-ratio:\s*4 \/ 3/)
    expect(research).toMatch(/\.researchFigure img[\s\S]*aspect-ratio:\s*4 \/ 3[\s\S]*object-fit:\s*cover/)
    expect(archive).toMatch(/\.imageFrame[\s\S]*aspect-ratio:\s*4 \/ 3/)
    expect(archive).toMatch(/\.imageFrame,[\s\S]*\.documentFrame,[\s\S]*\.originalFrame[\s\S]*aspect-ratio:\s*4 \/ 3/)
  })

  it('uses bounded geometry, touch targets, narrow safe areas, reduced motion, and visible focus', () => {
    expect(viewer).toMatch(/min-inline-size:\s*2\.75rem/)
    expect(viewer).toMatch(/env\(safe-area-inset-top\)/)
    expect(viewer).toMatch(/@media \(prefers-reduced-motion:\s*reduce\)/)
    expect(viewer).toMatch(/:focus-visible/)
    expect(viewer).not.toMatch(/var\(--space-(5|7|9)\)/)
    expect(viewer).not.toMatch(/inline-size:\s*100vw|!important/)
  })
})
