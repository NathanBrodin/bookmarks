"use client"

import { useCallback, useEffect, useId, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SearchIcon, XIcon } from "lucide-react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

export function Search() {
  const id = useId()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get current search query from URL params
  const currentSearch = searchParams.get("search") || ""
  const [searchValue, setSearchValue] = useState(currentSearch)

  // Sync search input with URL params
  useEffect(() => {
    setSearchValue(currentSearch)
  }, [currentSearch])

  const updateSearchParams = useCallback(
    (searchQuery: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (searchQuery.trim()) {
        params.set("search", searchQuery.trim())
      } else {
        params.delete("search")
      }

      const queryString = params.toString()
      router.push(pathname + (queryString ? "?" + queryString : ""))
    },
    [searchParams, pathname, router]
  )

  const handleSearch = useCallback(() => {
    updateSearchParams(searchValue)
  }, [searchValue, updateSearchParams])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault()
        handleSearch()
      }
    },
    [handleSearch]
  )

  const handleClear = useCallback(() => {
    setSearchValue("")
    updateSearchParams("")
  }, [updateSearchParams])

  return (
    <section className="flex gap-4 px-8 py-4">
      <div className="bg-card relative w-full">
        <Input
          id={id}
          className="peer ps-9"
          placeholder="Search bookmarks"
          autoComplete="off"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} aria-hidden="true" />
        </div>
        {searchValue && (
          <button
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Clear input"
            onClick={handleClear}
          >
            <XIcon size={16} aria-hidden="true" />
          </button>
        )}
      </div>
      <Button variant="secondary" onClick={handleSearch}>
        Search
      </Button>
    </section>
  )
}
