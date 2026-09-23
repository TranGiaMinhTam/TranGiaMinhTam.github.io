import { isSectionId } from '../model/sectionRegistry'
import type { SectionId } from '../model/portfolio.types'
import type { HashResolution } from './shell.types'

const JOURNAL_HASH = /^#\/journal\/[a-z0-9]+(?:-[a-z0-9]+)*$/

export function sectionHash(sectionId: SectionId): `#${SectionId}` {
  return `#${sectionId}`
}

export function resolveSectionHash(rawHash: string): HashResolution {
  if (JOURNAL_HASH.test(rawHash)) return { kind: 'journal', hash: rawHash }

  const candidate = rawHash.startsWith('#') ? rawHash.slice(1) : rawHash
  if (isSectionId(candidate)) {
    return {
      kind: 'section',
      sectionId: candidate,
      normalizedHash: sectionHash(candidate),
    }
  }

  return { kind: 'invalid', sectionId: 'identity', replacementHash: '#identity' }
}

