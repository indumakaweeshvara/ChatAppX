import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  withDelay,
  Easing,
  FadeIn
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Check, CheckCheck, PlayCircle, MapPin, Star, Zap, Flame, Moon, Rocket } from 'lucide-react-native';
import { theme } from '../theme';

const REACTION_ICONS = {
  star: Star,
  zap: Zap,
  flame: Flame,
  moon: Moon,
  rocket: Rocket,
};

const BubbleContainer = styled(Animated.View)`
  padding: 12px 16px;
  border-radius: 20px;
  margin-vertical: 8px;
  max-width: 80%;
  border-width: 1px;
  border-color: ${theme.colors.glassBorder};
`;

const PurpleBubble = styled(BubbleContainer)`
  background-color: rgba(75, 0, 130, 0.3);
  align-self: flex-start;
  border-bottom-left-radius: 5px;
`;

const BlueBubble = styled(BubbleContainer)`
  background-color: rgba(0, 242, 255, 0.2);
  align-self: flex-end;
  border-bottom-right-radius: 5px;
  border-color: rgba(0, 242, 255, 0.3);
`;

const BubbleText = styled.Text`
  color: ${theme.colors.textMain};
  font-size: 14px;
  line-height: 20px;
  font-family: 'Outfit_400Regular';
`;

const MetaContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 4px;
`;

const Timestamp = styled.Text`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  margin-right: 4px;
  font-family: 'Outfit_300Light';
`;

const MediaWrapper = styled.View`
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 8px;
  position: relative;
`;

const MediaImage = styled.Image`
  width: 200px;
  height: 120px;
  border-radius: 12px;
`;

const MediaOverlay = styled.View`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.3);
`;

const MapOverlay = styled.View`
  position: absolute;
  bottom: 8px;
  left: 8px;
  flex-direction: row;
  align-items: center;
  background-color: rgba(0,0,0,0.6);
  padding: 4px 8px;
  border-radius: 10px;
`;

const ReactionBadge = styled(Animated.View)`
  position: absolute;
  bottom: -15px;
  right: -5px;
  background-color: rgba(0,0,0,0.8);
  border-radius: 12px;
  flex-direction: row;
  padding: 2px 6px;
  border-width: 1px;
  border-color: rgba(255,255,255,0.2);
`;

export const ChatBubble = ({ text, type, index, totalMessages = 10, status, timestamp, media, reactions = [], onLongPress }) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    // Decaying text logic based on distance from newest msg
    const age = Math.max(0, totalMessages - index - 1);
    const targetOpacity = Math.max(0.15, 1 - (age * 0.15));

    opacity.value = withDelay(index * 150, withTiming(targetOpacity, { duration: 600 }));
    scale.value = withDelay(index * 150, withTiming(1, { 
      duration: 600,
      easing: Easing.out(Easing.back(1.5))
    }));

    const driftY = Math.random() * 6 - 3;
    const driftX = Math.random() * 4 - 2;
    const duration = 6000 + Math.random() * 3000;

    translateY.value = withRepeat(
      withSequence(
        withTiming(driftY, { duration: duration / 2, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: duration / 2, easing: Easing.inOut(Easing.sin) })
      ),
      -1, true
    );

    translateX.value = withRepeat(
      withSequence(
        withTiming(driftX, { duration: duration / 1.5, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: duration / 1.5, easing: Easing.inOut(Easing.sin) })
      ),
      -1, true
    );
  }, [totalMessages]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  const Bubble = type === 'sender' ? BlueBubble : PurpleBubble;

  return (
    <Bubble 
      as={TouchableOpacity}
      activeOpacity={0.9}
      onLongPress={() => onLongPress && onLongPress()}
      style={animatedStyle}
    >
      {media && media.type === 'video' && (
        <MediaWrapper>
          <MediaImage source={{ uri: media.url || 'https://via.placeholder.com/300x200/2a1a4a/ffffff?text=Room+Tour' }} />
          <MediaOverlay>
            <PlayCircle size={36} color="#FFF" />
          </MediaOverlay>
        </MediaWrapper>
      )}
      {media && media.type === 'map' && (
        <MediaWrapper>
          <MediaImage source={{ uri: media.url || 'https://via.placeholder.com/300x200/0f3460/e94560?text=Nebula+Map' }} />
          <MapOverlay>
            <MapPin size={12} color="#00F2FF" />
            <Timestamp style={{ marginLeft: 4, marginRight: 0, color: '#fff' }}>{media.title}</Timestamp>
          </MapOverlay>
        </MediaWrapper>
      )}

      {text ? <BubbleText>{text}</BubbleText> : null}
      
      <MetaContainer>
        <Timestamp>{timestamp || '9:41 AM'}</Timestamp>
        {type === 'sender' && status === 'sent' && <Check size={12} color="rgba(255,255,255,0.4)" />}
        {type === 'sender' && status === 'read' && <CheckCheck size={14} color="#00F2FF" />}
      </MetaContainer>

      {reactions.length > 0 && (
        <ReactionBadge entering={FadeIn.springify()}>
          {reactions.map((r, i) => {
             const Icon = REACTION_ICONS[r] || Star;
             return <Icon key={i} size={10} color="#fff" style={{ marginHorizontal: 1 }} />;
          })}
        </ReactionBadge>
      )}
    </Bubble>
  );
};
