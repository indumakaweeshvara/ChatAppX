import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, withDelay, Easing, runOnJS } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const ShootingStar = ({ id, onFinished }) => {
  const startX = Math.random() * width;
  const startY = Math.random() * height * 0.4;
  const length = 100 + Math.random() * 200;
  
  const progress = useSharedValue(0);
  const opacity = useSharedValue(0);

  const angle = 45; // Degrees

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 200 }),
      withDelay(400, withTiming(0, { duration: 400 }))
    );
    
    progress.value = withTiming(1, {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }, () => {
      runOnJS(onFinished)(id);
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translationX = progress.value * length;
    const translationY = progress.value * length;
    
    return {
      opacity: opacity.value,
      transform: [
        { translateX: startX + translationX },
        { translateY: startY + translationY },
        { rotate: '45deg' }
      ],
    };
  });

  return (
    <Animated.View style={[styles.star, animatedStyle]} />
  );
};

export const CelestialEvents = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance for a shooting star every 3s
        const id = Date.now();
        setStars(prev => [...prev, id]);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const removeStar = (id) => {
    setStars(prev => prev.filter(s => s !== id));
  };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {stars.map(id => (
        <ShootingStar key={id} id={id} onFinished={removeStar} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  star: {
    position: 'absolute',
    width: 100,
    height: 1,
    backgroundColor: 'white',
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  }
});
