import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Brand, Spacing } from '@/constants/theme';

type StatBarProps = {
  label: string;
  value: number;
  /** Stats top out around 255 in the games; used to size the bar fill. */
  max?: number;
};

export function StatBar({ label, value, max = 180 }: StatBarProps) {
  const percentage = Math.min(100, Math.round((value / max) * 100));

  return (
    <View style={styles.row}>
      <ThemedText type="small" style={styles.label}>
        {label}
      </ThemedText>
      <ThemedText type="smallBold" style={styles.value}>
        {value}
      </ThemedText>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  label: {
    width: 88,
    color: Brand.gold,
    textTransform: 'uppercase',
  },
  value: {
    width: 32,
    textAlign: 'right',
    color: Brand.cream,
  },
  track: {
    flex: 1,
    height: 8,
    borderRadius: Spacing.two,
    backgroundColor: Brand.black,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: Spacing.two,
    backgroundColor: Brand.magenta,
  },
});
