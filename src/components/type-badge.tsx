import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { PokemonTypeColors, PokemonTypeLabels, type PokemonType } from '@/constants/pokemon-types';
import { Spacing } from '@/constants/theme';

type TypeBadgeProps = {
  type: PokemonType;
  small?: boolean;
};

export function TypeBadge({ type, small }: TypeBadgeProps) {
  return (
    <View
      style={[
        styles.badge,
        small && styles.badgeSmall,
        { backgroundColor: PokemonTypeColors[type] },
      ]}>
      <ThemedText type={small ? 'small' : 'smallBold'} style={styles.label}>
        {PokemonTypeLabels[type]}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Spacing.four,
  },
  badgeSmall: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
  },
  label: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontSize: 11,
    lineHeight: 14,
  },
});
