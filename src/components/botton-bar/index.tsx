'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LikedButton } from '../Liked-button'
import { ProfileButton } from '../profile-button'
import { ShoppinCarButton } from '../shopping-car-button'

export function BottonBar() {
  const path = usePathname()
  const isHome = path !== '/'

  return (
    <footer className="sticky bottom-0 bg-[var(--color-bar-bg)] px-4 h-16 flex justify-between items-center">
      <div className="flex-1 w-full h-full ">
        {!isHome && (
          <Link className="w-full h-full flex items-center justify-center text-[var(--color-bar-text)]" href="/">
            HOME
          </Link>
        )}
      </div>
      <div className="flex items-center justify-between border-s border-[var(--color-bar-text)] gap-2">
        <ShoppinCarButton href="#" productCount={10} />
        <LikedButton href="#" productCount={5} />
        <ProfileButton href="#" />
      </div>
    </footer>
  )
}
