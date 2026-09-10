import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { TypeBadge } from '@/components/type-badge';
import { PokemonTypeColors } from '@/constants/pokemon-types';
import { Brand, Spacing } from '@/constants/theme';
import type { Pokemon } from '@/data/pokemon';

type PokemonCardProps = {
  pokemon: Pokemon;
  onPress: (pokemon: Pokemon) => void;
  /** Bigger "hero" tile spanning the full row, used to break up the grid bento-style. */
  featured?: boolean;
};

export function PokemonCard({ pokemon, onPress, featured }: PokemonCardProps) {
  const accentColor = PokemonTypeColors[pokemon.types[0]];

  if (featured) {
    return (
      <Pressable
        onPress={() => onPress(pokemon)}
        style={({ pressed }) => [styles.featuredCard, pressed && styles.pressed]}>
        <View style={[styles.featuredAccent, { backgroundColor: `${accentColor}33` }]} />
        <Image
          source={{ uri: pokemon.sprite }}
          style={styles.featuredSprite}
          contentFit="contain"
        />
        <View style={styles.featuredInfo}>
          <ThemedText type="small" style={styles.number}>
            #{String(pokemon.id).padStart(3, '0')}
          </ThemedText>
          <ThemedText type="smallBold" style={styles.featuredName}>
            {pokemon.name}
          </ThemedText>
          <View style={[styles.typesRow, styles.featuredTypesRow]}>
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {pokemon.description}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={() => onPress(pokemon)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <ThemedText type="small" style={styles.number}>
        #{String(pokemon.id).padStart(3, '0')}
      </ThemedText>
      <Image source={{ uri: pokemon.sprite }} style={styles.sprite} contentFit="contain" />
      <ThemedText type="smallBold" style={styles.name}>
        {pokemon.name}
      </ThemedText>
      <View style={styles.typesRow}>
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} small />
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Brand.charcoal,
    borderColor: Brand.gold,
    borderWidth: 1,
    borderRadius: Spacing.three,
    padding: Spacing.two,
    alignItems: 'center',
    gap: Spacing.half,
  },
  featuredCard: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: Brand.charcoal,
    borderColor: Brand.gold,
    borderWidth: 1,
    borderRadius: Spacing.four,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  featuredAccent: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  pressed: {
    opacity: 0.75,
  },
  number: {
    alignSelf: 'flex-start',
    color: Brand.gold,
  },
  sprite: {
    width: 84,
    height: 84,
  },
  featuredSprite: {
    width: 110,
    height: 110,
  },
  featuredInfo: {
    flex: 1,
    gap: Spacing.half,
  },
  name: {
    color: Brand.cream,
    textAlign: 'center',
  },
  featuredName: {
    color: Brand.cream,
    fontSize: 20,
  },
  description: {
    color: Brand.cream,
    opacity: 0.75,
    fontSize: 12,
    lineHeight: 16,
    marginTop: Spacing.half,
  },
  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.half,
  },
  featuredTypesRow: {
    justifyContent: 'flex-start',
  },
});
