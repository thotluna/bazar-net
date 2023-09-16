'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DeleteAllCar } from '../delete-all-car'
import { DeleteAllLikes } from '../delete-all-likes'
import { ProfileButton } from '../profile-button'
const LikedButton = dynamic(() => import('../Liked-button').then((mod) => mod.LikedButton), { ssr: false })
const ShoppingCarButton = dynamic(() => import('../shopping-car-button').then((mod) => mod.ShoppingCarButton), {
  ssr: false
})

export function BottomBar() {
  const path = usePathname()
  const isHome = path === '/'
  const isLikedPage = path === '/products-liked'
  const isShoppingCar = path === '/shopping-car'

  return (
    <footer className="fixed left-0 right-0 z-20 bottom-0 max-w-3xl mx-auto  bg-[var(--color-bar-bg)] px-4 h-16 flex justify-between items-center">
      <div className="flex-1 w-full h-full ">
        {!isHome && (
          <Link className="w-full h-full flex items-center justify-center text-[var(--color-bar-text)]" href="/">
            HOME
          </Link>
        )}
      </div>
      <div className="flex items-center justify-between border-s border-[var(--color-bar-text)] gap-2">
        {isShoppingCar ? <DeleteAllCar /> : <ShoppingCarButton />}
        {isLikedPage ? <DeleteAllLikes /> : <LikedButton />}
        <ProfileButton href="#" />
      </div>
    </footer>
  )
}
