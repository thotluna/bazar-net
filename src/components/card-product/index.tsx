/* eslint-disable @next/next/no-img-element */
import { ProductCard } from '@/modules/items/domain/product-card'
import { LikeButton } from '../like-button'
import { RaitingBar } from '../raiting-bar'

interface Props {
  product: ProductCard
}
export function CardProduct({ product }: Props) {
  const price = product.price - product.price * (product.discountPercentage / 100)

  return (
    <article className="w-36 h-72 rounded-lg overflow-hidden border border-[var(--color-yellow)] flex flex-col items-center justify-between hover:shadow-md hover:scale-105 transition-all duration-200 p-2">
      <div className="relative w-full">
        <picture className="w-full h-44 flex items-center justify-center rounded-md overflow-hidden">
          <img className="object-cover w-full h-full" src={product.thumbnail} alt={product.title} />
        </picture>
        <div className="absolute right-[-8px] bottom-[-1rem] z-10">
          <LikeButton idProduct={product.id} active={product.liked} />
        </div>
      </div>
      <RaitingBar value={product.rating} />
      <h2 className="w-full text-center font-semibold text-[var(--color-card-title-test)] text-sm whitespace-nowrap text-ellipsis overflow-hidden">
        {product.title}
      </h2>
      <h3 className="font-semibold text-[var(--color-price-text)]">
        {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price)}
      </h3>
    </article>
  )
}
