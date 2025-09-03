import { bookmarks } from "@/lib/bookmarks"
import { Hero, HeroDescription, HeroHeading } from "@/components/ui/hero"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Bookmark } from "@/components/bookmark"
import { CategoriesSidebar } from "@/components/categories-sidebar"

type HomeProps = {
  searchParams: { categories?: string }
}

export default function Home({ searchParams }: HomeProps) {
  const selectedCategory = searchParams.categories

  // Filter bookmarks based on selected category
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
      <section className="px-4 py-6 sm:px-6 md:py-12">
        <div className="grid w-full grid-cols-5 gap-6 xl:gap-16">
          <div className="col-span-5 max-w-5xl lg:col-span-1">
            <nav className="sticky top-24">
              <SidebarProvider className="flex-1">
                <CategoriesSidebar />
              </SidebarProvider>
            </nav>
          </div>
          <div className="col-span-5 space-y-2 lg:col-span-4">
            {filteredBookmarks.map((bookmark) => (
              <Bookmark
                key={bookmark.href}
                href={bookmark.href}
                categories={bookmark.categories}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
