import { useRouter, usePathname } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PixelPokeball } from '@/components/pixel-pokeball';
import { Brand, Spacing } from '@/constants/theme';
import { navVisibility } from '@/hooks/nav-visibility';

const BUTTON_SIZE = 48;
const SAT_SIZE = 40;
const SAT_OFFSET_X = 80;
const SAT_OFFSET_Y = 36;
const HIT_RADIUS = 34;
const HIT_SLOP = 22;

const CENTER_X = BUTTON_SIZE / 2;
const CENTER_Y = BUTTON_SIZE / 2;
const LEFT_X = CENTER_X - SAT_OFFSET_X;
const RIGHT_X = CENTER_X + SAT_OFFSET_X;
const SAT_Y = CENTER_Y - SAT_OFFSET_Y;

type Destination = { href: '/' | '/explore'; label: string };

const DESTINATIONS: [Destination, Destination] = [
  { href: '/', label: 'Pokédex' },
  { href: '/explore', label: 'Tipos' },
];

function resolveTarget(x: number, y: number) {
  'worklet';
  const distLeft = Math.hypot(x - LEFT_X, y - SAT_Y);
  const distRight = Math.hypot(x - RIGHT_X, y - SAT_Y);
  if (distLeft <= HIT_RADIUS && distLeft <= distRight) return 0;
  if (distRight <= HIT_RADIUS) return 1;
  return -1;
}

export default function RadialNav() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const activeLabel = useMemo(() => (pathname === '/explore' ? 'Tipos' : 'Pokédex'), [pathname]);

  const reveal = useSharedValue(0);
  const hover = useSharedValue(-1);

  const navigate = useCallback(
    (index: number) => {
      router.push(DESTINATIONS[index].href);
    },
    [router]
  );

  const pan = Gesture.Pan()
    .minDistance(0)
    .hitSlop(HIT_SLOP)
    .onBegin(() => {
      reveal.value = withTiming(1, { duration: 170, easing: Easing.out(Easing.quad) });
      hover.value = -1;
    })
    .onUpdate((event) => {
      hover.value = resolveTarget(event.x, event.y);
    })
    .onEnd((event) => {
      const target = resolveTarget(event.x, event.y);
      if (target !== -1) {
        runOnJS(navigate)(target);
      }
    })
    .onFinalize(() => {
      reveal.value = withTiming(0, { duration: 190, easing: Easing.out(Easing.quad) });
      hover.value = -1;
    });

  const visibilityStyle = useAnimatedStyle(() => ({
    opacity: navVisibility.value,
    transform: [{ translateY: (1 - navVisibility.value) * (BUTTON_SIZE + Spacing.four) }],
  }));

  const centerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - reveal.value * 0.1 }],
  }));

  const leftStyle = useAnimatedStyle(() => {
    const highlight = hover.value === 0 ? 1.18 : 1;
    return {
      opacity: reveal.value,
      transform: [
        { translateY: (1 - reveal.value) * 18 },
        { scale: (0.5 + reveal.value * 0.5) * highlight },
      ],
    };
  });

  const rightStyle = useAnimatedStyle(() => {
    const highlight = hover.value === 1 ? 1.18 : 1;
    return {
      opacity: reveal.value,
      transform: [
        { translateY: (1 - reveal.value) * 18 },
        { scale: (0.5 + reveal.value * 0.5) * highlight },
      ],
    };
  });

  return (
    <Animated.View
      style={[styles.wrapper, { bottom: insets.bottom + Spacing.two }, visibilityStyle]}
      pointerEvents="box-none">
      <View style={styles.stage}>
        <Animated.View
          style={[
            styles.satellite,
            { left: LEFT_X - SAT_SIZE / 2, top: SAT_Y - SAT_SIZE / 2 },
            leftStyle,
          ]}
          pointerEvents="none">
          <PixelPokeball variant="super" size={SAT_SIZE} />
        </Animated.View>
        <Animated.View
          style={[
            styles.satellite,
            { left: RIGHT_X - SAT_SIZE / 2, top: SAT_Y - SAT_SIZE / 2 },
            rightStyle,
          ]}
          pointerEvents="none">
          <PixelPokeball variant="ultra" size={SAT_SIZE} />
        </Animated.View>

        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.centerButton, centerStyle]}>
            <PixelPokeball variant="luxury" size={BUTTON_SIZE} />
          </Animated.View>
        </GestureDetector>
      </View>

      <Text style={styles.label}>{activeLabel}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 900,
  },
  stage: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
  },
  centerButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
  },
  satellite: {
    position: 'absolute',
    width: SAT_SIZE,
    height: SAT_SIZE,
  },
  label: {
    marginTop: Spacing.one,
    color: Brand.gold,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});
