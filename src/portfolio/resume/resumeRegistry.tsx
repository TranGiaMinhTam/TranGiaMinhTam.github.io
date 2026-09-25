import type { SectionBodyRegistry } from '../shell/SectionBodyResolver'
import { ResumeContentGroup } from './ResumeContentGroup'
import type { ResumeSectionGroup } from './resume.types'
import styles from './ResumeContent.module.css'

export const decorateRegistryWithResumeContent = (
  registry: SectionBodyRegistry,
  sections: Readonly<Record<ResumeSectionGroup['sectionId'], ResumeSectionGroup>>,
): SectionBodyRegistry => {
  const decorated = Object.fromEntries(Object.entries(registry).map(([sectionId, Body]) => [
    sectionId,
    Body
      ? (context: Parameters<NonNullable<typeof Body>>[0]) => <div className={styles.sectionStack} data-testid={`resume-section-stack-${sectionId}`}>
          {Body(context)}
          {sectionId === 'data-stories' ? null : <ResumeContentGroup group={sections[sectionId as ResumeSectionGroup['sectionId']]} />}
        </div>
      : Body,
  ]))

  return Object.freeze(decorated) as SectionBodyRegistry
}
