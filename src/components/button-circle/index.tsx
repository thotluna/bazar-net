'use client'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  active?: boolean
}
export function ButtonCircle({ children, onClick, active = false }: Props) {
  const style = active
    ? ' text-[var(--color-text-circle-button-active)] bg-[var(--color-bg-circle-button-active)]'
    : 'text-[var(--color-text-circle-button-inactive)] bg-[var(--color-bg-circle-button-inactive)]'

  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 border-[var(--color-border-circle-button)]  rounded-full border-2 ${style} flex items-center justify-center hover:scale-110 transition-all duration-300 focus-visible:ring-2 focus-visible:outline-2 focus-visible:outline-[var(--color-border-circle-button)]`}
    >
      {children}
    </button>
  )
}
