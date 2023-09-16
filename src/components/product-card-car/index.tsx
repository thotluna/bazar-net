/* eslint-disable @next/next/no-img-element */
import { ProductToCar } from '@/modules/products/domain/product-cost'
import { format } from '@/utils/format'
import { ButtonShopping } from '../button-shopping'
import { RaitingBar } from '../raiting-bar'

export function ProductCardCar({ product }: { product: ProductToCar }) {
  return (
    <article key={product.id} className="border-2  shadow-md p-2 rounded-2xl">
      <header className="w-full flex items-center justify-evenly flex-wrap gap-2">
        <div>
          <img className="rounded-md aspect-video object-cover max-w-xs" src={product.thumbnail} alt={product.title} />
          <RaitingBar value={product.rating} />
        </div>
        <div>
          <h2 className="text-lg sm:text-2xl font-semibold text-[var(--color-card-text)]">
            {format.format(product.unit.total)}
          </h2>
          <div className="flex flex-wrap">
            <span className="text-sm text-(var(--color-price-rebate))">price: {format.format(product.unit.price)}</span>
            <span className="text-sm text-(var(--color-price-rebate))">saved: {format.format(product.unit.saved)}</span>
          </div>
        </div>
        <ButtonShopping available={product.stock} id={product.id} />
      </header>
      <h2 className="text-4xl w-full text-center text-[var(--color-card-text)] font-semibold">{product.title}</h2>
    </article>
  )
}
