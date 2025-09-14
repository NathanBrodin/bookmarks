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

  const bookmarks = await getBookmarks()

  const filteredBookmarks = selectedCategory
    ? bookmarks.filter((bookmark) =>
        bookmark.categories.includes(selectedCategory)
      )
    : bookmarks

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
              <SidebarProvider className="min-h-fit flex-1">
                <CategoriesSidebar />
              </SidebarProvider>
            </nav>
          </div>
          <div className="col-span-5 space-y-2 lg:col-span-4">
            {filteredBookmarks.map((bookmark) => (
              <Bookmark key={bookmark.id} {...bookmark} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
