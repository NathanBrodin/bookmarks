"use client"

import { useActionState, useState } from "react"

import addBookmark from "@/lib/actions/bookmark"
import { categories } from "@/lib/categories"
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

  return (
    <Dialog>
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
              <Input name="url" id="url" />
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
              <Label htmlFor="title">Title</Label>
              <Input name="title" id="title" />
              <p className="text-destructive text-xs" role="alert">
                {state?.errors.title}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="favicon">Favicon</Label>
              <Input name="favicon" id="favicon" />
              <p className="text-destructive text-xs" role="alert">
                {state?.errors.favicon}
              </p>
              <div className="grid gap-2">
                <Label htmlFor="author">Author</Label>
                <Input name="author" id="author" />
                <p className="text-destructive text-xs" role="alert">
                  {state?.errors.author}
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              Add Bookmark
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
