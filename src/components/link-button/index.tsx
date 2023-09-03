import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
  href: string
  children: ReactNode
}

export function LinkButton({ href, children }: Props) {
  return (
    <Link
      href={href}
      className="inline-block text-[var(--color-bar-text)] p-3 relative hover:text-[var(--color-badge-bg)] hover:scale-105 "
    >
      {children}
    </Link>
  )
}
