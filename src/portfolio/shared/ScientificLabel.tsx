import type { HTMLAttributes, ReactNode } from 'react'

export type ScientificLabelProps = Readonly<{
  marker?: string
  children: ReactNode
}> & HTMLAttributes<HTMLSpanElement>

export function ScientificLabel({ marker, children, ...props }: ScientificLabelProps) {
  return <span {...props}>{marker ? <span aria-hidden="true">{marker} </span> : null}{children}</span>
}
