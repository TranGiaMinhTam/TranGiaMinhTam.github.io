export type RuleFamily = 'REC' | 'CNT' | 'SEC' | 'EVD' | 'DRV' | 'VIS' | 'UI' | 'BND' | 'PER' | 'INT'
export type RuleCode = `${RuleFamily}-${string}`
export type FindingSeverity = 'error' | 'warning'

export type ValidationFinding = Readonly<{
  code: RuleCode
  severity: FindingSeverity
  target: string
  message: string
  resolution: string
}>

export type ValidationReport = Readonly<{
  findings: readonly ValidationFinding[]
  counts: Readonly<{ errors: number; warnings: number }>
  canProceed: boolean
}>

export type FoundationValidationContext = Readonly<{
  recoveryVerified?: boolean
  identityName?: string
  sectionIds?: readonly string[]
  duplicateContentIds?: readonly string[]
  unsafeEvidencePaths?: readonly string[]
  invalidRelationships?: readonly string[]
  visualizationValid?: boolean
  uiSemanticsValid?: boolean
  boundaryValid?: boolean
  javascriptBytes?: number
  cssBytes?: number
  integrationStatic?: boolean
}>
