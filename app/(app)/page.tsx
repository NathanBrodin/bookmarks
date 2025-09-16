import { getBookmarks } from "@/lib/actions/bookmark"
import { Hero, HeroDescription, HeroHeading } from "@/components/ui/hero"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Bookmark } from "@/components/bookmark"
import { CategoriesSidebar } from "@/components/categories-sidebar"
import { Search } from "@/components/search"

type HomeProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams
  const selectedCategory =
    typeof params.categories === "string" ? params.categories : undefined
  const searchQuery =
    typeof params.search === "string" ? params.search : undefined

  const bookmarks = await getBookmarks()

  let filteredBookmarks = bookmarks

  // Filter by search query first (title, author, url, categories hierarchy)
  if (searchQuery) {
    const query = searchQuery.toLowerCase().trim()
    filteredBookmarks = filteredBookmarks
      .filter((bookmark) => {
        // Priority 1: Title
        if (bookmark.title.toLowerCase().includes(query)) {
          return true
        }
        // Priority 2: Author
        if (bookmark.author && bookmark.author.toLowerCase().includes(query)) {
          return true
        }
        // Priority 3: URL
        if (bookmark.url.toLowerCase().includes(query)) {
          return true
        }
        // Priority 4: Categories
        if (
          bookmark.categories.some((category) =>
            category.toLowerCase().includes(query)
          )
        ) {
          return true
        }
        return false
      })
      .sort((a, b) => {
        // Sort by search relevance hierarchy
        const aTitle = a.title.toLowerCase().includes(query)
        const bTitle = b.title.toLowerCase().includes(query)
        const aAuthor = a.author && a.author.toLowerCase().includes(query)
        const bAuthor = b.author && b.author.toLowerCase().includes(query)
        const aUrl = a.url.toLowerCase().includes(query)
        const bUrl = b.url.toLowerCase().includes(query)

        if (aTitle && !bTitle) return -1
        if (bTitle && !aTitle) return 1
        if (aAuthor && !bAuthor) return -1
        if (bAuthor && !aAuthor) return 1
        if (aUrl && !bUrl) return -1
        if (bUrl && !aUrl) return 1

        return 0
      })
  }

  // Then filter by selected category
  if (selectedCategory) {
    filteredBookmarks = filteredBookmarks.filter((bookmark) =>
      bookmark.categories.includes(selectedCategory)
    )
  }

  return (
    <>
      <Hero>
        <HeroHeading>Nathan&apos;s Bookmarks</HeroHeading>
        <HeroDescription>
          My collection of design inspiration and useful tools
        </HeroDescription>
      </Hero>
      <Search />
      <section className="px-4 sm:px-6 sm:py-4">
        <div className="grid w-full grid-cols-5 gap-6 xl:gap-16">
          <div className="col-span-5 max-w-5xl lg:col-span-1">
            <nav className="sticky top-24">
              <CategoriesSidebar />
            </nav>
          </div>
          <div className="col-span-5 space-y-2 lg:col-span-4">
            {filteredBookmarks.map((bookmark) => (
              <Bookmark key={bookmark.id} {...bookmark} />
            ))}
            {filteredBookmarks.length === 0 && (
              <span className="text-muted-foreground text-sm">
                No result found for &quot;{searchQuery}&quot;
              </span>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
