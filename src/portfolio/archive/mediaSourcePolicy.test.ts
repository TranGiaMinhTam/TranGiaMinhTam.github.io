import { describe, expect, it } from 'vitest'
import { asCanonicalAssetId } from './archive.types'
import { resolveMediaSource } from './mediaSourcePolicy'

const policy = Object.freeze({
  ownedAssetIds: new Set(['asset-001']),
  approvedHttpsOrigins: new Set(['https://media.example.test']),
})

describe('media source policy', () => {
  it('accepts an owned bundled source', () => {
    expect(resolveMediaSource({ kind: 'local', assetId: asCanonicalAssetId('asset-001'), href: '/assets/item.pdf', mediaType: 'application/pdf' }, policy).ok).toBe(true)
  })

  it.each(['javascript:alert(1)', 'file:///tmp/private.pdf', 'data:text/html,test', 'https://unknown.example/item.pdf'])(
    'rejects unsafe or unapproved source %s',
    (href) => expect(resolveMediaSource({ kind: 'https', href, mediaType: 'application/pdf' }, policy).ok).toBe(false),
  )

  it('does not echo a rejected source', () => {
    const result = resolveMediaSource({ kind: 'https', href: 'javascript:private-value', mediaType: 'application/pdf' }, policy)
    expect(JSON.stringify(result)).not.toContain('private-value')
  })
})
