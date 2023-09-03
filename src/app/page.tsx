import { TopBar } from '@/components'
import { BottonBar } from '@/components/botton-bar'
import { RaitingBar } from '@/components/raiting-bar'

export default function Home() {
  return (
    <main className="bg-[var(--color-bg)] h-full flex flex-col">
      <TopBar />
      <section className="flex-1">
        <h3>Hello</h3>
        <div className="flex flex-col items-center">
          <RaitingBar value={2} />
          <RaitingBar value={4.9} />
          <RaitingBar value={5} />
        </div>
      </section>
      <BottonBar />
    </main>
  )
}
