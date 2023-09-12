'use client'
import { useShoppingCarStore } from '@/store/shopping-car'
import { useEffect, useState } from 'react'
import { ArrowBack } from '..'

export function ButtonShopping({ id, available }: { id: number; available: number }) {
  const count = useShoppingCarStore((state) => state.ids)
  const add = useShoppingCarStore((state) => state.add)
  const sub = useShoppingCarStore((state) => state.sub)

  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setCounter(count[id])
  }, [count, id])

  return (
    <article className="flex flex-col items-center gap-1">
      <h3 className="text-sm font-semibold">Product in shopping card:</h3>
      <div className="w-full max-w-[141px] flex-1 flex items-center border-2 border-[var(--color-border)] rounded-full py-2  ">
        <button className="text-[var(--color-border)]" onClick={() => counter - 1 >= 0 && sub(id)}>
          <ArrowBack label="add" />
        </button>
        <span className="flex-1 font-semibold text-1xl sm:text-2xl">{counter} und</span>
        <button className="rotate-180 text-[var(--color-border)]" onClick={() => available >= counter + 1 && add(id)}>
          <ArrowBack label="sum" />
        </button>
      </div>
    </article>
  )
}
