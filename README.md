# Nathan's Bookmarks

A simple bookmarks application built with Next.js that automatically fetches website titles and favicons from URLs.

## Features

- 📝 **Simple Data Structure**: Only store URL and categories - titles and favicons are fetched automatically
- 🎨 **Category Filtering**: Filter bookmarks by category using the sidebar
- 🔍 **Automatic Metadata**: Fetches page titles and favicons from the actual websites
- 🎯 **Color-Coded Categories**: Each category has its own color scheme
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Fast Loading**: Built with Next.js and optimized for performance

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
```

## Adding New Bookmarks

To add new bookmarks, edit the `lib/bookmarks.ts` file:

```typescript
export const bookmarks: BookmarkData[] = [
  {
    href: "https://example.com",
    categories: ["design", "inspiration"],
  },
  // Add more bookmarks here...
]
```

### Available Categories

The following categories are available with their own color schemes:

- `design` - Purple
- `components` - Blue
- `react` - Cyan
- `css` - Orange
- `utility` - Green
- `development` - Gray
- `tools` - Yellow
- `git` - Red
- `inspiration` - Pink

You can add new categories by editing `lib/categories.ts`.

## How It Works

1. **Data Storage**: Bookmarks are stored as simple objects with `href` and `categories`
2. **Metadata Fetching**: The app automatically fetches page titles and favicons using a Next.js API route (`/api/bookmark-metadata`)
3. **Server-Side Processing**: Metadata is fetched server-side to avoid CORS issues
4. **Caching**: Results are cached in component state to avoid refetching
5. **Fallbacks**: If fetching fails, it gracefully falls back to the domain name as title
