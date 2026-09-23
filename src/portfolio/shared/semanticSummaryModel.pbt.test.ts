import { render, screen } from '@testing-library/react'
import fc from 'fast-check'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import { createMastheadPresentation } from '../shell/mastheadModel'
import { SemanticSummary } from './SemanticSummary'
import { projectSemanticSummary } from './semanticSummaryModel'

const settings = { numRuns: 100, seed: 20260921 }
const rowArbitrary = fc.record({ id: fc.uuid(), label: fc.string({ minLength: 1, maxLength: 80 }), value: fc.string({ minLength: 1, maxLength: 120 }) })
const project = (rows: readonly { id: string; label: string; value: string }[]) => projectSemanticSummary({
  id: 'property-summary', title: 'Property summary', source: rows,
  project: (row) => ({ id: row.id, primary: row.label, details: [{ label: 'Value', value: row.value }] }),
})

describe('U-02 semantic and masthead properties', () => {
  it('U02-P01 preserves semantic membership', () => fc.assert(fc.property(fc.uniqueArray(rowArbitrary, { selector: (row) => row.id }), (rows) => {
    expect(project(rows).model.rows.map(({ id }) => id).sort()).toEqual(rows.map(({ id }) => id).sort())
  }), settings))
  it('U02-P02 preserves source order', () => fc.assert(fc.property(fc.uniqueArray(rowArbitrary, { selector: (row) => row.id }), (rows) => {
    expect(project(rows).model.rows.map(({ id }) => id)).toEqual(rows.map(({ id }) => id))
  }), settings))
  it('U02-P03 is deterministic', () => fc.assert(fc.property(fc.array(rowArbitrary), (rows) => {
    expect(project(rows)).toEqual(project(rows))
  }), settings))
  it('U02-P04 returns immutable outer structures', () => fc.assert(fc.property(fc.array(rowArbitrary), (rows) => {
    const result = project(rows); expect(Object.isFrozen(result.model)).toBe(true); expect(Object.isFrozen(result.model.rows)).toBe(true)
  }), settings))
  it('U02-P05 reports duplicate row identifiers stably', () => fc.assert(fc.property(rowArbitrary, (row) => {
    expect(project([row, row]).findings.map(({ code }) => code)).toContain('U02-SEM-ROW-DUPLICATE')
  }), settings))
  it('U02-P06 reports blank primary labels', () => fc.assert(fc.property(fc.uuid(), fc.string({ minLength: 1 }), (id, value) => {
    expect(project([{ id, label: ' ', value }]).findings.map(({ code }) => code)).toContain('U02-SEM-ROW-EMPTY')
  }), settings))
  it('U02-P07 preserves long labels without truncating content', () => fc.assert(fc.property(fc.string({ minLength: 100, maxLength: 500 }), (label) => {
    expect(project([{ id: 'long', label, value: 'value' }]).model.rows[0]?.primary).toBe(label)
  }), settings))
  it('U02-P08 renders unsafe-looking strings as text', () => fc.assert(fc.property(fc.string({ minLength: 1, maxLength: 40 }), (suffix) => {
    const unsafe = `<script>${suffix}</script>`; const { container, unmount } = render(createElement(SemanticSummary, { model: project([{ id: 'unsafe', label: unsafe, value: 'safe' }]).model }))
    expect(screen.getByText(unsafe)).toBeInTheDocument(); expect(container.querySelector('script')).toBeNull(); unmount()
  }), settings))
  it('U02-P09 always names the opposite theme action', () => fc.assert(fc.property(fc.constantFrom('light' as const, 'dark' as const), (theme) => {
    const result = createMastheadPresentation(theme); expect(result.nextTheme).not.toBe(theme); expect(result.themeActionLabel).toContain(result.nextTheme)
  }), settings))
  it('U02-P10 keeps the masthead model deterministic', () => fc.assert(fc.property(fc.constantFrom('light' as const, 'dark' as const), (theme) => {
    expect(createMastheadPresentation(theme)).toEqual(createMastheadPresentation(theme))
  }), settings))
})
