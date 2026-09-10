import { useId } from 'react';
import { StyleSheet } from 'react-native';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import { Brand } from '@/constants/theme';

export const LuxuryBallSize = 150;

const VIEW_BOX = 200;
const CENTER = VIEW_BOX / 2;
const RADIUS = 90;

type LuxuryBallHalfProps = {
  half: 'top' | 'bottom';
  size?: number;
};

/** One hemisphere of the Luxury Ball, clipped along the equator so it can split apart on its own. */
export function LuxuryBallHalf({ half, size = LuxuryBallSize }: LuxuryBallHalfProps) {
  const uid = useId();
  const clipId = `luxury-ball-clip-${half}-${uid}`;
  const bodyId = `luxury-ball-body-${half}-${uid}`;
  const bandId = `luxury-ball-band-${half}-${uid}`;
  const ringId = `luxury-ball-ring-${half}-${uid}`;
  const clipY = half === 'top' ? 0 : CENTER;
  const bandY = half === 'top' ? CENTER - 12 : CENTER;
  const ringY = half === 'top' ? CENTER - 4 : CENTER;

  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}
      style={StyleSheet.absoluteFill}>
      <Defs>
        <ClipPath id={clipId}>
          <Rect x={0} y={clipY} width={VIEW_BOX} height={CENTER} />
        </ClipPath>
        <RadialGradient id={bodyId} cx="32%" cy="30%" r="75%">
          <Stop offset="0%" stopColor={Brand.charcoal} />
          <Stop offset="55%" stopColor={Brand.black} />
          <Stop offset="100%" stopColor="#000000" />
        </RadialGradient>
        <LinearGradient id={bandId} x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={Brand.magenta} />
          <Stop offset="100%" stopColor={Brand.magentaDark} />
        </LinearGradient>
        <LinearGradient id={ringId} x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor={Brand.goldLight} />
          <Stop offset="50%" stopColor={Brand.gold} />
          <Stop offset="100%" stopColor={Brand.goldLight} />
        </LinearGradient>
      </Defs>
      <G clipPath={`url(#${clipId})`}>
        <Circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill={`url(#${bodyId})`}
          stroke={`url(#${ringId})`}
          strokeWidth={5}
        />
        <Rect x={5} y={bandY} width={VIEW_BOX - 10} height={12} fill={`url(#${bandId})`} />
        <Rect x={5} y={ringY} width={VIEW_BOX - 10} height={4} fill={`url(#${ringId})`} />
      </G>
    </Svg>
  );
}

type LuxuryBallButtonProps = {
  size?: number;
};

export function LuxuryBallButton({ size = LuxuryBallSize }: LuxuryBallButtonProps) {
  const uid = useId();
  const ringId = `luxury-ball-button-ring-${uid}`;
  const coreId = `luxury-ball-button-core-${uid}`;

  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}
      style={StyleSheet.absoluteFill}>
      <Defs>
        <RadialGradient id={ringId} cx="35%" cy="30%" r="75%">
          <Stop offset="0%" stopColor={Brand.goldLight} />
          <Stop offset="100%" stopColor={Brand.gold} />
        </RadialGradient>
        <RadialGradient id={coreId} cx="35%" cy="30%" r="75%">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="100%" stopColor={Brand.cream} />
        </RadialGradient>
      </Defs>
      <Circle cx={CENTER} cy={CENTER} r={22} fill={`url(#${ringId})`} stroke={Brand.black} strokeWidth={3} />
      <Circle cx={CENTER} cy={CENTER} r={11} fill={`url(#${coreId})`} />
    </Svg>
  );
}

type LuxuryBallFlashProps = {
  size?: number;
};

/** Radial burst used the instant the ball pops open. */
export function LuxuryBallFlash({ size = LuxuryBallSize }: LuxuryBallFlashProps) {
  const uid = useId();
  const flashId = `luxury-ball-flash-${uid}`;

  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}
      style={StyleSheet.absoluteFill}>
      <Defs>
        <RadialGradient id={flashId} cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={Brand.goldLight} stopOpacity={1} />
          <Stop offset="55%" stopColor={Brand.gold} stopOpacity={0.55} />
          <Stop offset="100%" stopColor={Brand.gold} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Circle cx={CENTER} cy={CENTER} r={RADIUS + 20} fill={`url(#${flashId})`} />
    </Svg>
  );
}

type LuxuryBallGlowProps = {
  size?: number;
};

/** Soft ambient glow that sits behind the ball, larger and dimmer than the flash. */
export function LuxuryBallGlow({ size = LuxuryBallSize * 2.4 }: LuxuryBallGlowProps) {
  const uid = useId();
  const glowId = `luxury-ball-glow-${uid}`;

  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}
      style={StyleSheet.absoluteFill}>
      <Defs>
        <RadialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={Brand.gold} stopOpacity={0.32} />
          <Stop offset="60%" stopColor={Brand.magenta} stopOpacity={0.1} />
          <Stop offset="100%" stopColor={Brand.gold} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Circle cx={CENTER} cy={CENTER} r={CENTER} fill={`url(#${glowId})`} />
    </Svg>
  );
}

type LuxuryBallSparkProps = {
  size?: number;
};

/** A small four-point sparkle used as a shine accent around the ball. */
export function LuxuryBallSpark({ size = 20 }: LuxuryBallSparkProps) {
  const r = size / 2;
  const inner = r * 0.3;
  const path = [
    `M ${r} 0`,
    `L ${r + inner} ${r - inner}`,
    `L ${size} ${r}`,
    `L ${r + inner} ${r + inner}`,
    `L ${r} ${size}`,
    `L ${r - inner} ${r + inner}`,
    `L 0 ${r}`,
    `L ${r - inner} ${r - inner}`,
    'Z',
  ].join(' ');

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Path d={path} fill={Brand.goldLight} />
    </Svg>
  );
}
