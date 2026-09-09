import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { LuxuryBallButton, LuxuryBallFlash, LuxuryBallHalf, LuxuryBallSize } from '@/components/luxury-ball';
import { Brand } from '@/constants/theme';

const DURATION = 1500;

const overlayKeyframe = new Keyframe({
  0: { opacity: 1 },
  85: { opacity: 1 },
  100: { opacity: 0, easing: Easing.out(Easing.quad) },
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

export function AnimatedSplashOverlay() {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return animate ? (
    <Animated.View
      entering={overlayKeyframe.duration(DURATION).withCallback((finished) => {
        'worklet';
        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      })}
      style={styles.splashOverlay}>
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
      </View>
    </Animated.View>
  ) : (
    <View
      onLayout={() => {
        SplashScreen.hideAsync().finally(() => {
          setAnimate(true);
        });
      }}
      style={styles.splashOverlay}>
      <View style={styles.ballWrap}>
        <LuxuryBallHalf half="top" />
        <LuxuryBallHalf half="bottom" />
        <LuxuryBallButton />
      </View>
    </View>
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
  ballWrap: {
    width: LuxuryBallSize,
    height: LuxuryBallSize,
  },
});
