'use client'
import { useRouter } from 'next/navigation'
import { SearchIcon } from '..'

export function SearchBar() {
  const route = useRouter()

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.currentTarget
    const search = target[0] as HTMLInputElement

    route.push(`/products?q=${search.value}`)
  }

  return (
    <section className="">
      <form className="w-full flex items-center justify-between gap-2" onSubmit={onSubmitHandler}>
        <input
          className="h-12 border-2 border-[var(--color-search-input-border)] rounded-full bg-[var(--color-search-input-bg)] flex-1 px-2 placeholder:text-[var(--color-search-input-placeholder)] focus-visible:border-[var(--color-search-input-border)]"
          id="search-input"
          type="text"
          aria-label="Search"
          placeholder="Search"
        />

        <button
          className="w-12 h-12 bg-[var(--color-serch-button-bg)] rounded-full flex items-center justify-center border-2 border-[var(--color-search-button-border)]"
          type="submit"
        >
          <SearchIcon />
        </button>
      </form>
    </section>
  )
}
