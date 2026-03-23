import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { theme } from '../theme';

const Dot = ({ delay }) => {
  const opacity = useSharedValue(0.3);
  const translateY = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      opacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.3, { duration: 400 })
        ),
        -1,
        true
      );
      translateY.value = withRepeat(
        withSequence(
          withTiming(-4, { duration: 400 }),
          withTiming(0, { duration: 400 })
        ),
        -1,
        true
      );
    }, delay);
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }]
  }));

  return <Animated.View style={[styles.dot, style]} />;
};

export const TypingIndicator = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nova Explorer is typing</Text>
      <View style={styles.dots}>
        <Dot delay={0} />
        <Dot delay={150} />
        <Dot delay={300} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 5,
  },
  text: {
    color: theme.colors.blueMain,
    fontSize: 12,
    fontFamily: 'Outfit_300Light',
    marginRight: 6,
    opacity: 0.8,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 15,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.blueMain,
    marginHorizontal: 2,
  }
});
