import { Header } from '@/components'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="bg-[var(--color-bg)] h-full flex flex-col">
      <Header />
      <section className="flex-1">
        <h3>Hello</h3>
      </section>
      <Footer />
    </main>
  )
}
