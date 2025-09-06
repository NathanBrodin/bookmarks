"use client"

import { useActionState, useCallback, useEffect, useState } from "react"
import Image from "next/image"

import addBookmark from "@/lib/actions/bookmark"
import { categories } from "@/lib/categories"
import { isValidUrl, normalizeUrl } from "@/lib/utils/url"
import { useUrlMetadata } from "@/hooks/use-url-metadata"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import MultipleSelector, { Option } from "./ui/multiselect"

export function BookmarkForm() {
  const [state, formAction, pending] = useActionState(addBookmark, null)
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [favicon, setFavicon] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const { metadata, loading, error, fetchMetadata, clearMetadata } =
    useUrlMetadata()

  const resetForm = useCallback(() => {
    setUrl("")
    setTitle("")
    setAuthor("")
    setFavicon("")
    setSelectedOptions([])
    clearMetadata()
  }, [clearMetadata])

  // Auto-populate fields when metadata is fetched
  useEffect(() => {
    if (metadata) {
      setTitle(metadata.title)
      setAuthor(metadata.author)
      setFavicon(metadata.favicon)
    }
  }, [metadata])

  // Reset form after successful submission
  useEffect(() => {
    if (state && !state.errors && !pending) {
      resetForm()
      setIsOpen(false)
    }
  }, [state, pending, resetForm])

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawUrl = e.target.value
    setUrl(rawUrl)

    if (!rawUrl.trim()) {
      clearMetadata()
      setTitle("")
      setAuthor("")
      setFavicon("")
    }
  }

  // Debounce URL metadata fetching
  useEffect(() => {
    if (!url.trim()) return

    const timer = setTimeout(() => {
      const normalizedUrl = normalizeUrl(url)
      if (isValidUrl(normalizedUrl)) {
        fetchMetadata(normalizedUrl)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [url, fetchMetadata])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="h-8 justify-start">
          Add Bookmark
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Add Bookmark</DialogTitle>
            <DialogDescription>
              Add a new bookmark to your collection.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input
                name="url"
                id="url"
                value={url}
                onChange={handleUrlChange}
                placeholder="https://example.com"
              />
              {url && !isValidUrl(normalizeUrl(url)) && (
                <p className="text-xs text-amber-600">
                  Please enter a valid URL (e.g., https://example.com)
                </p>
              )}
              {loading && (
                <p className="text-muted-foreground text-xs">
                  Fetching metadata...
                </p>
              )}
              {error && <p className="text-destructive text-xs">{error}</p>}
              <p className="text-destructive text-xs" role="alert">
                {state?.errors.url}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="categories">Categories</Label>
              <MultipleSelector
                commandProps={{
                  label: "Select frameworks",
                }}
                value={selectedOptions}
                onChange={setSelectedOptions}
                defaultOptions={categories}
                placeholder="Select categories"
                emptyIndicator={
                  <p className="text-center text-sm">No results found</p>
                }
              />
              {selectedOptions.map((option) => (
                <input
                  key={option.value}
                  type="hidden"
                  name="categories"
                  value={option.value}
                />
              ))}
              <p className="text-destructive text-xs" role="alert">
                {state?.errors.categories}
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card text-muted-foreground px-2">
                  Auto Generated
                </span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title">
                Title
                {metadata && (
                  <span className="text-muted-foreground ml-2 text-xs">
                    (auto-filled)
                  </span>
                )}
              </Label>
              <Input
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Page title"
                className={metadata ? "border-green-200" : ""}
              />
              <p className="text-destructive text-xs" role="alert">
                {state?.errors.title}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="favicon">
                Favicon
                {metadata && (
                  <span className="text-muted-foreground ml-2 text-xs">
                    (auto-filled)
                  </span>
                )}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  name="favicon"
                  id="favicon"
                  value={favicon}
                  onChange={(e) => setFavicon(e.target.value)}
                  placeholder="https://example.com/favicon.ico"
                  className={metadata ? "flex-1 border-green-200" : "flex-1"}
                />
                {favicon && (
                  <Image
                    src={favicon}
                    alt="Favicon preview"
                    width={16}
                    height={16}
                    className="h-4 w-4 rounded-sm border"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                )}
              </div>
              <p className="text-destructive text-xs" role="alert">
                {state?.errors.favicon}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">
                Author
                {metadata && (
                  <span className="text-muted-foreground ml-2 text-xs">
                    (auto-filled)
                  </span>
                )}
              </Label>
              <Input
                name="author"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
                className={metadata ? "border-green-200" : ""}
              />
              <p className="text-destructive text-xs" role="alert">
                {state?.errors.author}
              </p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending ? "Adding..." : "Add Bookmark"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
