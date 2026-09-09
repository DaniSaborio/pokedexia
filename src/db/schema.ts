import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

//DEMO SCHEMA FOR POKEMON DATABASE V1.0
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

export const effectiveness = sqliteTable("effectiveness", {
  id: integer("id").primaryKey(),
  typeId: integer("type_id")
    .references(() => types.id)
    .notNull(),
  targetTypeId: integer("target_type_id")
    .references(() => types.id)
    .notNull(),
  effectiveness: integer("effectiveness").notNull(),
});

export const resistances = sqliteTable("resistances", {
  id: integer("id").primaryKey(),
  typeId: integer("type_id")
    .references(() => types.id)
    .notNull(),
  targetTypeId: integer("target_type_id")
    .references(() => types.id)
    .notNull(),
  resistance: integer("resistance").notNull(),
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

export const moves = sqliteTable("moves", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  priority: integer("priority").notNull(),
  effect: text("effect").notNull(),
  power: integer("power").notNull(),
  accuracy: integer("accuracy").notNull(),
  pp: integer("pp").notNull(),
  damageClass: text("damage_class").notNull(),
});

export const pokemonMoves = sqliteTable("pokemon_moves", {
  id: integer("id").primaryKey(),
  pokemonId: integer("pokemon_id")
    .references(() => pokemons.id)
    .notNull(),
  moveId: integer("move_id")
    .references(() => moves.id)
    .notNull(),
  name: text("name").notNull(),
  priority: integer("priority").notNull(),
  effect: text("effect").notNull(),
  power: integer("power").notNull(),
  accuracy: integer("accuracy").notNull(),
  pp: integer("pp").notNull(),
  damageClass: text("damage_class").notNull(),
});
