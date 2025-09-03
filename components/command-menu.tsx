"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { type DialogProps } from "@radix-ui/react-dialog"
import { ArrowRightIcon, CornerDownLeftIcon, SearchIcon } from "lucide-react"

import { bookmarks } from "@/lib/bookmarks"
import { categories } from "@/lib/categories"
import { cn } from "@/lib/utils"
import { useIsMac } from "@/hooks/use-is-mac"
import { useMutationObserver } from "@/hooks/use-mutation-observer"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter()
  const isMac = useIsMac()
  const [open, setOpen] = React.useState(false)
  const [highlight, setHighlight] = React.useState("")

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="secondary"
        className={cn(
          "bg-card text-card-foreground/60 relative h-8 w-full justify-start font-normal shadow-none"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <SearchIcon />
        <Kbd>{isMac ? "⌘" : "Ctrl"} K</Kbd>
      </Button>
      <CommandDialog
        title="Search bookmarks..."
        description="Search bookmarks by name..."
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder="Search bookmarks..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Categories">
            <CommandMenuItem
              value="all categories"
              keywords={["all", "categories", "clear", "reset"]}
              onHighlight={() => {
                setHighlight("All Categories")
              }}
              onSelect={() => {
                runCommand(() => router.push("/"))
              }}
              className="flex items-center gap-2 overflow-hidden"
            >
              <ArrowRightIcon className="shrink-0" />
              <span className="truncate">All Categories</span>
            </CommandMenuItem>
            {categories.map((category) => (
              <CommandMenuItem
                key={category.id}
                value={`filter ${category.label.toLowerCase()}`}
                keywords={[
                  category.label.toLowerCase(),
                  category.id,
                  "filter",
                  "category",
                ]}
                onHighlight={() => {
                  setHighlight(`Filter by ${category.label}`)
                }}
                onSelect={() => {
                  runCommand(() => router.push(`/?categories=${category.id}`))
                }}
                className="flex items-center gap-2 overflow-hidden"
              >
                <ArrowRightIcon className="shrink-0" />
                <span className="truncate">Filter by {category.label}</span>
              </CommandMenuItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Bookmarks">
            {bookmarks.map((bookmark) => (
              <CommandMenuItem
                key={bookmark.href}
                value={`${bookmark.title} ${bookmark.href}`}
                keywords={[
                  bookmark.href,
                  bookmark.title,
                  ...bookmark.categories,
                ]}
                onHighlight={() => {
                  setHighlight(bookmark.href)
                }}
                onSelect={() => {
                  runCommand(() => router.push(bookmark.href))
                }}
                className="flex items-center gap-2 overflow-hidden"
              >
                <ArrowRightIcon className="shrink-0" />
                <span className="truncate">{bookmark.title}</span>
              </CommandMenuItem>
            ))}
          </CommandGroup>
        </CommandList>
        <CommandFooter>
          <div className="flex min-w-0 shrink-0 items-center gap-2">
            <Kbd>
              <CornerDownLeftIcon />
            </Kbd>{" "}
            <span className="">{highlight ? `Visit ${highlight}` : null}</span>
          </div>
        </CommandFooter>
      </CommandDialog>
    </>
  )
}

function CommandMenuItem({
  children,
  className,
  onHighlight,
  ...props
}: React.ComponentProps<typeof CommandItem> & {
  onHighlight?: () => void
  "data-selected"?: string
  "aria-selected"?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  useMutationObserver(ref, (mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-selected" &&
        ref.current?.getAttribute("aria-selected") === "true"
      ) {
        onHighlight?.()
      }
    })
  })

  return (
    <CommandItem ref={ref} className={cn(className)} {...props}>
      {children}
    </CommandItem>
  )
}
