import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const css = fs.readFileSync(path.resolve('src/portfolio/styles/tokens.css'), 'utf8')
const hexToRgb = (hex: string) => [1, 3, 5].map((start) => Number.parseInt(hex.slice(start, start + 2), 16) / 255)
const luminance = (hex: string) => hexToRgb(hex).map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index]!, 0)
const contrast = (first: string, second: string) => {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a)
  return (values[0]! + 0.05) / (values[1]! + 0.05)
}
const declarations = (block: string) => Object.fromEntries([...block.matchAll(/(--[\w-]+):\s*(#[0-9a-f]{6})/gi)].map((match) => [match[1], match[2]]))

describe('semantic tokens', () => {
  it('defines required roles in both themes', () => {
    const blocks = [...css.matchAll(/(?:^|\n)(:root,[\s\S]*?\}|\[data-theme='dark'\][\s\S]*?\})/g)].map((match) => declarations(match[1]))
    for (const block of blocks) for (const role of ['--color-canvas', '--color-surface', '--color-text-primary', '--color-text-secondary', '--color-accent', '--color-focus', '--color-rule', '--color-data-positive', '--color-data-neutral', '--color-data-caution']) expect(block[role]).toMatch(/^#/)
  })

  it('meets approved primary, secondary, accent, and focus contrast pairs', () => {
    const light = declarations(css.slice(0, css.indexOf("[data-theme='dark']")))
    const dark = declarations(css.slice(css.indexOf("[data-theme='dark']")))
    for (const theme of [light, dark]) {
      expect(contrast(theme['--color-text-primary']!, theme['--color-canvas']!)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(theme['--color-text-secondary']!, theme['--color-canvas']!)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(theme['--color-accent']!, theme['--color-canvas']!)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(theme['--color-focus']!, theme['--color-canvas']!)).toBeGreaterThanOrEqual(3)
    }
  })
})
