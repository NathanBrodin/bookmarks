"use client"

import { useId } from "react"
import { SearchIcon } from "lucide-react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

export function Search() {
  const id = useId()

  return (
    <section className="flex gap-4 px-8 py-4">
      <div className="bg-card relative w-full">
        <Input
          id={id}
          className="peer ps-9"
          placeholder="Search bookmarks"
          autoComplete="false"
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} aria-hidden="true" />
        </div>
      </div>
      <Button variant="secondary">Search</Button>
    </section>
  )
}
