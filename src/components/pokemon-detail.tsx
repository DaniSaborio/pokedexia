import { Image } from 'expo-image';
import { useEffect, useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PokeballIcon, type PokeballIconHandle } from '@/components/pokeball-icon';
import { StatBar } from '@/components/stat-bar';
import { TypeBadge } from '@/components/type-badge';
import { Brand, FloatingNavInset, MaxContentWidth, Spacing } from '@/constants/theme';
import type { Pokemon } from '@/data/pokemon';
import { showNav, useHideNavOnScroll } from '@/hooks/nav-visibility';

const CLOSE_DELAY_MS = 200;

type PokemonDetailProps = {
  pokemon: Pokemon;
  onClose: () => void;
};

export function PokemonDetail({ pokemon, onClose }: PokemonDetailProps) {
  const pokeballRef = useRef<PokeballIconHandle>(null);

  const handleClose = () => {
    pokeballRef.current?.pop();
    setTimeout(onClose, CLOSE_DELAY_MS);
  };

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
          <Pressable onPress={handleClose} style={styles.backButton}>
            <PokeballIcon ref={pokeballRef} size={24} />
            <Text style={styles.backLabel}>Volver</Text>
          </Pressable>

          <View style={styles.hero}>
            <Text style={styles.number}>#{String(pokemon.id).padStart(3, '0')}</Text>
            <Image source={{ uri: pokemon.sprite }} style={styles.sprite} contentFit="contain" />
            <Text style={styles.name}>{pokemon.name}</Text>
            <View style={styles.typesRow}>
              {pokemon.types.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.description}>{pokemon.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Datos</Text>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Altura</Text>
                <Text style={styles.infoValue}>{pokemon.heightM} m</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Peso</Text>
                <Text style={styles.infoValue}>{pokemon.weightKg} kg</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <View style={styles.abilitiesRow}>
              {pokemon.abilities.map((ability) => (
                <View key={ability.name} style={styles.abilityChip}>
                  <Text style={styles.abilityLabel}>
                    {ability.name}
                    {ability.isHidden ? ' (oculta)' : ''}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Estadísticas base</Text>
            <View style={styles.statsList}>
              <StatBar label="PS" value={pokemon.stats.hp} />
              <StatBar label="Ataque" value={pokemon.stats.attack} />
              <StatBar label="Defensa" value={pokemon.stats.defense} />
              <StatBar label="At. Esp." value={pokemon.stats.specialAttack} />
              <StatBar label="Def. Esp." value={pokemon.stats.specialDefense} />
              <StatBar label="Velocidad" value={pokemon.stats.speed} />
            </View>
          </View>
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.three,
    alignSelf: 'flex-start',
  },
  backLabel: {
    color: Brand.gold,
    fontWeight: '700',
    fontSize: 16,
  },
  hero: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingBottom: Spacing.four,
  },
  number: {
    color: Brand.magenta,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sprite: {
    width: 200,
    height: 200,
  },
  name: {
    color: Brand.cream,
    fontSize: 28,
    fontWeight: '800',
  },
  typesRow: {
    flexDirection: 'row',
    gap: Spacing.two,
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
    fontWeight: '800',
    textTransform: 'uppercase',
    fontSize: 13,
    letterSpacing: 1,
    marginBottom: Spacing.two,
  },
  description: {
    color: Brand.cream,
    fontSize: 15,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    gap: Spacing.five,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    color: Brand.cream,
    opacity: 0.7,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  infoValue: {
    color: Brand.cream,
    fontSize: 18,
    fontWeight: '700',
  },
  abilitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  abilityChip: {
    borderColor: Brand.magenta,
    borderWidth: 1,
    borderRadius: Spacing.four,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.half,
  },
  abilityLabel: {
    color: Brand.cream,
    fontSize: 13,
  },
  statsList: {
    gap: Spacing.two,
  },
});
