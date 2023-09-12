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
    <article className="flex flex-col items-center gap-1">
      <h3 className="text-sm font-semibold">Product in shopping card:</h3>
      <div className="w-full max-w-[141px] flex-1 flex items-center border-2 border-[var(--color-border)] rounded-full py-2  ">
        <button className="text-[var(--color-border)]" onClick={subHandler}>
          <ArrowBack label="subtract product" />
        </button>
        <span className="flex-1 font-semibold text-1xl sm:text-2xl" suppressHydrationWarning={true}>
          {counter || 0} und
        </span>
        <button className="rotate-180 text-[var(--color-border)]" onClick={addHandler}>
          <ArrowBack label="add product" />
        </button>
      </div>
    </article>
  )
}
