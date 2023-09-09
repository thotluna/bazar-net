'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import { LikedButton } from '../Liked-button'
import dynamic from 'next/dynamic'
import { ProfileButton } from '../profile-button'
import { ShoppingCarButton } from '../shopping-car-button'
const LikedButton = dynamic(() => import('../Liked-button').then((mod) => mod.LikedButton), { ssr: false })

export function BottomBar() {
  const path = usePathname()
  const isHome = path === '/'

  return (
    <footer className="sticky z-20 bottom-0 bg-[var(--color-bar-bg)] px-4 h-16 flex justify-between items-center">
      <div className="flex-1 w-full h-full ">
        {!isHome && (
          <Link className="w-full h-full flex items-center justify-center text-[var(--color-bar-text)]" href="/">
            HOME
          </Link>
        )}
      </div>
      <div className="flex items-center justify-between border-s border-[var(--color-bar-text)] gap-2">
        <ShoppingCarButton href="/shopping-card" productCount={0} />
        <LikedButton />
        <ProfileButton href="#" />
      </div>
    </footer>
  )
}
