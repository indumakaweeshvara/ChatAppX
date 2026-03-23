import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';
import { Plus, Send, Sparkles, Smile, Mic, Camera } from 'lucide-react-native';
import { theme } from '../theme';

const Container = styled.View`
  padding: 15px 20px;
  background-color: transparent;
`;

const GlassInput = styled(BlurView)`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  border-radius: 25px;
  background-color: ${theme.colors.glassBg};
  border-width: 1px;
  border-color: ${theme.colors.glassBorder};
  overflow: hidden;
`;

const Input = styled.TextInput`
  flex: 1;
  color: white;
  font-size: 14px;
  margin-horizontal: 8px;
  font-family: 'Outfit_400Regular';
`;

const IconButton = styled.TouchableOpacity`
  padding: 6px;
`;

const NovaBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #4b0082;
  padding-horizontal: 10px;
  padding-vertical: 5px;
  border-radius: 12px;
  margin-horizontal: 5px;
`;

const NovaText = styled.Text`
  color: #FFF;
  font-size: 11px;
  margin-left: 3px;
  font-family: 'Outfit_600SemiBold';
`;

const SendButton = styled.TouchableOpacity`
  background-color: ${theme.colors.blueMain};
  width: 36px;
  height: 36px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  shadow-color: ${theme.colors.blueMain};
  shadow-offset: 0px 0px;
  shadow-opacity: 0.8;
  shadow-radius: 8px;
`;

export const InputArea = ({ onSendMessage, onNovaPress }) => {
  const [text, setText] = React.useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <Container>
      <GlassInput intensity={20} tint="dark">
        <IconButton>
          <Plus size={22} color={theme.colors.blueMain} />
        </IconButton>
        
        <NovaBtn onPress={onNovaPress}>
          <Sparkles size={14} color="#FFF" />
          <NovaText>Nova AI</NovaText>
        </NovaBtn>

        <Input 
          placeholder="Transmit message..."
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          value={text}
          onChangeText={setText}
        />

        <IconButton>
          <Smile size={20} color={theme.colors.textDim} />
        </IconButton>

        {text.length === 0 ? (
          <IconButton>
            <Mic size={20} color={theme.colors.textDim} />
          </IconButton>
        ) : (
          <SendButton onPress={handleSend}>
            <Send size={16} color="#000" fill="#000" />
          </SendButton>
        )}
      </GlassInput>
    </Container>
  );
};
