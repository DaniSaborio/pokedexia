import Svg, { Rect } from 'react-native-svg';

import { Brand } from '@/constants/theme';

const GRID = 16;
const CENTER_PX = (GRID - 1) / 2;
const RADIUS = 7.4;
const OUTLINE_BAND = 1.15;
const BAND_HALF_HEIGHT = 1;
const BUTTON_OUTER = 2.6;
const BUTTON_INNER = 1.3;

type Region = 'outline' | 'top' | 'bottom' | 'band' | 'buttonRing' | 'buttonCore';

/** Builds a blocky, sprite-like circle mask once and reuses it for every ball variant. */
function buildMask(): (Region | null)[][] {
  const cells: (Region | null)[][] = [];
  for (let j = 0; j < GRID; j++) {
    const row: (Region | null)[] = [];
    for (let i = 0; i < GRID; i++) {
      const dx = i - CENTER_PX;
      const dy = j - CENTER_PX;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > RADIUS) {
        row.push(null);
      } else if (dist > RADIUS - OUTLINE_BAND) {
        row.push('outline');
      } else if (dist <= BUTTON_INNER) {
        row.push('buttonCore');
      } else if (dist <= BUTTON_OUTER) {
        row.push('buttonRing');
      } else if (Math.abs(dy) <= BAND_HALF_HEIGHT) {
        row.push('band');
      } else {
        row.push(dy < 0 ? 'top' : 'bottom');
      }
    }
    cells.push(row);
  }
  return cells;
}

const MASK = buildMask();

export type PixelPokeballVariant = 'super' | 'ultra' | 'luxury';

const PALETTES: Record<PixelPokeballVariant, Record<Region, string>> = {
  super: {
    outline: '#1B2733',
    top: '#3E7FC1',
    band: '#D6453F',
    bottom: '#F3F1E7',
    buttonRing: '#D6453F',
    buttonCore: '#FDFBF3',
  },
  ultra: {
    outline: '#000000',
    top: '#2A2A2E',
    band: '#F2B705',
    bottom: '#F3F1E7',
    buttonRing: '#F2B705',
    buttonCore: '#2A2A2E',
  },
  luxury: {
    outline: '#000000',
    top: Brand.black,
    band: Brand.magenta,
    bottom: Brand.charcoal,
    buttonRing: Brand.gold,
    buttonCore: Brand.cream,
  },
};

type PixelPokeballProps = {
  variant: PixelPokeballVariant;
  size?: number;
};

/** A flat-color, pixel-art-style Poké Ball sprite, procedurally drawn on a 16x16 grid. */
export function PixelPokeball({ variant, size = 32 }: PixelPokeballProps) {
  const palette = PALETTES[variant];
  const cell = size / GRID;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {MASK.map((row, j) =>
        row.map((region, i) =>
          region ? (
            <Rect
              key={`${i}-${j}`}
              x={i * cell}
              y={j * cell}
              width={cell + 0.5}
              height={cell + 0.5}
              fill={palette[region]}
            />
          ) : null
        )
      )}
    </Svg>
  );
}
