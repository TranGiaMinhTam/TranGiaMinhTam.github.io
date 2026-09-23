import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { sectionRegistry } from '../model/sectionRegistry'
import type { SectionId } from '../model/portfolio.types'
import {
  canEnhanceHistory,
  createVisibilityController,
  readMediaPreference,
  writeSectionHistory,
} from './browserAdapters'
import { deriveProgress } from './progress'
import { resolveSectionHash, sectionHash } from './sectionHash'
import type { NavigationIntent, ShellFinding } from './shell.types'
import { selectVisibilityWinner } from './visibility'

export type SectionProgressController = Readonly<{
  activeSectionId: SectionId
  progress: ReturnType<typeof deriveProgress>
  findings: readonly ShellFinding[]
  registerTarget: (sectionId: SectionId, element: HTMLElement | null) => void
  navigate: (sectionId: SectionId) => boolean
}>

export function useSectionProgress(): SectionProgressController {
  const [initialResolution] = useState(() => resolveSectionHash(typeof window === 'undefined' ? '' : window.location.hash))
  const [activeSectionId, setActiveSectionId] = useState<SectionId>(() => (
    initialResolution.kind === 'section' ? initialResolution.sectionId : 'identity'
  ))
  const [findings, setFindings] = useState<readonly ShellFinding[]>([])
  const activeRef = useRef(activeSectionId)
  const intentRef = useRef<NavigationIntent | undefined>(undefined)
  const sequenceRef = useRef(0)
  const targetMap = useRef(new Map<SectionId, HTMLElement>())
  const visibilityRef = useRef<ReturnType<typeof createVisibilityController> | undefined>(undefined)

  const commitActive = useCallback((next: SectionId) => {
    if (activeRef.current === next) return
    activeRef.current = next
    setActiveSectionId(next)
  }, [])

  const recordFinding = useCallback((finding: ShellFinding) => {
    setFindings((current) => current.some((item) => item.code === finding.code) ? current : [...current, finding])
  }, [])

  useEffect(() => {
    const controller = createVisibilityController((facts) => {
      const next = selectVisibilityWinner(facts, activeRef.current, intentRef.current)
      intentRef.current = undefined
      if (next !== activeRef.current) {
        commitActive(next)
        writeSectionHistory('replace', sectionHash(next))
      }
    }, recordFinding)
    visibilityRef.current = controller
    for (const [sectionId, element] of targetMap.current) controller.register(sectionId, element)

    const onLocation = () => {
      const resolution = resolveSectionHash(window.location.hash)
      if (resolution.kind === 'journal') return
      const next = resolution.sectionId
      if (resolution.kind === 'invalid') writeSectionHistory('replace', resolution.replacementHash)
      commitActive(next)
      window.requestAnimationFrame(() => {
        targetMap.current.get(next)?.scrollIntoView({
          block: 'start',
          behavior: readMediaPreference('(prefers-reduced-motion: reduce)') ? 'auto' : 'smooth',
        })
      })
    }
    window.addEventListener('hashchange', onLocation)
    window.addEventListener('popstate', onLocation)

    if (initialResolution.kind === 'invalid' && window.location.hash) {
      writeSectionHistory('replace', initialResolution.replacementHash)
    } else if (initialResolution.kind === 'section' && window.location.hash) {
      window.requestAnimationFrame(() => targetMap.current.get(initialResolution.sectionId)?.scrollIntoView({ block: 'start' }))
    }

    return () => {
      controller.disconnect()
      visibilityRef.current = undefined
      window.removeEventListener('hashchange', onLocation)
      window.removeEventListener('popstate', onLocation)
    }
  }, [commitActive, initialResolution, recordFinding])

  const registerTarget = useCallback((sectionId: SectionId, element: HTMLElement | null) => {
    const previous = targetMap.current.get(sectionId)
    if (previous && previous !== element) visibilityRef.current?.unregister(previous)
    if (element) {
      targetMap.current.set(sectionId, element)
      visibilityRef.current?.register(sectionId, element)
    } else {
      targetMap.current.delete(sectionId)
    }
  }, [])

  const navigate = useCallback((sectionId: SectionId) => {
    if (!targetMap.current.has(sectionId)) {
      recordFinding({ code: 'SHL-TARGET-MISSING', severity: 'error', message: `Registered target is missing: ${sectionId}` })
      return false
    }
    sequenceRef.current += 1
    intentRef.current = { sectionId, sequence: sequenceRef.current }
    commitActive(sectionId)
    const enhanced = canEnhanceHistory()
    if (enhanced) writeSectionHistory('push', sectionHash(sectionId))
    targetMap.current.get(sectionId)?.scrollIntoView({
      block: 'start',
      behavior: readMediaPreference('(prefers-reduced-motion: reduce)') ? 'auto' : 'smooth',
    })
    return enhanced
  }, [commitActive, recordFinding])

  const progress = useMemo(() => deriveProgress(activeSectionId, sectionRegistry), [activeSectionId])
  return { activeSectionId, progress, findings, registerTarget, navigate }
}
