import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const bookmarks = sqliteTable("bookmarks", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
})
