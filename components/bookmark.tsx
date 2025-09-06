"use client"

import Image from "next/image"
import Link from "next/link"
import { Bookmark as BookmarkData } from "@/db/schema"

import { categories as categoryData } from "@/lib/categories"

export function Bookmark(bookmark: BookmarkData) {
  const getCategoryStyle = (categoryId: string) => {
    const category = categoryData.find((cat) => cat.value === categoryId)
    return (
      category?.classlabel ||
      "border-gray-300 bg-gray-200/10 text-gray-900 dark:border-gray-400/15 dark:bg-gray-800/5 dark:text-gray-200"
    )
  }
  return (
    <Link
      href={bookmark.url}
      target="_blank"
      className="group hover:border-grid hover:bg-grid/50 hover:shadow-alt relative flex flex-col items-start justify-between gap-2 rounded border border-transparent p-2 lg:min-h-[42px] lg:flex-row lg:items-center"
    >
      <svg className="text-grid pointer-events-none invisible absolute inset-0 [z-index:-1] size-full [mask-image:linear-gradient(to_left,_#ffffffad,_transparent)] opacity-50 select-none group-hover:visible">
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
          {bookmark.title}
        </h2>
        <div className="hidden -space-x-1.5 hover:space-x-2 lg:flex">
          {bookmark.favicon && (
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
          )}
        </div>
      </div>
      <hr className="border-border/50 hidden w-full opacity-60 group-hover:invisible lg:flex dark:opacity-90" />
      <div className="flex w-full shrink-0 items-center gap-1 lg:w-fit">
        <div className="flex -space-x-1.5 lg:hidden">
          {bookmark.favicon && (
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
          )}
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
        <p className="text-muted-foreground ml-auto font-mono text-xs">
          {bookmark.author}
        </p>
      </div>
      <hr className="border-border/50 flex w-full opacity-60 group-hover:invisible lg:hidden dark:opacity-40" />
    </Link>
  )
}
