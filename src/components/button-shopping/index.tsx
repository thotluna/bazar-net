'use client'
import { useShoppingCarStore } from '@/store/shopping-car'
import { useEffect, useState } from 'react'
import { ArrowBack } from '..'

export function ButtonShopping({ id, available }: { id: number; available: number }) {
  const count = useShoppingCarStore((state) => state.ids)
  const save = useShoppingCarStore((state) => state.save)

  const [counter, setCounter] = useState(count[id] ?? 0)

  useEffect(() => {
    save(id, counter)
  }, [counter, id, save])

  const addHandler = () => {
    available >= counter + 1 && setCounter((prev) => prev + 1)
  }
  const subHandler = () => {
    counter - 1 >= 0 && setCounter((prev) => prev - 1)
  }

  return (
    <article className="min-w-max flex flex-col items-center gap-1">
      <h3 className="text-xs text-[var(--color-card-text)] sm:text-sm collapse sm:visible font-semibold">
        Product in shopping card:
      </h3>
      <div className="w-full max-w-[141px] flex-1 flex items-center border-2 bg-[var(--color-shopping-button-border)] rounded-full py-2  ">
        <button className="text-[var(--color-gray-light)]" onClick={subHandler}>
          <ArrowBack label="subtract product" />
        </button>
        <span
          className="flex-1 w-full text-center font-semibold text-lg text-[var(--color-gray-light)] sm:text-2xl"
          suppressHydrationWarning={true}
        >
          {counter || 0} und
        </span>
        <button className="rotate-180 text-[var(--color-gray-light)] " onClick={addHandler}>
          <ArrowBack label="add product" />
        </button>
      </div>
    </article>
  )
}
