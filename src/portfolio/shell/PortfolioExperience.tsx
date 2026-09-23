import { ObservatoryShell } from './ObservatoryShell'
import type { SectionBodyRegistry } from './SectionBodyResolver'
import type { MastheadResumeAction } from './shell.types'
import { usePortfolioTheme } from './usePortfolioTheme'
import { useSectionProgress } from './useSectionProgress'

export function PortfolioExperience({ sectionBodies, resumeAction }: Readonly<{
  sectionBodies?: SectionBodyRegistry
  resumeAction?: MastheadResumeAction
}>) {
  const navigation = useSectionProgress()
  const theme = usePortfolioTheme()
  const findings = theme.finding ? [...navigation.findings, theme.finding] : navigation.findings

  return <ObservatoryShell
    activeSectionId={navigation.activeSectionId}
    progress={navigation.progress}
    theme={theme.theme}
    findings={findings}
    onNavigate={navigation.navigate}
    onRegister={navigation.registerTarget}
    onToggleTheme={theme.toggleTheme}
    sectionBodies={sectionBodies}
    resumeAction={resumeAction}
  />
}
