import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';

import {
  AllPokemonTypes,
  PokemonTypeColors,
  PokemonTypeLabels,
  getComboDefenseMultipliers,
  type PokemonType,
} from '@/constants/pokemon-types';
import { Brand, Spacing } from '@/constants/theme';

const SIZE = 320;
const CENTER = SIZE / 2;
const OUTER_RADIUS = 128;
const NODE_RADIUS = 15;
const CENTER_RADIUS = 26;

type Bucket = 'weak' | 'resist' | 'neutral' | 'immune';

function bucketFor(multiplier: number): Bucket {
  if (multiplier === 0) return 'immune';
  if (multiplier > 1) return 'weak';
  if (multiplier < 1) return 'resist';
  return 'neutral';
}

const BucketColor: Record<Bucket, string> = {
  weak: '#E4482E',
  resist: '#4CAF6D',
  neutral: '#F4EEDD',
  immune: '#F0952E',
};

const BucketLabel: Record<Bucket, string> = {
  weak: 'Débil',
  resist: 'Resiste',
  neutral: 'Neutral',
  immune: 'Inmune',
};

type Props = {
  types: PokemonType[];
};

export function TypeMatchupGraph({ types }: Props) {
  const [activeType, setActiveType] = useState<PokemonType | null>(null);
  const multipliers = useMemo(() => getComboDefenseMultipliers(types), [types]);

  const nodes = useMemo(() => {
    const outerTypes = AllPokemonTypes.filter((type) => !types.includes(type));
    return outerTypes.map((type, index) => {
      const angle = (index / outerTypes.length) * Math.PI * 2 - Math.PI / 2;
      const x = CENTER + OUTER_RADIUS * Math.cos(angle);
      const y = CENTER + OUTER_RADIUS * Math.sin(angle);
      const multiplier = multipliers[type];
      const bucket = bucketFor(multiplier);
      return { type, x, y, multiplier, bucket };
    });
  }, [multipliers, types]);

  const active = activeType ? nodes.find((node) => node.type === activeType) : undefined;

  return (
    <View style={styles.wrapper}>
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {nodes.map((node) => {
          const extreme = node.multiplier >= 4 || (node.multiplier > 0 && node.multiplier <= 0.25);
          return (
            <Line
              key={`line-${node.type}`}
              x1={CENTER}
              y1={CENTER}
              x2={node.x}
              y2={node.y}
              stroke={BucketColor[node.bucket]}
              strokeWidth={node.bucket === 'neutral' ? 1 : extreme ? 3.5 : 2}
              strokeDasharray={node.bucket === 'immune' ? '5,4' : undefined}
              strokeLinecap="round"
              opacity={activeType && activeType !== node.type ? 0.2 : 0.95}
            />
          );
        })}

        {nodes.map((node) => (
          <Circle
            key={`node-${node.type}`}
            cx={node.x}
            cy={node.y}
            r={NODE_RADIUS}
            fill={PokemonTypeColors[node.type]}
            stroke={activeType === node.type ? Brand.gold : BucketColor[node.bucket]}
            strokeWidth={activeType === node.type ? 3 : 2}
            onPress={() => setActiveType(node.type === activeType ? null : node.type)}
          />
        ))}
        {nodes.map((node) => (
          <SvgText
            key={`label-${node.type}`}
            x={node.x}
            y={node.y + 4}
            fontSize={9}
            fontWeight="bold"
            fill="#FFFFFF"
            textAnchor="middle"
            onPress={() => setActiveType(node.type === activeType ? null : node.type)}>
            {node.type.slice(0, 3).toUpperCase()}
          </SvgText>
        ))}

        {types[1] ? (
          <>
            <Circle
              cx={CENTER - CENTER_RADIUS * 0.5}
              cy={CENTER}
              r={CENTER_RADIUS}
              fill={PokemonTypeColors[types[0]]}
              stroke={Brand.gold}
              strokeWidth={2}
            />
            <Circle
              cx={CENTER + CENTER_RADIUS * 0.5}
              cy={CENTER}
              r={CENTER_RADIUS}
              fill={PokemonTypeColors[types[1]]}
              stroke={Brand.gold}
              strokeWidth={2}
              opacity={0.9}
            />
          </>
        ) : (
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={CENTER_RADIUS}
            fill={PokemonTypeColors[types[0]]}
            stroke={Brand.gold}
            strokeWidth={2}
          />
        )}
      </Svg>

      <View style={styles.legendRow}>
        {(['weak', 'resist', 'neutral', 'immune'] as Bucket[]).map((bucket) => (
          <View key={bucket} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: BucketColor[bucket] }]} />
            <Text style={styles.legendText}>{BucketLabel[bucket]}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          {active
            ? `${PokemonTypeLabels[active.type]}: x${active.multiplier} — ${BucketLabel[active.bucket]}`
            : 'Toca un tipo del grafo para ver el detalle'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: Brand.cream,
    fontSize: 12,
  },
  infoBox: {
    marginTop: Spacing.two,
    minHeight: 20,
  },
  infoText: {
    color: Brand.goldLight,
    fontSize: 13,
    fontWeight: '700',
  },
});
