import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';
import { PhoneOff } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  Easing 
} from 'react-native-reanimated';
import { theme } from '../theme';

const Container = styled(Animated.createAnimatedComponent(BlurView))`
  position: absolute;
  top: 100px;
  right: 20px;
  width: 110px;
  height: 160px;
  border-radius: 15px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.15);
  overflow: hidden;
  z-index: 10;
`;

const VideoOverlay = styled.View`
  flex: 1;
  background-color: rgba(20, 20, 25, 0.6);
  align-items: center;
  justify-content: center;
`;

const PulseCircle = styled(Animated.View)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-width: 2px;
  border-color: ${theme.colors.blueMain};
  position: absolute;
`;

const CallTime = styled.Text`
  position: absolute;
  bottom: 40px;
  color: ${theme.colors.textDim};
  font-size: 10px;
`;

const EndButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  background-color: ${theme.colors.danger};
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  align-items: center;
  justify-content: center;
  transform: rotate(135deg);
`;

export const VideoCallWindow = () => {
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.6);
  const floatY = useSharedValue(0);

  React.useEffect(() => {
    pulseScale.value = withRepeat(withTiming(2.5, { duration: 2000 }), -1, false);
    pulseOpacity.value = withRepeat(withTiming(0, { duration: 2000 }), -1, false);
    
    floatY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  return (
    <Container intensity={20} tint="dark" style={floatStyle}>
      <VideoOverlay>
        <PulseCircle style={pulseStyle} />
        <CallTime>04:12</CallTime>
        <EndButton>
          <PhoneOff size={12} color="white" />
        </EndButton>
      </VideoOverlay>
    </Container>
  );
};
