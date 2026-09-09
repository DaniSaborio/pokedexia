import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PokemonCard } from '@/components/pokemon-card';
import { PokemonDetail } from '@/components/pokemon-detail';
import { Brand, MaxContentWidth, Spacing } from '@/constants/theme';
import { MockPokemon, type Pokemon } from '@/data/pokemon';

export default function PokedexScreen() {
  const [query, setQuery] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const filteredPokemon = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return MockPokemon;
    return MockPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(normalizedQuery));
  }, [query]);

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

        <FlatList
          data={filteredPokemon}
          keyExtractor={(pokemon) => String(pokemon.id)}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <PokemonCard pokemon={item} onPress={setSelectedPokemon} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No se encontró ningún Pokémon con ese nombre.</Text>
          }
        />
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
    paddingVertical: Spacing.three,
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
    paddingBottom: Spacing.six,
    gap: Spacing.three,
  },
  row: {
    gap: Spacing.three,
  },
  emptyText: {
    color: Brand.cream,
    textAlign: 'center',
    marginTop: Spacing.five,
  },
});
