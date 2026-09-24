import { describe, expect, it } from 'vitest'
import { createImageViewerGroup, IMAGE_EMBED_LIMIT_BYTES, PDF_EMBED_LIMIT_BYTES, resolveImageCapability, resolvePdfCapability } from './mediaCapability'

describe('viewer capability admission', () => {
  it('admits same-origin PDFs and bounds embedding by byte size', () => {
    const accepted = resolvePdfCapability({ id: 'pdf-1', title: 'Paper', description: 'Description', context: 'Research', href: '/assets/paper.pdf', bytes: PDF_EMBED_LIMIT_BYTES })
    expect(accepted.ok && accepted.capability.embedAllowed).toBe(true)
    const oversized = resolvePdfCapability({ id: 'pdf-2', title: 'Paper', description: 'Description', context: 'Research', href: '/assets/paper.pdf', bytes: PDF_EMBED_LIMIT_BYTES + 1 })
    expect(oversized.ok && oversized.capability.embedAllowed).toBe(false)
  })

  it.each(['javascript:alert(1)', 'file:///private.pdf', 'data:text/html,test', '../private.pdf', 'https://unapproved.example/paper.pdf'])(
    'rejects unsafe source %s without reflecting it',
    (href) => {
      const result = resolvePdfCapability({ id: 'pdf', title: 'Paper', description: 'Description', context: 'Research', href })
      expect(result.ok).toBe(false)
      expect(JSON.stringify(result)).not.toContain(href)
    },
  )

  it('requires positive image geometry and preserves an immutable non-empty group', () => {
    expect(resolveImageCapability({ id: 'bad', title: 'Image', description: 'Description', context: 'Research', href: '/assets/image.jpg', width: 0, height: 10, alt: 'Alt' }).ok).toBe(false)
    const result = resolveImageCapability({ id: 'image', title: 'Image', description: 'Description', context: 'Research', href: '/assets/image.jpg', bytes: IMAGE_EMBED_LIMIT_BYTES, width: 640, height: 480, alt: 'Alt' })
    expect(result.ok).toBe(true)
    if (!result.ok) throw new Error('Expected image capability.')
    expect(createImageViewerGroup('group', 'Group', [])).toBeUndefined()
    expect(createImageViewerGroup('group', 'Group', [result.capability])?.items).toEqual([result.capability])
  })
})
