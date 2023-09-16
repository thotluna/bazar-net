import { ProductsCar } from '@/modules/products/domain/product-cost'
import { useShoppingCarStore } from '@/store/shopping-car'
import { format } from '@/utils/format'
import { useEffect, useMemo, useState } from 'react'

export function TotalCar({ products }: { products: ProductsCar }) {
  const car = useShoppingCarStore((state) => state.ids)
  const [total, setTotal] = useState({
    price: products.price ?? 0,
    saved: products.saved ?? 0,
    total: products.total ?? 0
  })

  useEffect(() => {
    setTotal({
      price: products.products
        .map((product) => product.unit.price * car[product.id])
        .reduce((acc, value) => acc + value),
      saved: products.products
        .map((product) => product.unit.saved * car[product.id])
        .reduce((acc, value) => acc + value),
      total: products.products
        .map((product) => product.unit.total * car[product.id])
        .reduce((acc, value) => acc + value)
    })
  }, [car, products.products])

  const quantity = useMemo(() => {
    const values = Object.values(car)
    return values.length === 0 ? 0 : values.reduce((acc, value) => acc + value)
  }, [car])

  return (
    <section className="max-w-3xl mx-auto px-2 fixed bottom-[72px] right-2 left-2 ">
      <article className=" bg-[var(--color-shopping-card-total-bg)] shadow-lg text-[var(--color-shopping-card-total-text-off)] flex flex-col p-4 rounded-lg z-10">
        <div className="w-full flex items-center justify-between text-xl ">
          <span>Count products: </span>
          <span>{quantity}</span>
        </div>
        <div className="w-full flex items-center justify-between text-xl ">
          <span>subtotal: </span>
          <span className="text-red-500 line-through">
            <span className="text-[var(--color-shopping-card-total-text-off)]">{format.format(total.price)}</span>
          </span>
        </div>
        <div className="w-full flex items-center justify-between text-xl ">
          <span>saved: </span>
          <span>{format.format(total.saved)}</span>
        </div>
        <div className="w-full flex items-center justify-between text-2xl text-[var(--color-shopping-card-total-text)]">
          <span>Total: </span>
          <span>{format.format(total.total)}</span>
        </div>
        <button className="w-full py-4 rounded-full bg-[var(--color-shopping-card-total-button-bg)] text-[var(--color-shopping-card-total-button-text)] mt-8 text-2xl font-semibold">
          Buy
        </button>
      </article>
    </section>
  )
}
