"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import {
  fetchBookmarkMetadata,
  type BookmarkWithMetadata,
} from "@/lib/bookmarks"
import { categories as categoryData } from "@/lib/categories"

type BookmarkProps = {
  href: string
  categories: string[]
}

export function Bookmark({ href, categories }: BookmarkProps) {
  const [bookmark, setBookmark] = useState<BookmarkWithMetadata>({
    href,
    categories,
    title: new URL(href).hostname,
    loading: true,
  })

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const metadata = await fetchBookmarkMetadata(href)
        setBookmark((prev) => ({
          ...prev,
          title: metadata.title,
          favicon: metadata.favicon,
          loading: false,
        }))
      } catch (error) {
        setBookmark((prev) => ({
          ...prev,
          title: new URL(href).hostname,
          loading: false,
          error: error instanceof Error ? error.message : "Failed to load",
        }))
      }
    }

    loadMetadata()
  }, [href])

  const getCategoryStyle = (categoryId: string) => {
    const category = categoryData.find((cat) => cat.id === categoryId)
    return (
      category?.classlabel ||
      "border-gray-300 bg-gray-200/10 text-gray-900 dark:border-gray-400/15 dark:bg-gray-800/5 dark:text-gray-200"
    )
  }
  return (
    <Link
      href={bookmark.href}
      target="_blank"
      className="group hover:border-grid hover:bg-grid/50 relative flex flex-col items-start justify-between gap-2 rounded border border-transparent p-2 hover:[box-shadow:_var(--sh-alt)] lg:min-h-[42px] lg:flex-row lg:items-center"
    >
      <svg className="text-grid pointer-events-none invisible absolute inset-0 [z-index:-1] size-full [mask-image:linear-gradient(to_left,_#ffffffad,_transparent)] opacity-50 select-none group-hover:visible dark:opacity-80">
        <defs>
          <pattern
            id=":S6:"
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="4"
              stroke="currentColor"
              strokeWidth="1.5"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:S6:)"></rect>
      </svg>
      <div className="flex shrink-0 flex-col items-start gap-2 lg:flex-row lg:items-center">
        <h2 className="decoration-primary-fixed/20 hover:decoration-primary-fixed/80 group-hover:decoration-primary-fixed/80 text-foreground text-[0.9375rem] underline">
          {bookmark.loading ? (
            <span className="inline-block h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></span>
          ) : bookmark.error ? (
            <span className="text-red-500">Failed to load</span>
          ) : (
            bookmark.title
          )}
        </h2>
        <div className="hidden -space-x-1.5 hover:space-x-2 lg:flex">
          {bookmark.loading ? (
            <div className="size-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
          ) : bookmark.favicon && !bookmark.error ? (
            <Image
              src={bookmark.favicon}
              alt=""
              width={16}
              height={16}
              className="size-4 rounded-sm"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
          ) : null}
        </div>
      </div>
      <hr className="border-border/50 hidden w-full opacity-60 group-hover:invisible lg:flex dark:opacity-40" />
      <div className="flex w-full shrink-0 items-center gap-1 lg:w-fit">
        <div className="flex -space-x-1.5 lg:hidden">
          {bookmark.loading ? (
            <div className="size-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
          ) : bookmark.favicon && !bookmark.error ? (
            <Image
              src={bookmark.favicon}
              alt=""
              width={16}
              height={16}
              className="size-4 rounded-sm"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
          ) : null}
        </div>
        {bookmark.categories && bookmark.categories.length > 0 && (
          <>
            <span className="flex opacity-15 lg:hidden">|</span>
            <div className="flex flex-wrap gap-2">
              {bookmark.categories.map((category, index) => (
                <div
                  key={index}
                  className={`flex h-[18px] w-fit shrink-0 items-center gap-1.5 rounded-xs border border-dotted px-1 font-mono text-[0.625rem] leading-6 ${getCategoryStyle(category)}`}
                >
                  {category}
                </div>
              ))}
            </div>
            <span className="hidden opacity-15 lg:flex">|</span>
          </>
        )}
        <p className="text-offgray-600 dark:text-offgray-500 ml-auto font-mono text-xs">
          Sep 03, 2025
        </p>
      </div>
      <hr className="border-border/50 flex w-full opacity-60 group-hover:invisible lg:hidden dark:opacity-40" />
    </Link>
  )
}
