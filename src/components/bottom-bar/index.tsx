'use client'
import { useLikeStore } from '@/store/liked'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LikedButton } from '../Liked-button'
import { ProfileButton } from '../profile-button'
import { ShoppingCarButton } from '../shopping-car-button'

export function BottomBar() {
  const path = usePathname()
  const isHome = path === '/'
  const likes = useLikeStore((state) => state.likes)
  //TODO: Add hook from shoppingCar

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
        <LikedButton href="/products-liked" productCount={likes.length} />
        <ProfileButton href="#" />
      </div>
    </footer>
  )
}
