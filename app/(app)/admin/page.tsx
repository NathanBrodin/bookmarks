import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { getBookmarks } from "@/lib/actions/bookmark"
import { auth } from "@/lib/auth"
import { AdminBookmark } from "@/components/admin-bookmark"
import { BookmarkForm } from "@/components/bookmark-form"

interface AdminPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams
  const editId = typeof params.edit === "string" ? params.edit : undefined

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/sign-in")
  }

  const bookmarks = (await getBookmarks()).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )

  // Find the bookmark to edit if edit param is present
  const editingBookmark = editId
    ? bookmarks.find((bookmark) => bookmark.id === parseInt(editId))
    : null

  return (
    <div className="flex gap-6 p-6">
      <BookmarkForm editingBookmark={editingBookmark} />
      <div>
        {bookmarks.map((bookmark) => (
          <AdminBookmark key={bookmark.id} {...bookmark} />
        ))}
      </div>
    </div>
  )
}
