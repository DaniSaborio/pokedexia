import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { TypeBadge } from '@/components/type-badge';
import { Brand, Spacing } from '@/constants/theme';
import type { Pokemon } from '@/data/pokemon';

type PokemonCardProps = {
  pokemon: Pokemon;
  onPress: (pokemon: Pokemon) => void;
};

export function PokemonCard({ pokemon, onPress }: PokemonCardProps) {
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
  name: {
    color: Brand.cream,
    textAlign: 'center',
  },
  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.half,
  },
});
