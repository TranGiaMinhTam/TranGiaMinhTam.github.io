import type { HTMLAttributes, ReactNode } from 'react'
import type { SectionId } from '../model/portfolio.types'

export type SectionRegionProps = Readonly<{
  id: SectionId
  title: string
  eyebrow?: string
  children: ReactNode
}> & Omit<HTMLAttributes<HTMLElement>, 'id' | 'title'>

export function SectionRegion({ id, title, eyebrow, children, ...props }: SectionRegionProps) {
  const headingId = `${id}-heading`
  return <section id={id} aria-labelledby={headingId} {...props}>
    <header>
      {eyebrow ? <p>{eyebrow}</p> : null}
      <h2 id={headingId}>{title}</h2>
    </header>
    {children}
  </section>
}
