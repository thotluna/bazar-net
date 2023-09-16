'use client'
import { ProductDetail } from '@/modules/products/domain/product-detail'
import { useLikeStore } from '@/store/liked'
import dynamic from 'next/dynamic'
import { LikeButton } from '..'
const ButtonShopping = dynamic(() => import('../button-shopping').then((mod) => mod.ButtonShopping), { ssr: false })

const format = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })

export function BottomProductDetail({ product }: { product: ProductDetail }) {
  const exist = useLikeStore((state) => state.exist)

  return (
    <section className="w-full max-w-[535px] mx-auto flex flex-wrap items-center justify-evenly gap-2 py-8">
      <article className="flex-2 flex flex-col gap-1">
        <span className=" text-[var(--color-card-text-paragraph)]">
          <span className="pr-1">price:</span>
          <span className="text-red-500 line-through">
            <span>{format.format(product.price)}</span>
          </span>
        </span>
        <span className="text-lg text-[var(--color-card-text-paragraph)]">
          {' '}
          <span className="pr-1">saved: </span>
          {format.format(product.saved)}
        </span>
        <span aria-label="total" className="text-4xl font-semibold pt-2 text-[var(--color-card-text)]">
          {format.format(product.total)}
        </span>
      </article>
      <LikeButton idProduct={product.id} label="Like this product" active={exist(product.id)} />
      <div>
        <span className="text-sm mb-2 block text-[var(--color-card-text-paragraph)]">
          disposable {product.stock} units{' '}
        </span>
        <ButtonShopping id={product.id} available={product.stock} />
      </div>
    </section>
  )
}
