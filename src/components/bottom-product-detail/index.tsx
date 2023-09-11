'use client'
import { Product } from '@/modules/items/domain/product'
import { useLikeStore } from '@/store/liked'
import { LikeButton } from '..'
import { ButtonShopping } from '../button-shopping'

export function BottomProductDetail({ product }: { product: Product }) {
  const exist = useLikeStore((state) => state.exist)

  return (
    <section className="w-full max-w-[535px] mx-auto flex items-center justify-between gap-2 py-8">
      <article className="flex-2 flex flex-col gap-1">
        <span className=" text-[var(--color-price-rebate)]">
          <span className="pr-1">price:</span>
          <span className="text-red-500 line-through">
            <span className="text-[var(--color-price-rebate)]">
              {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.price)}
            </span>
          </span>
        </span>
        <span className="text-lg text-[var(--color-price-rebate)]">
          {' '}
          <span className="pr-1">saved: </span>
          {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
            (product.price * product.discountPercentage) / 100
          )}
        </span>
        <span className="text-4xl font-semibold pt-2">
          {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
            product.price - (product.price * product.discountPercentage) / 100
          )}
        </span>
      </article>
      <LikeButton idProduct={product.id} active={exist(product.id)} />
      <ButtonShopping id={product.id} />
    </section>
  )
}
