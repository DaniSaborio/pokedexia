import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PokemonCard } from '@/components/pokemon-card';
import { PokemonDetail } from '@/components/pokemon-detail';
import { Brand, FloatingNavInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { MockPokemon, type Pokemon } from '@/data/pokemon';
import { showNav, useHideNavOnScroll } from '@/hooks/nav-visibility';

/**
 * Groups the list into a bento-style pattern: every third row is a full-width
 * "featured" tile, the rest are regular two-up pairs.
 */
type BentoRow = { key: string; featured: Pokemon | null; pair: Pokemon[] };

function buildBentoRows(pokemon: Pokemon[]): BentoRow[] {
  const rows: BentoRow[] = [];
  let i = 0;
  let cycle = 0;
  while (i < pokemon.length) {
    if (cycle % 3 === 0) {
      rows.push({ key: `f-${pokemon[i].id}`, featured: pokemon[i], pair: [] });
      i += 1;
    } else {
      const pair = pokemon.slice(i, i + 2);
      rows.push({ key: `p-${pair[0].id}`, featured: null, pair });
      i += pair.length;
    }
    cycle += 1;
  }
  return rows;
}

export default function PokedexScreen() {
  const [query, setQuery] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const filteredPokemon = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return MockPokemon;
    return MockPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(normalizedQuery));
  }, [query]);

  const bentoRows = useMemo(() => buildBentoRows(filteredPokemon), [filteredPokemon]);
  const handleScroll = useHideNavOnScroll();

  useEffect(() => {
    showNav();
  }, []);

  if (selectedPokemon) {
    return <PokemonDetail pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Pokédexia</Text>
          <Text style={styles.subtitle}>Edición Luxury</Text>
        </View>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar Pokémon..."
          placeholderTextColor={Brand.gold}
          style={styles.search}
        />

        <ScrollView
          contentContainerStyle={styles.listContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          {bentoRows.map((row) =>
            row.featured ? (
              <PokemonCard
                key={row.key}
                pokemon={row.featured}
                onPress={setSelectedPokemon}
                featured
              />
            ) : (
              <View key={row.key} style={styles.row}>
                {row.pair.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} onPress={setSelectedPokemon} />
                ))}
              </View>
            )
          )}
          {filteredPokemon.length === 0 && (
            <Text style={styles.emptyText}>No se encontró ningún Pokémon con ese nombre.</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Brand.black,
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.three,
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.three,
    paddingBottom: Spacing.three,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: Brand.gold,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Brand.magenta,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  search: {
    borderWidth: 1,
    borderColor: Brand.gold,
    borderRadius: Spacing.four,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    color: Brand.cream,
    backgroundColor: Brand.charcoal,
    marginBottom: Spacing.three,
  },
  listContent: {
    paddingBottom: Spacing.six + FloatingNavInset,
    gap: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  emptyText: {
    color: Brand.cream,
    textAlign: 'center',
    marginTop: Spacing.five,
  },
});
