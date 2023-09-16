'use client'
import { useRouter } from 'next/navigation'
import { EmptyDraw } from '../empty-draw'

export function EmptyProducts({ message }: { message: string }) {
  const route = useRouter()
  return (
    <article className="flex-1 w-full flex flex-col items-center justify-center gap-2">
      <EmptyDraw width={300} height={240} />
      <h2 className="text-3xl sm:text-4xl text-center">{message}</h2>
      <button
        name="Return"
        onClick={() => route.back()}
        className="px-8 py-2 rounded-full bg-[var(--color-border)]  font-semibold hover:scale-105 transition-transform duration-200"
      >
        Return
      </button>
    </article>
  )
}
