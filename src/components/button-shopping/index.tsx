'use client'
import { useShoppingCarStore } from '@/store/shopping-car'
import { ArrowBack } from '..'

export function ButtonShopping({ id, available }: { id: number; available: number }) {
  const product = useShoppingCarStore((state) => state.ids)
  const add = useShoppingCarStore((state) => state.add)
  const sub = useShoppingCarStore((state) => state.sub)

  const addHandler = (id: number) => {
    if ((!product[id] && available > 0) || available > product[id]) {
      add(id)
    }
  }

  const subHandler = (id: number) => {
    if (product[id] && product[id] > 0) {
      sub(id)
    }
  }

  return (
    <article className="min-w-max flex flex-col items-center gap-1">
      <h3 className="text-xs text-[var(--color-card-text)] sm:text-sm collapse sm:visible font-semibold">
        Product in shopping card:
      </h3>
      <div className="w-full max-w-[141px] flex-1 flex items-center border-2 bg-[var(--color-shopping-button-border)] rounded-full py-2  ">
        <button className="text-[var(--color-gray-light)]" onClick={() => subHandler(id)}>
          <ArrowBack label="subtract product" />
        </button>
        <span
          className="flex-1 w-full text-center font-semibold text-lg text-[var(--color-gray-light)] sm:text-2xl"
          suppressHydrationWarning={true}
        >
          {product[id] || 0} und
        </span>
        <button className="rotate-180 text-[var(--color-gray-light)] " onClick={() => addHandler(id)}>
          <ArrowBack label="add product" />
        </button>
      </div>
    </article>
  )
}
