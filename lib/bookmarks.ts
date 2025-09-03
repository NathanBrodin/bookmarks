export type BookmarkData = {
  href: string
  categories: string[]
}

export type BookmarkWithMetadata = BookmarkData & {
  title: string
  favicon?: string
  loading?: boolean
  error?: string
}

export const bookmarks: BookmarkData[] = [
  {
    href: "https://ui.shadcn.com",
    categories: ["design", "components", "react"],
  },
  {
    href: "https://tailwindcss.com",
    categories: ["css", "design", "utility"],
  },
  {
    href: "https://github.com",
    categories: ["development", "tools", "git"],
  },
  {
    href: "https://dribbble.com",
    categories: ["design", "inspiration"],
  },
  {
    href: "https://v0.dev",
    categories: ["design", "tools", "components"],
  },
  {
    href: "https://fontjoy.com",
    categories: ["design", "tools"],
  },
  {
    href: "https://coolors.co",
    categories: ["design", "tools", "inspiration"],
  },
  {
    href: "https://react.dev",
    categories: ["react", "development"],
  },
  {
    href: "https://nextjs.org",
    categories: ["react", "development", "tools"],
  },
  {
    href: "https://vercel.com",
    categories: ["development", "tools", "utility"],
  },
  {
    href: "https://figma.com",
    categories: ["design", "tools"],
  },
  {
    href: "https://linear.app",
    categories: ["tools", "development"],
  },
]

export async function fetchBookmarkMetadata(
  url: string
): Promise<{ title: string; favicon?: string }> {
  try {
    const response = await fetch(
      `/api/bookmark-metadata?url=${encodeURIComponent(url)}`
    )
    if (!response.ok) {
      throw new Error("Failed to fetch metadata")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching bookmark metadata:", error)
    return {
      title: new URL(url).hostname,
      favicon: undefined,
    }
  }
}
