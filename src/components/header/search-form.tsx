'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'

import { Input } from '../ui/input'

export function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    if (!query) {
      return null
    }

    return router.push(`/search?q=${query}`)
  }
  return (
    <form
      onSubmit={handleSearch}
      className="max-sm:hidden flex max-w-sm items-center gap-3 rounded-xl bg-zinc-900 px-5 h-12"
    >
      <Search className="w-5 h-5 text-zinc-500" />

      <Input
        name="q"
        type="text"
        defaultValue={query ?? ''}
        placeholder="Search products"
        required
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500 border-0"
      />
    </form>
  )
}
