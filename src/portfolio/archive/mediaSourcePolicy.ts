import type { MediaSourceCandidate, MediaSourceResolution } from './archive.types'

const hasControlCharacter = (value: string): boolean => [...value].some((character) => {
  const codePoint = character.codePointAt(0) ?? 0
  return codePoint <= 31 || codePoint === 127
})

export type MediaSourcePolicy = Readonly<{
  ownedAssetIds: ReadonlySet<string>
  approvedHttpsOrigins: ReadonlySet<string>
}>

const reject = (code: 'MEDIA_LOCAL_UNOWNED' | 'MEDIA_SOURCE_INVALID' | 'MEDIA_SOURCE_UNAPPROVED'): MediaSourceResolution =>
  Object.freeze({ ok: false, code, publicMessage: 'Media unavailable.' })

export const resolveMediaSource = (candidate: MediaSourceCandidate, policy: MediaSourcePolicy): MediaSourceResolution => {
  if (hasControlCharacter(candidate.href) || candidate.href.includes('\\') || candidate.href.split('/').includes('..')) {
    return reject('MEDIA_SOURCE_INVALID')
  }
  if (candidate.kind === 'local') {
    if (!policy.ownedAssetIds.has(candidate.assetId)) return reject('MEDIA_LOCAL_UNOWNED')
    if (!(candidate.href.startsWith('/') || candidate.href.startsWith('./'))) return reject('MEDIA_SOURCE_INVALID')
    return Object.freeze({ ok: true, source: Object.freeze({ kind: 'local', href: candidate.href, mediaType: candidate.mediaType }) })
  }
  try {
    const parsed = new URL(candidate.href)
    if (parsed.protocol !== 'https:' || !policy.approvedHttpsOrigins.has(parsed.origin)) return reject('MEDIA_SOURCE_UNAPPROVED')
    return Object.freeze({ ok: true, source: Object.freeze({ kind: 'https', href: parsed.href, mediaType: candidate.mediaType }) })
  } catch {
    return reject('MEDIA_SOURCE_INVALID')
  }
}
