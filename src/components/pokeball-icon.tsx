import { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { LuxuryBallButton, LuxuryBallFlash, LuxuryBallHalf, LuxuryBallSpark } from '@/components/luxury-ball';

export type PokeballIconHandle = {
  /** Plays a quick open-and-close pop, like clicking a Poké Ball. */
  pop: () => void;
};

type PokeballIconProps = {
  size?: number;
};

const OPEN_DURATION = 230;
const CLOSE_DURATION = 220;

export const PokeballIcon = forwardRef<PokeballIconHandle, PokeballIconProps>(
  function PokeballIcon({ size = 26 }, ref) {
    const progress = useSharedValue(0);

    useImperativeHandle(ref, () => ({
      pop: () => {
        progress.value = withSequence(
          withTiming(1, { duration: OPEN_DURATION, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: CLOSE_DURATION, easing: Easing.inOut(Easing.quad) })
        );
      },
    }));

    const topStyle = useAnimatedStyle(() => ({
      transform: [
        { translateY: -progress.value * size * 0.24 },
        { rotateZ: `${-progress.value * 16}deg` },
      ],
    }));
    const bottomStyle = useAnimatedStyle(() => ({
      transform: [
        { translateY: progress.value * size * 0.24 },
        { rotateZ: `${progress.value * 16}deg` },
      ],
    }));
    const buttonStyle = useAnimatedStyle(() => ({
      opacity: 1 - progress.value,
      transform: [{ scale: 1 - progress.value * 0.5 }],
    }));
    const flashStyle = useAnimatedStyle(() => {
      const rampUp = Math.min(Math.max((progress.value - 0.35) / 0.3, 0), 1);
      const rampDown = Math.min(Math.max((1 - progress.value) / 0.6, 0), 1);
      return {
        opacity: rampUp * rampDown,
        transform: [{ scale: 0.5 + progress.value * 0.8 }],
      };
    });
    const sparkStyle = useAnimatedStyle(() => {
      const rampUp = Math.min(Math.max((progress.value - 0.45) / 0.25, 0), 1);
      const rampDown = Math.min(Math.max((1 - progress.value) / 0.5, 0), 1);
      return {
        opacity: rampUp * rampDown,
        transform: [{ scale: rampUp }],
      };
    });

    return (
      <View style={{ width: size, height: size }}>
        <Animated.View style={[StyleSheet.absoluteFill, topStyle]}>
          <LuxuryBallHalf half="top" size={size} />
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, bottomStyle]}>
          <LuxuryBallHalf half="bottom" size={size} />
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, buttonStyle]}>
          <LuxuryBallButton size={size} />
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, flashStyle]} pointerEvents="none">
          <LuxuryBallFlash size={size} />
        </Animated.View>
        <Animated.View
          style={[styles.spark, styles.sparkTopLeft, sparkStyle]}
          pointerEvents="none">
          <LuxuryBallSpark size={size * 0.35} />
        </Animated.View>
        <Animated.View
          style={[styles.spark, styles.sparkBottomRight, sparkStyle]}
          pointerEvents="none">
          <LuxuryBallSpark size={size * 0.3} />
        </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  spark: {
    position: 'absolute',
  },
  sparkTopLeft: {
    top: '-15%',
    left: '-15%',
  },
  sparkBottomRight: {
    bottom: '-10%',
    right: '-15%',
  },
});
