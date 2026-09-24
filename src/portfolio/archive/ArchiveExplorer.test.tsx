import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ArchiveExplorer } from './ArchiveExplorer'
import { asArchiveGroupId, asCanonicalAssetId, type ArchiveGroupData, type ArchiveGroupSummary } from './archive.types'

afterEach(() => cleanup())

const summary = Object.freeze({
  id: asArchiveGroupId('test-gallery'),
  label: 'Test Gallery',
  description: 'A bounded test gallery.',
  order: 1,
  count: 1,
  imageCount: 1,
  documentCount: 0,
  originalCount: 0,
}) satisfies ArchiveGroupSummary

const group = Object.freeze({
  id: summary.id,
  label: summary.label,
  description: summary.description,
  order: summary.order,
  items: Object.freeze([Object.freeze({
    id: asCanonicalAssetId('asset-test'),
    kind: 'image',
    title: 'Field photograph',
    caption: 'A project activity photograph.',
    accessibilityText: 'A project activity photograph.',
    subcollection: 'Field Project',
    order: 1,
    originalHref: '/field-original.jpg',
    originalMediaType: 'image/jpeg',
    thumbnailHref: '/field-thumbnail.webp',
    width: 640,
    height: 480,
  })]),
}) satisfies ArchiveGroupData

describe('U-04 Archive Explorer', () => {
  it('starts summary-only and loads one selected group through a button', async () => {
    const loadGroup = vi.fn(async () => ({ ok: true as const, group, cached: false }))
    render(<ArchiveExplorer summaries={[summary]} loadGroup={loadGroup} />)
    const button = screen.getByRole('button', { name: /test gallery/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByAltText('A project activity photograph.')).not.toBeInTheDocument()
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(await screen.findByRole('heading', { name: 'Field Project' })).toBeInTheDocument()
    expect(screen.getByAltText('A project activity photograph.')).toHaveAttribute('loading', 'lazy')
    expect(loadGroup).toHaveBeenCalledTimes(1)
  })

  it('exposes a typed detail action without implementing a dialog', async () => {
    const onDetail = vi.fn()
    render(<ArchiveExplorer summaries={[summary]} loadGroup={async () => ({ ok: true, group, cached: false })} onDetail={onDetail} />)
    fireEvent.click(screen.getByRole('button', { name: /test gallery/i }))
    fireEvent.click(await screen.findByRole('button', { name: /view larger image/i }))
    expect(onDetail).toHaveBeenCalledWith(expect.objectContaining({ id: 'asset-test', kind: 'image', href: '/field-original.jpg' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('retains navigation and retries visitor-safe loader failures', async () => {
    const loadGroup = vi.fn()
      .mockResolvedValueOnce({ ok: false, code: 'ARCHIVE_GROUP_LOAD_FAILED', publicMessage: 'This group could not be loaded. Please try again.' })
      .mockResolvedValueOnce({ ok: true, group, cached: false })
    render(<ArchiveExplorer summaries={[summary]} loadGroup={loadGroup} />)
    fireEvent.click(screen.getByRole('button', { name: /test gallery/i }))
    fireEvent.click(await screen.findByRole('button', { name: 'Retry' }))
    await waitFor(() => expect(loadGroup).toHaveBeenCalledTimes(2))
    expect(await screen.findByRole('heading', { name: 'Field Project' })).toBeInTheDocument()
  })
})
