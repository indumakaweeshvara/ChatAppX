import React, { useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
  interpolate
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { theme } from '../theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.bgDark || '#050510'};
`;

const BackgroundImage = styled(Animated.ImageBackground)`
  flex: 1;
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT}px;
`;

const DarkOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const BackgroundImages = {
  earth: require('../../assets/cosmic_bg.png'),
  mars: require('../../assets/planets/mars.png'),
  europa: require('../../assets/planets/europa.png'),
  saturn: require('../../assets/planets/saturn.png'),
};

const Star = ({ size, top, left, delay, duration }) => {
  const opacity = useSharedValue(0.1);
  const scale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withDelay(delay, withRepeat(withTiming(0.8, { duration }), -1, true));
    scale.value = withDelay(delay, withRepeat(withTiming(1.5, { duration: duration * 1.5 }), -1, true));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.star,
        { top, left, width: size, height: size, borderRadius: size / 2 },
        animatedStyle,
      ]}
    />
  );
};

export const CosmicBackground = ({ children, planet = 'earth' }) => {
  const source = BackgroundImages[planet] || BackgroundImages.earth;
  const parallax = useSharedValue(0);

  useEffect(() => {
    parallax.value = withRepeat(
      withTiming(1, { duration: 20000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, []);

  const bgStyle = useAnimatedStyle(() => {
    const translateX = interpolate(parallax.value, [0, 1], [-10, 10]);
    const scale = interpolate(parallax.value, [0, 1], [1.05, 1.1]);
    return {
      transform: [{ translateX }, { scale }],
    };
  });

  const stars = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    top: Math.random() * SCREEN_HEIGHT,
    left: Math.random() * SCREEN_WIDTH,
    delay: Math.random() * 5000,
    duration: 2000 + Math.random() * 3000,
  }));

  return (
    <Container>
      <BackgroundImage
        source={source}
        resizeMode="cover"
        style={bgStyle}
      >
        <DarkOverlay />
        {stars.map((star) => (
          <Star key={star.id} {...star} />
        ))}
        {children}
      </BackgroundImage>
    </Container>
  );
};

const styles = StyleSheet.create({
  star: {
    position: 'absolute',
    backgroundColor: '#fff',
    shadowColor: '#fff',
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
});
