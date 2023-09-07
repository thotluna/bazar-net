import { BottomBar, TopBar } from '@/components'

export default function Products() {
  return (
    <main className="bg-[var(--color-bg)] h-full flex flex-col">
      <TopBar />
      <section className="flex-1 p-2">
        <h1>Products</h1>
      </section>
      <BottomBar />
    </main>
  )
}
