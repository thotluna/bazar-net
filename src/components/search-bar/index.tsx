'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SearchIcon } from '..'

export function SearchBar() {
  const [search, setSearch] = useState('')
  const route = useRouter()

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (search.length > 0) route.push(`/products?q=${search}`)
  }

  return (
    <section className="w-full px-2 sm:px-0">
      <form
        className="w-full flex items-center justify-between gap-2"
        onSubmit={onSubmitHandler}
        aria-label="Search products"
      >
        <input
          className="h-12 border-2 border-[var(--color-search-bar-border)] rounded-full bg-[var(--color-search-bar-bg)] flex-1 px-2 placeholder:text-[var(--color-search-input-placeholder)] focus-visible:ring-[var(--color-search-bar-border)] focus-visible:ring-2 focus-visible:outline-2 focus-visible:outline-[var(--color-search-bar-border)]"
          type="text"
          aria-label="Search input"
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button
          className="w-12 aspect-[1/1] bg-[var(--color-search-bar-button-bg)] border-[var(--color-search-bar-button-border)] text-[var(--color-search-bar-button-text)] hover:bg-[var(--color-search-bar-button-bg-hover)] hover:text-[var(--color-search-bar-button-text-hover)]  rounded-full flex items-center justify-center border-2 focus-visible:ring-2 focus-visible:outline-2 focus-visible:outline-[var(--color-search-bar-border)]"
          type="submit"
        >
          <SearchIcon />
        </button>
      </form>
    </section>
  )
}
