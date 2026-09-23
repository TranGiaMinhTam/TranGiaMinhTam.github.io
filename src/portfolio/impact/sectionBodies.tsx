import { verifiedPortfolioSource } from '../model/verifiedPortfolioSource'
import type { SectionBodyRegistry } from '../shell/SectionBodyResolver'
import { FieldworkAndLeadership } from './FieldworkAndLeadership'
import { MethodsAndTools } from './MethodsAndTools'
import styles from './ToolsFieldwork.module.css'
import { assembleToolsFieldwork } from './toolsFieldworkModel'

export const toolsFieldworkSelection = assembleToolsFieldwork(verifiedPortfolioSource)

const unavailable = toolsFieldworkSelection.ok ? null : <div className={styles.validationFailure} role="status">
  <p>Tools and activity content is unavailable.</p>
  <small>{toolsFieldworkSelection.findings.map((finding) => finding.code).join(' · ')}</small>
</div>

export const toolsFieldworkBodyRegistry: SectionBodyRegistry = Object.freeze({
  'tools': () => toolsFieldworkSelection.ok
    ? <MethodsAndTools model={toolsFieldworkSelection.value.tools} />
    : unavailable,
  'fieldwork-leadership': () => toolsFieldworkSelection.ok
    ? <FieldworkAndLeadership model={toolsFieldworkSelection.value.fieldworkLeadership} />
    : unavailable,
})
