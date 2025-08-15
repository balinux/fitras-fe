import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// export const users = pgTable("users", {
//     id: serial("id").primaryKey(),
//     name: text("name").notNull(),
//     email: text("email").unique().notNull(),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
// });

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});
