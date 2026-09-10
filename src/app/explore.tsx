import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TypeBadge } from '@/components/type-badge';
import { TypeMatchupGraph } from '@/components/type-matchup-graph';
import {
  AllPokemonTypes,
  PokemonTypeLabels,
  getComboDefenseMultipliers,
  type PokemonType,
} from '@/constants/pokemon-types';
import { Brand, FloatingNavInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { showNav, useHideNavOnScroll } from '@/hooks/nav-visibility';

const WeaknessGroups = [
  { key: 4, label: 'Débil x4', color: '#E4482E' },
  { key: 2, label: 'Débil x2', color: '#EC8067' },
  { key: 0.5, label: 'Resiste x0.5', color: '#7FCB9A' },
  { key: 0.25, label: 'Resiste x0.25', color: '#4CAF6D' },
  { key: 0, label: 'Inmune x0', color: '#F0952E' },
] as const;

export default function TypesScreen() {
  const [selectedTypes, setSelectedTypes] = useState<PokemonType[]>(['electric']);

  const toggleType = (type: PokemonType) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        if (prev.length === 1) return prev;
        return prev.filter((t) => t !== type);
      }
      if (prev.length < 2) return [...prev, type];
      return [prev[1], type];
    });
  };

  const defenseMultipliers = useMemo(
    () => getComboDefenseMultipliers(selectedTypes),
    [selectedTypes]
  );

  const grouped = useMemo(() => {
    const groups: Record<number, PokemonType[]> = { 4: [], 2: [], 0.5: [], 0.25: [], 0: [] };
    for (const type of AllPokemonTypes) {
      if (selectedTypes.includes(type)) continue;
      const multiplier = defenseMultipliers[type];
      if (multiplier in groups) groups[multiplier].push(type);
    }
    return groups;
  }, [defenseMultipliers, selectedTypes]);

  const handleScroll = useHideNavOnScroll();

  useEffect(() => {
    showNav();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          <View style={styles.header}>
            <Text style={styles.title}>Tabla de tipos</Text>
            <Text style={styles.subtitle}>Elige hasta 2 tipos para ver su efectividad</Text>
          </View>

          <View style={styles.grid}>
            {AllPokemonTypes.map((type) => (
              <Pressable key={type} onPress={() => toggleType(type)}>
                <View
                  style={[styles.chipWrapper, selectedTypes.includes(type) && styles.chipSelected]}>
                  <TypeBadge type={type} />
                </View>
              </Pressable>
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.comboHeader}>
              {selectedTypes.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </View>
            <Text style={styles.sectionSubtitle}>
              Fortalezas y debilidades defensivas de esta combinación
            </Text>
            <TypeMatchupGraph types={selectedTypes} />
          </View>

          {WeaknessGroups.map(
            ({ key, label, color }) =>
              grouped[key].length > 0 && (
                <View key={key} style={[styles.section, { borderColor: color }]}>
                  <Text style={[styles.sectionTitle, { color }]}>{label}</Text>
                  <View style={styles.typesRow}>
                    {grouped[key].map((type) => (
                      <TypeBadge key={type} type={type} small />
                    ))}
                  </View>
                </View>
              )
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
  },
  scrollContent: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.six + FloatingNavInset,
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.four,
    paddingBottom: Spacing.four,
  },
  title: {
    color: Brand.gold,
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    color: Brand.cream,
    opacity: 0.8,
    marginTop: Spacing.half,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    justifyContent: 'center',
    marginBottom: Spacing.four,
  },
  chipWrapper: {
    borderRadius: Spacing.four,
    padding: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  chipSelected: {
    borderColor: Brand.magenta,
  },
  section: {
    backgroundColor: Brand.charcoal,
    borderColor: Brand.gold,
    borderWidth: 1,
    borderRadius: Spacing.three,
    padding: Spacing.three,
    marginBottom: Spacing.three,
  },
  sectionTitle: {
    color: Brand.gold,
    fontWeight: '700',
    marginBottom: Spacing.two,
  },
  sectionSubtitle: {
    color: Brand.cream,
    opacity: 0.8,
    fontSize: 13,
    marginBottom: Spacing.two,
  },
  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  comboHeader: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginBottom: Spacing.one,
  },
});
