'use client'
import { ReactNode } from 'react'

interface Props{
  children: ReactNode
  onClick: () => void
  active?: boolean
}
export function ButtonCircle({children, onClick,  active=false}: Props){

  const style = active 
    ? '-active'
    : ''

  return (
    <button onClick={onClick} className={`w-12 h-12  bg-[var(--color-button-circle-bg)] rounded-full border-2 border-[var(--color-button-circle-border${style})] text-[var(--color-button-circle-text${style})] flex items-center justify-center hover:scale-110 transition-transform duration-300` }>
      {children}
    </button>
  )
}