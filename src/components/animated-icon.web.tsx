import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import {
  LuxuryBallButton,
  LuxuryBallFlash,
  LuxuryBallGlow,
  LuxuryBallHalf,
  LuxuryBallSize,
  LuxuryBallSpark,
} from '@/components/luxury-ball';
import { Brand } from '@/constants/theme';

const DURATION = 1900;

const overlayKeyframe = new Keyframe({
  0: { opacity: 1 },
  88: { opacity: 1 },
  100: { opacity: 0, easing: Easing.out(Easing.quad) },
});

const glowKeyframe = new Keyframe({
  0: { opacity: 0, transform: [{ scale: 0.55 }] },
  35: { opacity: 0.9, transform: [{ scale: 1.05 }], easing: Easing.out(Easing.quad) },
  66: { opacity: 0.85, transform: [{ scale: 1 }] },
  100: { opacity: 0, transform: [{ scale: 1.2 }], easing: Easing.out(Easing.quad) },
});

const entranceKeyframe = new Keyframe({
  0: { transform: [{ translateY: -260 }, { scale: 0.6 }, { rotateZ: '0deg' }] },
  35: {
    transform: [{ translateY: 0 }, { scale: 1.08 }, { rotateZ: '0deg' }],
    easing: Easing.out(Easing.back(1.6)),
  },
  45: { transform: [{ translateY: 0 }, { scale: 1 }, { rotateZ: '-8deg' }] },
  52: { transform: [{ translateY: 0 }, { scale: 1 }, { rotateZ: '8deg' }] },
  59: { transform: [{ translateY: 0 }, { scale: 1 }, { rotateZ: '-6deg' }] },
  66: { transform: [{ translateY: 0 }, { scale: 1 }, { rotateZ: '0deg' }] },
  100: { transform: [{ translateY: 0 }, { scale: 1 }, { rotateZ: '0deg' }] },
});

const topHalfKeyframe = new Keyframe({
  0: { transform: [{ translateY: 0 }, { rotateZ: '0deg' }], opacity: 1 },
  66: { transform: [{ translateY: 0 }, { rotateZ: '0deg' }], opacity: 1 },
  100: {
    transform: [{ translateY: -120 }, { rotateZ: '-25deg' }],
    opacity: 0,
    easing: Easing.out(Easing.quad),
  },
});

const bottomHalfKeyframe = new Keyframe({
  0: { transform: [{ translateY: 0 }, { rotateZ: '0deg' }], opacity: 1 },
  66: { transform: [{ translateY: 0 }, { rotateZ: '0deg' }], opacity: 1 },
  100: {
    transform: [{ translateY: 120 }, { rotateZ: '25deg' }],
    opacity: 0,
    easing: Easing.out(Easing.quad),
  },
});

const buttonKeyframe = new Keyframe({
  0: { opacity: 1, transform: [{ scale: 1 }] },
  66: { opacity: 1, transform: [{ scale: 1 }] },
  72: { opacity: 1, transform: [{ scale: 1.3 }] },
  80: { opacity: 0, transform: [{ scale: 0.4 }] },
  100: { opacity: 0, transform: [{ scale: 0.4 }] },
});

const flashKeyframe = new Keyframe({
  0: { opacity: 0, transform: [{ scale: 0.2 }] },
  66: { opacity: 0, transform: [{ scale: 0.2 }] },
  74: { opacity: 0.9, transform: [{ scale: 0.6 }] },
  88: { opacity: 0, transform: [{ scale: 2.4 }], easing: Easing.out(Easing.quad) },
  100: { opacity: 0, transform: [{ scale: 2.4 }] },
});

const sparkKeyframe = new Keyframe({
  0: { opacity: 0, transform: [{ scale: 0 }, { rotateZ: '0deg' }] },
  66: { opacity: 0, transform: [{ scale: 0 }, { rotateZ: '0deg' }] },
  76: { opacity: 1, transform: [{ scale: 1 }, { rotateZ: '20deg' }], easing: Easing.out(Easing.quad) },
  92: { opacity: 0, transform: [{ scale: 0.4 }, { rotateZ: '40deg' }], easing: Easing.out(Easing.quad) },
  100: { opacity: 0, transform: [{ scale: 0.4 }, { rotateZ: '40deg' }] },
});

const wordmarkKeyframe = new Keyframe({
  0: { opacity: 0, transform: [{ translateY: 14 }] },
  48: { opacity: 0, transform: [{ translateY: 14 }] },
  62: { opacity: 1, transform: [{ translateY: 0 }], easing: Easing.out(Easing.quad) },
  88: { opacity: 1, transform: [{ translateY: 0 }] },
  100: { opacity: 0, transform: [{ translateY: -6 }], easing: Easing.out(Easing.quad) },
});

const SPARK_POSITIONS = [
  { top: 4, left: -6, size: 18 },
  { top: 10, right: -10, size: 14 },
  { bottom: 8, left: -12, size: 12 },
  { bottom: 0, right: 0, size: 16 },
];

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Animated.View
      entering={overlayKeyframe.duration(DURATION).withCallback((finished) => {
        'worklet';
        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      })}
      style={styles.splashOverlay}>
      <Animated.View entering={glowKeyframe.duration(DURATION)} style={styles.glowWrap}>
        <LuxuryBallGlow />
      </Animated.View>

      <View style={styles.ballWrap}>
        <Animated.View entering={entranceKeyframe.duration(DURATION)} style={StyleSheet.absoluteFill}>
          <Animated.View entering={topHalfKeyframe.duration(DURATION)} style={StyleSheet.absoluteFill}>
            <LuxuryBallHalf half="top" />
          </Animated.View>
          <Animated.View entering={bottomHalfKeyframe.duration(DURATION)} style={StyleSheet.absoluteFill}>
            <LuxuryBallHalf half="bottom" />
          </Animated.View>
          <Animated.View entering={buttonKeyframe.duration(DURATION)} style={StyleSheet.absoluteFill}>
            <LuxuryBallButton />
          </Animated.View>
        </Animated.View>
        <Animated.View entering={flashKeyframe.duration(DURATION)} style={StyleSheet.absoluteFill}>
          <LuxuryBallFlash />
        </Animated.View>
        {SPARK_POSITIONS.map((position, index) => (
          <Animated.View
            key={index}
            entering={sparkKeyframe.duration(DURATION)}
            style={[styles.spark, position]}>
            <LuxuryBallSpark size={position.size} />
          </Animated.View>
        ))}
      </View>

      <Animated.View entering={wordmarkKeyframe.duration(DURATION)} style={styles.wordmark}>
        <Text style={styles.title}>Pokédexia</Text>
        <Text style={styles.subtitle}>Edición Luxury</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  splashOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Brand.black,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  glowWrap: {
    position: 'absolute',
    width: LuxuryBallSize * 2.4,
    height: LuxuryBallSize * 2.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ballWrap: {
    width: LuxuryBallSize,
    height: LuxuryBallSize,
  },
  spark: {
    position: 'absolute',
  },
  wordmark: {
    position: 'absolute',
    top: '58%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: Brand.gold,
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '600',
    color: Brand.magenta,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
});
