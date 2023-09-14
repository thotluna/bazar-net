/* eslint-disable @next/next/no-img-element */
'use client'
import { ArrowBack } from '@/components/icons'
import { usePathname, useRouter } from 'next/navigation'

export function TopBar() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const { back } = useRouter()

  const style = isHome ? 'h-24 justify-center text-4xl' : 'h-12 justify-start text-2xl'

  const widthLogo = isHome ? 'w-12' : 'w-8'

  return (
    <header
      data-testid="header"
      className={`sticky z-20 top-0 bg-[var(--color-bar-bg)] px-4 flex items-center ${style} gap-2 `}
    >
      {!isHome && (
        <button onClick={back} className="text-[var(--color-topbar-text)]">
          <ArrowBack label="Return" />
        </button>
      )}
      <div className="flex items-center justify-center gap-1">
        <img className={`${widthLogo}`} src="/bazar-net.svg" alt="logo" />
        <h1 className="text-[var(--color-topbar-text)]  font-semibold ">BAZAR-NET</h1>
      </div>
    </header>
  )
}
