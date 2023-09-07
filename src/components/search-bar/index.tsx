'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SearchIcon } from '..'

export function SearchBar() {
  const [search, setSearch] = useState('')
  const route = useRouter()

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // const target = event.currentTarget
    // const search = target[0] as HTMLInputElement

    route.push(`/products?q=${search}`)
  }

  return (
    <section className="">
      <form
        className="w-full flex items-center justify-between gap-2"
        onSubmit={onSubmitHandler}
        aria-label="Search products"
      >
        <input
          className="h-12 border-2 border-[var(--color-search-input-border)] rounded-full bg-[var(--color-search-input-bg)] flex-1 px-2 placeholder:text-[var(--color-search-input-placeholder)] focus-visible:border-[var(--color-search-input-border)]"
          type="text"
          aria-label="Search"
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
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
