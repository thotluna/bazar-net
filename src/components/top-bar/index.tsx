'use client'
import { ArrowBack } from '@/components/icons'
import { usePathname, useRouter } from 'next/navigation'

export function TopBar() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const { back } = useRouter()

  const style = isHome ? 'h-24 justify-center text-3xl' : 'h-12 justify-start text-base'

  return (
    <header
      data-testid="header"
      className={`sticky top-0 bg-[var(--color-bar-bg)] px-4 flex items-center ${style} gap-2 `}
    >
      {!isHome && (
        <button onClick={back} className="text-[var(--color-topbar-text)]">
          <ArrowBack label="Return" />
        </button>
      )}
      <h1 className="text-[var(--color-topbar-text)]  font-semibold">BAZAR-NET</h1>
    </header>
  )
}
