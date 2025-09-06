"use server"

import { revalidateTag, unstable_cache } from "next/cache"
import { db } from "@/db"
import { bookmarks, bookmarkSchema } from "@/db/schema"

export default async function addBookmark(
  prevState: any /* eslint-disable-line */,
  formData: FormData
) {
  try {
    const validatedData = bookmarkSchema.safeParse({
      url: formData.get("url"),
      title: formData.get("title"),
      categories: formData.getAll("categories") as string[],
      favicon: formData.get("favicon"),
      author: formData.get("author"),
    })

    if (!validatedData.success) {
      return {
        errors: validatedData.error.flatten().fieldErrors,
      }
    }

    await db.insert(bookmarks).values({
      title: validatedData.data.title.trim(),
      url: validatedData.data.url,
      categories: validatedData.data.categories,
      favicon: validatedData.data.favicon?.trim(),
      author: validatedData.data.author?.trim(),
    })

    revalidateTag("bookmarks")
  } catch (e) {
    console.error("Error adding bookmark:", e)
  }
}

export const getBookmarks = unstable_cache(
  async () => {
    return await db.select().from(bookmarks)
  },
  ["bookmarks"],
  { tags: ["bookmarks"], revalidate: false }
)
