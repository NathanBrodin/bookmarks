export type BookmarkData = {
  href: string
  categories: string[]
}

export type BookmarkWithMetadata = BookmarkData & {
  title: string
  favicon?: string
}

export const bookmarks: BookmarkWithMetadata[] = [
  {
    title: "The Foundation for your Design System - shadcn/ui",
    href: "https://ui.shadcn.com",
    categories: ["design", "components", "react"],
  },
  {
    title:
      "Tailwind CSS - Rapidly build modern websites without ever leaving your HTML",
    href: "https://tailwindcss.com",
    categories: ["css", "design", "utility"],
  },
  {
    title:
      "GitHub · Build and ship software on a single, collaborative platform",
    href: "https://github.com",
    categories: ["development", "tools", "git"],
  },
  {
    title:
      "Dribbble - Discover the World’s Top Designers & Creative Professionals",
    href: "https://dribbble.com",
    categories: ["design", "inspiration"],
  },
  {
    title: "Fontjoy - Generate font pairings in one click",
    href: "https://fontjoy.com",
    categories: ["design", "tools"],
  },
]
