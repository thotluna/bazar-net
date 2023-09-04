import { TopBar } from '@/components'
import { BottonBar } from '@/components/botton-bar'
import { SearchBar } from '@/components/search-bar'

export default function Home() {
  return (
    <main className="bg-[var(--color-bg)] h-full flex flex-col">
      <TopBar />
      <section className="flex-1 p-2">
        <SearchBar />
      </section>
      <BottonBar />
    </main>
  )
}
