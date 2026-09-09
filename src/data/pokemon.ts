import type { PokemonType } from '@/constants/pokemon-types';

export type PokemonStats = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

export type PokemonAbility = {
  name: string;
  isHidden: boolean;
};

export type Pokemon = {
  id: number;
  name: string;
  types: PokemonType[];
  sprite: string;
  heightM: number;
  weightKg: number;
  description: string;
  abilities: PokemonAbility[];
  stats: PokemonStats;
};

/**
 * Mock data for the frontend MVP. Sprites point to the public PokéAPI/Github
 * sprites CDN as static images — no client calls or backend/service layer.
 */
export const MockPokemon: Pokemon[] = [
  {
    id: 1,
    name: 'Bulbasaur',
    types: ['grass', 'poison'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    heightM: 0.7,
    weightKg: 6.9,
    description: 'Tiene una semilla en el lomo desde su nacimiento. La semilla crece poco a poco.',
    abilities: [
      { name: 'Espesura', isHidden: false },
      { name: 'Clorofila', isHidden: true },
    ],
    stats: { hp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45 },
  },
  {
    id: 4,
    name: 'Charmander',
    types: ['fire'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    heightM: 0.6,
    weightKg: 8.5,
    description: 'Desde que nace, tiene una llama en la punta de la cola que arde toda su vida.',
    abilities: [
      { name: 'Mar Llamas', isHidden: false },
      { name: 'Poder Solar', isHidden: true },
    ],
    stats: { hp: 39, attack: 52, defense: 43, specialAttack: 60, specialDefense: 50, speed: 65 },
  },
  {
    id: 7,
    name: 'Squirtle',
    types: ['water'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
    heightM: 0.5,
    weightKg: 9.0,
    description: 'Tras nacer, su espalda se recubre de un caparazón que se endurece al secarse.',
    abilities: [
      { name: 'Torrente', isHidden: false },
      { name: 'Llovizna', isHidden: true },
    ],
    stats: { hp: 44, attack: 48, defense: 65, specialAttack: 50, specialDefense: 64, speed: 43 },
  },
  {
    id: 25,
    name: 'Pikachu',
    types: ['electric'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    heightM: 0.4,
    weightKg: 6.0,
    description: 'Cuando varios de estos Pokémon se juntan, su electricidad puede acumular y causar tormentas.',
    abilities: [
      { name: 'Electricidad Estática', isHidden: false },
      { name: 'Pararrayos', isHidden: true },
    ],
    stats: { hp: 35, attack: 55, defense: 40, specialAttack: 50, specialDefense: 50, speed: 90 },
  },
  {
    id: 133,
    name: 'Eevee',
    types: ['normal'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
    heightM: 0.3,
    weightKg: 6.5,
    description: 'Su código genético es irregular, lo que le permite evolucionar en muchas formas distintas.',
    abilities: [
      { name: 'Aroma Dulce', isHidden: false },
      { name: 'Anticipación', isHidden: true },
    ],
    stats: { hp: 55, attack: 55, defense: 50, specialAttack: 45, specialDefense: 65, speed: 55 },
  },
  {
    id: 94,
    name: 'Gengar',
    types: ['ghost', 'poison'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
    heightM: 1.5,
    weightKg: 40.5,
    description: 'Se dice que aparece de las sombras para robar la vitalidad de quienes se pierden en la montaña.',
    abilities: [
      { name: 'Levitación', isHidden: false },
      { name: 'Presión Extraña', isHidden: true },
    ],
    stats: { hp: 60, attack: 65, defense: 60, specialAttack: 130, specialDefense: 75, speed: 110 },
  },
  {
    id: 143,
    name: 'Snorlax',
    types: ['normal'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png',
    heightM: 2.1,
    weightKg: 460.0,
    description: 'No hay nada que le preocupe. No le importa lo que le pase, sigue comiendo y durmiendo.',
    abilities: [
      { name: 'Absorbe Golpes', isHidden: false },
      { name: 'Glotonería', isHidden: true },
    ],
    stats: { hp: 160, attack: 110, defense: 65, specialAttack: 65, specialDefense: 110, speed: 30 },
  },
  {
    id: 149,
    name: 'Dragonite',
    types: ['dragon', 'flying'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
    heightM: 2.2,
    weightKg: 210.0,
    description: 'Un Pokémon legendario que puede volar alrededor del mundo en solo dieciséis horas.',
    abilities: [
      { name: 'Cuerpo Puro', isHidden: false },
      { name: 'Multiescamas', isHidden: true },
    ],
    stats: { hp: 91, attack: 134, defense: 95, specialAttack: 100, specialDefense: 100, speed: 80 },
  },
  {
    id: 150,
    name: 'Mewtwo',
    types: ['psychic'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
    heightM: 2.0,
    weightKg: 122.0,
    description: 'Un Pokémon creado por manipulación genética. Se dice que tiene un corazón despiadado.',
    abilities: [{ name: 'Presión', isHidden: false }],
    stats: { hp: 106, attack: 110, defense: 90, specialAttack: 154, specialDefense: 90, speed: 130 },
  },
  {
    id: 197,
    name: 'Umbreon',
    types: ['dark'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png',
    heightM: 1.0,
    weightKg: 27.0,
    description: 'Cuando la oscuridad envuelve el aire nocturno, los anillos de su cuerpo brillan con fuerza.',
    abilities: [
      { name: 'Sincronía', isHidden: false },
      { name: 'Anticipación', isHidden: true },
    ],
    stats: { hp: 95, attack: 65, defense: 110, specialAttack: 60, specialDefense: 130, speed: 65 },
  },
  {
    id: 405,
    name: 'Luxray',
    types: ['electric'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/405.png',
    heightM: 1.4,
    weightKg: 42.0,
    description: 'Su mirada puede atravesar cualquier objeto, incluso ver a través de paredes y del suelo.',
    abilities: [
      { name: 'Intimidación', isHidden: false },
      { name: 'Rivalidad', isHidden: true },
    ],
    stats: { hp: 80, attack: 120, defense: 79, specialAttack: 95, specialDefense: 79, speed: 70 },
  },
  {
    id: 445,
    name: 'Garchomp',
    types: ['dragon', 'ground'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/445.png',
    heightM: 1.9,
    weightKg: 95.0,
    description: 'Vuela a la velocidad del sonido rozando el suelo. Es tan veloz que parece teletransportarse.',
    abilities: [
      { name: 'Arena Fina', isHidden: false },
      { name: 'Aspereza', isHidden: true },
    ],
    stats: { hp: 108, attack: 130, defense: 95, specialAttack: 80, specialDefense: 85, speed: 102 },
  },
];

export function getPokemonById(id: number): Pokemon | undefined {
  return MockPokemon.find((pokemon) => pokemon.id === id);
}
