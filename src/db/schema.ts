import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const pokemons = sqliteTable("pokemons", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  height: integer("height").notNull(),
  weight: integer("weight").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const abilities = sqliteTable("abilities", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  isHidden: integer("is_hidden").notNull().default(0),
});

export const pokemonAbilities = sqliteTable("pokemon_abilities", {
  id: integer("id").primaryKey(),
  pokemonId: integer("pokemon_id")
    .references(() => pokemons.id)
    .notNull(),
  abilityId: integer("ability_id")
    .references(() => abilities.id)
    .notNull(),
});

export const types = sqliteTable("types", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export const pokemonTypes = sqliteTable("pokemon_types", {
  id: integer("id").primaryKey(),
  pokemonId: integer("pokemon_id")
    .references(() => pokemons.id)
    .notNull(),
  typeId: integer("type_id")
    .references(() => types.id)
    .notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export const stats = sqliteTable("stats", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  value: integer("value").notNull(),
  description: text("description").notNull(),
});

export const pokemonStats = sqliteTable("pokemon_stats", {
  id: integer("id").primaryKey(),
  pokemonId: integer("pokemon_id")
    .references(() => pokemons.id)
    .notNull(),
  statId: integer("stat_id")
    .references(() => stats.id)
    .notNull(),
  name: text("name").notNull(),
  value: integer("value").notNull(),
  description: text("description").notNull(),
});
