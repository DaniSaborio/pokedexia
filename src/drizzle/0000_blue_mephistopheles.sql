CREATE TABLE `abilities` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`is_hidden` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `effectiveness` (
	`id` integer PRIMARY KEY NOT NULL,
	`type_id` integer NOT NULL,
	`target_type_id` integer NOT NULL,
	`effectiveness` integer NOT NULL,
	FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`target_type_id`) REFERENCES `types`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `moves` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`priority` integer NOT NULL,
	`effect` text NOT NULL,
	`power` integer NOT NULL,
	`accuracy` integer NOT NULL,
	`pp` integer NOT NULL,
	`damage_class` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pokemon_abilities` (
	`id` integer PRIMARY KEY NOT NULL,
	`pokemon_id` integer NOT NULL,
	`ability_id` integer NOT NULL,
	FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ability_id`) REFERENCES `abilities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pokemon_moves` (
	`id` integer PRIMARY KEY NOT NULL,
	`pokemon_id` integer NOT NULL,
	`move_id` integer NOT NULL,
	`name` text NOT NULL,
	`priority` integer NOT NULL,
	`effect` text NOT NULL,
	`power` integer NOT NULL,
	`accuracy` integer NOT NULL,
	`pp` integer NOT NULL,
	`damage_class` text NOT NULL,
	FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`move_id`) REFERENCES `moves`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pokemon_stats` (
	`id` integer PRIMARY KEY NOT NULL,
	`pokemon_id` integer NOT NULL,
	`stat_id` integer NOT NULL,
	`name` text NOT NULL,
	`value` integer NOT NULL,
	`description` text NOT NULL,
	FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`stat_id`) REFERENCES `stats`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pokemon_types` (
	`id` integer PRIMARY KEY NOT NULL,
	`pokemon_id` integer NOT NULL,
	`type_id` integer NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pokemons` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`height` integer NOT NULL,
	`weight` integer NOT NULL,
	`image_url` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `resistances` (
	`id` integer PRIMARY KEY NOT NULL,
	`type_id` integer NOT NULL,
	`target_type_id` integer NOT NULL,
	`resistance` integer NOT NULL,
	FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`target_type_id`) REFERENCES `types`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `stats` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`value` integer NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `types` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL
);
