import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withDelay,
  FadeIn,
  FadeOut
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { Star, Zap, Flame, Moon, Rocket } from 'lucide-react-native';
import { theme } from '../theme';

const REACTIONS = [
  { id: 'star', icon: Star, color: '#fdd835' },
  { id: 'zap', icon: Zap, color: '#00F2FF' },
  { id: 'flame', icon: Flame, color: '#ff5252' },
  { id: 'moon', icon: Moon, color: '#9575cd' },
  { id: 'rocket', icon: Rocket, color: '#66bb6a' },
];

export const ReactionPicker = ({ onSelect, position }) => {
  return (
    <Animated.View 
      entering={FadeIn.duration(200)} 
      exiting={FadeOut.duration(200)}
      style={[styles.container, { top: position.y - 60, left: position.x - 50 }]}
    >
      <BlurView intensity={80} tint="dark" style={styles.blur}>
        {REACTIONS.map((item, index) => (
          <TouchableOpacity 
            key={item.id} 
            onPress={() => onSelect(item.id)}
            style={styles.reactionBtn}
          >
             <item.icon size={20} color={item.color} />
          </TouchableOpacity>
        ))}
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  blur: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  reactionBtn: {
    padding: 8,
    marginHorizontal: 2,
  }
});
