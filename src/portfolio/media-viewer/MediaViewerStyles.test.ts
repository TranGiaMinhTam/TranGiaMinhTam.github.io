import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const viewer = fs.readFileSync('src/portfolio/media-viewer/MediaViewer.module.css', 'utf8')
const academic = fs.readFileSync('src/portfolio/academics/AcademicEvidence.module.css', 'utf8')
const research = fs.readFileSync('src/portfolio/research/ResearchData.module.css', 'utf8')
const archive = fs.readFileSync('src/portfolio/archive/ArchiveExplorer.module.css', 'utf8')

describe('media viewer geometry and interaction styles', () => {
  it('contains full media while keeping cards at stable crop/preview ratios', () => {
    expect(viewer).toMatch(/\.imageFrame img[\s\S]*object-fit:\s*contain/)
    expect(academic).toMatch(/\.imageFrame[\s\S]*aspect-ratio:\s*4 \/ 3/)
    expect(research).toMatch(/\.researchFigure img[\s\S]*aspect-ratio:\s*4 \/ 3[\s\S]*object-fit:\s*cover/)
    expect(archive).toMatch(/\.imageFrame[\s\S]*aspect-ratio:\s*4 \/ 3/)
    expect(archive).toMatch(/\.documentFrame[\s\S]*aspect-ratio:\s*3 \/ 4/)
  })

  it('uses bounded geometry, touch targets, narrow safe areas, reduced motion, and visible focus', () => {
    expect(viewer).toMatch(/min-inline-size:\s*2\.75rem/)
    expect(viewer).toMatch(/env\(safe-area-inset-top\)/)
    expect(viewer).toMatch(/@media \(prefers-reduced-motion:\s*reduce\)/)
    expect(viewer).toMatch(/:focus-visible/)
    expect(viewer).not.toMatch(/inline-size:\s*100vw|!important/)
  })
})
