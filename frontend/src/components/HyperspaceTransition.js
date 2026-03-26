import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  runOnJS,
  Easing,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { theme } from '../theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * HyperspaceTransition
 * A "Jump to Lightspeed" transition effect.
 */
export const HyperspaceTransition = ({ visible, onAnimationComplete }) => {
  const progress = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      progress.value = withTiming(1, { 
        duration: 800, 
        easing: Easing.bezier(0.4, 0, 0.2, 1) 
      }, (finished) => {
        if (finished && onAnimationComplete) {
          runOnJS(onAnimationComplete)();
        }
      });
    } else {
      opacity.value = withTiming(0, { duration: 500 });
      progress.value = 0;
    }
  }, [visible]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    pointerEvents: visible ? 'auto' : 'none',
  }));

  const lineCount = 40;
  const lines = Array.from({ length: lineCount }).map((_, i) => {
    const angle = (i / lineCount) * Math.PI * 2;
    const distance = 50 + Math.random() * 150;
    
    const lineStyle = useAnimatedStyle(() => {
      const scaleY = interpolate(progress.value, [0, 0.5, 1], [0.1, 5, 20]);
      const opacity = interpolate(progress.value, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
      const move = interpolate(progress.value, [0, 1], [0, 1000]);
      
      const x = Math.cos(angle) * (distance + move);
      const y = Math.sin(angle) * (distance + move);

      return {
        transform: [
          { translateX: x },
          { translateY: y },
          { rotate: `${angle}rad` },
          { scaleY }
        ],
        opacity
      };
    });

    return (
      <Animated.View 
        key={i} 
        style={[styles.line, lineStyle]} 
      />
    );
  });

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <View style={styles.center}>
        {lines}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    width: 2,
    height: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
    width: 2,
    height: 60,
    backgroundColor: theme.colors.blueMain || '#00F2FF',
    borderRadius: 1,
  }
});
