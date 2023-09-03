import { TopBar } from '@/components'
import { BottonBar } from '@/components/botton-bar'

export default function Home() {
  return (
    <main className="bg-[var(--color-bg)] h-full flex flex-col">
      <TopBar />
      <section className="flex-1">
        <h3>Hello</h3>
      </section>
      <BottonBar />
    </main>
  )
}
