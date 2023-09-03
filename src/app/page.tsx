import { Header } from '@/components'
import { Badge } from '@/components/badge'

export default function Home() {
  return (
    <main className="bg-[var(--color-bg)] h-full flex flex-col">
      <Header />
      <section className="flex-1">
        <h3>Hello</h3>
      </section>
      <footer className="sticky bottom-0 bg-[var(--color-bar-bg)] px-4 h-16">
        <Badge amount={11} />
      </footer>
    </main>
  )
}
