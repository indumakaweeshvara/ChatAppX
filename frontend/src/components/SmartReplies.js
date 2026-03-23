import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { theme } from '../theme';

const replies = [
  'Check Availability',
  'Request Room Service',
  'See Local Guides'
];

export const SmartReplies = ({ onSelect }) => {
  const translateY = useSharedValue(20);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(500, withTiming(1, { duration: 500 }));
    translateY.value = withDelay(500, withTiming(0, { 
      duration: 500, 
      easing: Easing.out(Easing.cubic) 
    }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }]
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {replies.map((reply, i) => (
          <TouchableOpacity key={i} onPress={() => onSelect(reply)} style={styles.btnWrapper}>
            <BlurView intensity={20} tint="dark" style={styles.glassBtn}>
              <View style={styles.glow} />
              <Text style={styles.text}>{reply}</Text>
            </BlurView>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  scroll: {
    paddingRight: 20,
  },
  btnWrapper: {
    marginRight: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  glassBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(138, 43, 226, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.5)',
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: '#8A2BE2',
    opacity: 0.2,
  },
  text: {
    color: '#E0B0FF',
    fontSize: 13,
    fontFamily: 'Outfit_400Regular',
  }
});
