'use client'
import { useShoppingCarStore } from '@/store/shoppin-car'
import { ArrowBack } from '..'

export function ButtonShopping({ id }: { id: number }) {
  const count = useShoppingCarStore((state) => state.ids)
  const add = useShoppingCarStore((state) => state.add)
  const sub = useShoppingCarStore((state) => state.sub)

  return (
    <article className="flex flex-col items-center gap-1">
      <h3 className="text-sm font-semibold">Product in shopping card:</h3>
      <div className="w-full max-w-[141px] flex-1 flex items-center border-2 border-[var(--color-border)] rounded-full py-4 ">
        <button className="text-[var(--color-border)]" onClick={() => sub(id)}>
          <ArrowBack label="add" />
        </button>
        <span className="flex-1 font-semibold text-2xl">{count[id] ?? 0} und</span>
        <button className="rotate-180 text-[var(--color-border)]" onClick={() => add(id)}>
          <ArrowBack label="sum" />
        </button>
      </div>
    </article>
  )
}
