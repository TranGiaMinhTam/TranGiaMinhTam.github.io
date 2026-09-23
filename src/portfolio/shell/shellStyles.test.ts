import fs from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = fs.readFileSync('src/portfolio/shell/Shell.module.css', 'utf8')
const tokens = fs.readFileSync('src/portfolio/styles/tokens.css', 'utf8')

const hex = (value: string) => {
  const parts = value.match(/[a-f\d]{2}/gi)?.map((part) => Number.parseInt(part, 16) / 255) ?? []
  return parts.map((part) => part <= 0.04045 ? part / 12.92 : ((part + 0.055) / 1.055) ** 2.4)
}

const contrast = (foreground: string, background: string) => {
  const luminance = (value: string) => {
    const [red = 0, green = 0, blue = 0] = hex(value)
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue
  }
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
  return ((values[0] ?? 0) + 0.05) / ((values[1] ?? 0) + 0.05)
}

describe('shell style boundary', () => {
  it('owns fluid geometry, local overflow, focus, and reduced-motion behavior', () => {
    expect(css).toMatch(/grid-template-columns/)
    expect(css).toMatch(/\.locusNavigation[\s\S]*overflow-x: auto/)
    expect(css).toMatch(/\.scanSection\[data-custom-body\][\s\S]*1\.72fr/)
    expect(css).toMatch(/\.scanSection\[data-custom-body\] h2[\s\S]*font-size: clamp\(1\.5rem, 2\.25vw, 2\.75rem\)/)
    expect(css).toMatch(/@media \(max-width: 48rem\)[\s\S]*\.scanSection\[data-custom-body\][\s\S]*grid-template-columns: 1fr/)
    expect(css).toMatch(/scroll-margin-top/)
    expect(css).toMatch(/@media \(max-width: 48rem\)/)
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)/)
    expect(css).not.toMatch(/transparent 0 3\.9rem/)
    expect(css).not.toMatch(/sidebar|drawer|hamburger|casebook|notebook|quarto|!important/i)
  })

  it('keeps primary text contrast above 4.5 to 1 in both themes', () => {
    expect(tokens).toContain("[data-theme='dark']")
    expect(contrast('#10231d', '#f4f8f5')).toBeGreaterThanOrEqual(4.5)
    expect(contrast('#eef8f3', '#071510')).toBeGreaterThanOrEqual(4.5)
    expect(contrast('#ffffff', '#006651')).toBeGreaterThanOrEqual(4.5)
  })
})
