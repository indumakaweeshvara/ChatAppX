import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ScrollView, Image } from 'react-native';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';
import { Plus, Send, Sparkles, Smile, Mic, Camera, FileText, MapPin, X } from 'lucide-react-native';
import { theme } from '../theme';

const Container = styled.View`
  padding: 10px 20px 25px 20px;
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

const EmojiStrip = styled(BlurView)`
  flex-direction: row;
  padding: 10px;
  border-radius: 20px;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.1);
`;

const AttachMenu = styled(BlurView)`
  position: absolute;
  bottom: 80px;
  left: 20px;
  padding: 15px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${theme.colors.blueMain};
  flex-direction: row;
  gap: 15px;
`;

const AttachItem = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const AttachText = styled.Text`
  color: white;
  font-size: 10px;
  margin-top: 4px;
  font-family: 'Outfit_300Light';
`;

const commonEmojis = ['🚀', '🌌', '🌠', '👽', '🛰️', '🪐', '👨‍🚀', '✨', '🛸', '❤️', '🔥', '😂', '👍'];

export const InputArea = ({ onSendMessage }) => {
  const [text, setText] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [showAttach, setShowAttach] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const getNovaInsight = () => {
    const insights = [
      "Mars atmosphere is 95% CO2. Better keep your helmet on! 🚀",
      "Jupiter's Great Red Spot is a storm wider than Earth itself. 🌪️",
      "Saturn's rings are mostly made of water ice and rock. 🪐",
      "One day on Venus is longer than one year on Venus! 🌌",
      "Sun light takes 8 minutes and 20 seconds to reach Earth. ☀️"
    ];
    const random = insights[Math.floor(Math.random() * insights.length)];
    Alert.alert("Nova AI Insight", random, [{text: "Log Data"}]);
  };

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
      setShowEmojis(false);
    }
  };

  const addEmoji = (emoji) => {
    setText(prev => prev + emoji);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      Alert.alert("Solaris Voice", "Voice packet transmitted to the relay station.", [{text: "Over"}]);
    }
  };

  return (
    <Container>
      {showAttach && (
        <AttachMenu intensity={40} tint="dark">
          <AttachItem onPress={() => { setShowAttach(false); Alert.alert("Gallery", "Opening Star Chart Gallery..."); }}>
             <Image source={{uri: 'https://img.icons8.com/ios-filled/50/00F2FF/image.png'}} style={{width: 24, height: 24}} />
            <AttachText>Gallery</AttachText>
          </AttachItem>
          <AttachItem onPress={() => { setShowAttach(false); Alert.alert("Files", "Accessing Data Logs..."); }}>
            <FileText size={24} color="#A855F7" />
            <AttachText>Logs</AttachText>
          </AttachItem>
          <AttachItem onPress={() => { setShowAttach(false); Alert.alert("Location", "Broadcasting coordinates..."); }}>
            <MapPin size={24} color="#22C55E" />
            <AttachText>GPS</AttachText>
          </AttachItem>
          <AttachItem onPress={() => setShowAttach(false)}>
            <X size={20} color="rgba(255,255,255,0.4)" />
          </AttachItem>
        </AttachMenu>
      )}

      {showEmojis && (
        <EmojiStrip intensity={20} tint="dark">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {commonEmojis.map(e => (
              <TouchableOpacity key={e} onPress={() => addEmoji(e)} style={{padding: 5}}>
                <Text style={{fontSize: 24}}>{e}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </EmojiStrip>
      )}

      <GlassInput intensity={20} tint="dark">
        <IconButton onPress={() => setShowAttach(!showAttach)}>
          <Plus size={22} color={showAttach ? "#FFF" : theme.colors.blueMain} />
        </IconButton>
        
        {!isRecording && (
          <NovaBtn onPress={getNovaInsight}>
            <Sparkles size={14} color="#FFF" />
            <NovaText>Nova AI</NovaText>
          </NovaBtn>
        )}

        <Input 
          placeholder={isRecording ? "Recording audio channel..." : "Transmit message..."}
          placeholderTextColor={isRecording ? "#FF3B30" : "rgba(255, 255, 255, 0.4)"}
          value={text}
          onChangeText={setText}
          editable={!isRecording}
        />

        <IconButton onPress={() => setShowEmojis(!showEmojis)}>
          <Smile size={20} color={showEmojis ? "#00F2FF" : theme.colors.textDim} />
        </IconButton>

        {text.length === 0 ? (
          <IconButton onPress={toggleRecording}>
            <Mic size={20} color={isRecording ? "#FF3B30" : theme.colors.textDim} />
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
