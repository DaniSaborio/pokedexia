import { StyleSheet } from 'react-native';
import Svg, { Circle, ClipPath, Defs, G, Rect } from 'react-native-svg';

import { Brand } from '@/constants/theme';

export const LuxuryBallSize = 150;

const VIEW_BOX = 200;
const CENTER = VIEW_BOX / 2;
const RADIUS = 90;

type LuxuryBallHalfProps = {
  half: 'top' | 'bottom';
};

/** One hemisphere of the Luxury Ball, clipped along the equator so it can split apart on its own. */
export function LuxuryBallHalf({ half }: LuxuryBallHalfProps) {
  const clipId = `luxury-ball-clip-${half}`;
  const clipY = half === 'top' ? 0 : CENTER;
  const bandY = half === 'top' ? CENTER - 12 : CENTER;
  const ringY = half === 'top' ? CENTER - 4 : CENTER;

  return (
    <Svg
      width={LuxuryBallSize}
      height={LuxuryBallSize}
      viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}
      style={StyleSheet.absoluteFill}>
      <Defs>
        <ClipPath id={clipId}>
          <Rect x={0} y={clipY} width={VIEW_BOX} height={CENTER} />
        </ClipPath>
      </Defs>
      <G clipPath={`url(#${clipId})`}>
        <Circle cx={CENTER} cy={CENTER} r={RADIUS} fill={Brand.black} stroke={Brand.gold} strokeWidth={5} />
        <Rect x={5} y={bandY} width={VIEW_BOX - 10} height={12} fill={Brand.magenta} />
        <Rect x={5} y={ringY} width={VIEW_BOX - 10} height={4} fill={Brand.gold} />
      </G>
    </Svg>
  );
}

export function LuxuryBallButton() {
  return (
    <Svg
      width={LuxuryBallSize}
      height={LuxuryBallSize}
      viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}
      style={StyleSheet.absoluteFill}>
      <Circle cx={CENTER} cy={CENTER} r={22} fill={Brand.gold} stroke={Brand.black} strokeWidth={3} />
      <Circle cx={CENTER} cy={CENTER} r={11} fill={Brand.cream} />
    </Svg>
  );
}

export function LuxuryBallFlash() {
  return (
    <Svg
      width={LuxuryBallSize}
      height={LuxuryBallSize}
      viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}
      style={StyleSheet.absoluteFill}>
      <Circle cx={CENTER} cy={CENTER} r={RADIUS + 6} fill={Brand.goldLight} />
    </Svg>
  );
}
