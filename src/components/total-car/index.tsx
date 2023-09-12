import { TotalsCar } from '@/modules/products/domain/product-cost'
import { format } from '@/utils/format'

export function TotalCar({ totals }: { totals: TotalsCar }) {
  return (
    <section className="bg-[var(--color-bar-bg)] absolute bottom-1 right-2 left-2 shadow-lg text-[var(--color-gray-dark)] flex flex-col p-4 rounded-lg z-10">
      <div className="w-full flex items-center justify-between text-xl ">
        <span>Count products: </span>
        <span>{totals?.count ?? 0}</span>
      </div>
      <div className="w-full flex items-center justify-between text-xl ">
        <span>subtotal: </span>
        <span className="text-red-500 line-through">
          <span className="text-[var(--color-gray-dark)]">{format.format(totals?.price ?? 0)}</span>
        </span>
      </div>
      <div className="w-full flex items-center justify-between text-xl ">
        <span>saved: </span>
        <span>{format.format(totals?.saved ?? 0)}</span>
      </div>
      <div className="w-full flex items-center justify-between text-2xl text-[var(--color-yellow)]">
        <span>Total: </span>
        <span>{format.format(totals?.total ?? 0)}</span>
      </div>
      <button className="w-full py-4 rounded-full bg-[var(--color-yellow)] text-[var(--color-bar-bg)] mt-8 text-2xl font-semibold">
        Buy
      </button>
    </section>
  )
}
