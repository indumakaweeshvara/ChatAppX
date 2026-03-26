import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { CosmicBackground } from '../components/CosmicBackground';
import { ChatHeader } from '../components/ChatHeader';
import { QuickAccessMenu } from '../components/QuickAccessMenu';
import { ChatBubble } from '../components/ChatBubble';
import { InputArea } from '../components/InputArea';
import { SmartReplies } from '../components/SmartReplies';
import { TypingIndicator } from '../components/TypingIndicator';
import { AddFriendModal } from '../components/AddFriendModal';
import { StarProfileModal } from '../components/StarProfileModal';
import { CelestialEvents } from '../components/CelestialEvents';
import { ReactionPicker } from '../components/ReactionPicker';

import { socketService } from '../services/socket';
import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';

const ROOM_ID = 'Mars-Colony-Alpha';

export const ChatScreen = ({ navigation }) => {
  const { user: authUser } = useAuth();
  const userId = authUser?.id || 'user-1';
  const { user } = useUser(userId);
  
  const [messages, setMessages] = useState([
    { text: "Approaching the event horizon. Gravity seems to be... missing?", type: "received", timestamp: "09:30 AM" },
    { text: "Copy that. Engaging anti-gravity stabilizers. How's the view?", type: "sender", timestamp: "09:32 AM", status: "read" },
    { type: "received", timestamp: "09:35 AM", media: { type: 'video', url: null } },
    { text: "Stunning. The nebulae are swirling like liquid sapphire. ✨", type: "received", timestamp: "09:35 AM" },
    { type: "received", timestamp: "09:38 AM", media: { type: 'map', title: 'Orion Nebula Sector 4' } },
    { text: "I've sent the coordinates. See you there!", type: "received", timestamp: "09:40 AM" }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const [showSmartReplies, setShowSmartReplies] = useState(true);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showStarId, setShowStarId] = useState(false);
  const [activePlanet, setActivePlanet] = useState('earth');
  const [sentiment, setSentiment] = useState('positive');
  const [reactionMsgId, setReactionMsgId] = useState(null);
  const [pickerPosition, setPickerPosition] = useState({ x: 0, y: 0 });
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Randomly change planet for demo vibes
    const planets = ['earth', 'mars', 'europa', 'saturn'];
    setActivePlanet(planets[Math.floor(Math.random() * planets.length)]);

    socketService.onMessageReceived((data) => {
      setIsTyping(false);
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [...prev, { text: data.text, type: 'received', timestamp: time }]);
      setShowSmartReplies(true);
      scrollToBottom();
    });
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 200);
  };

  const handleSendMessage = (text) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const messageData = { text, roomId: ROOM_ID, senderId: userId, timestamp: time };
    socketService.sendMessage(messageData);
    
    setMessages((prev) => [...prev, { text, type: 'sender', timestamp: time, status: 'sent' }]);
    setShowSmartReplies(false);
    
    // Auto shift sentiment based on msg
    if (text.toLowerCase().includes('angry') || text.toLowerCase().includes('bad')) {
      setSentiment('negative');
    } else {
      setSentiment('positive');
    }
    
    // Mock typing indicator response
    setTimeout(() => setIsTyping(true), 1000);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { text: "Got it! Initiating sequence.", type: 'received', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setShowSmartReplies(true);
      scrollToBottom();
    }, 4000);

    scrollToBottom();
  };

  const handleLongPress = (index, event) => {
    const { py, px } = event.nativeEvent;
    setPickerPosition({ x: px || 150, y: py || 300 });
    setReactionMsgId(index);
  };

  const addReaction = (reactionId) => {
    if (reactionMsgId !== null) {
      setMessages(prev => prev.map((msg, i) => {
        if (i === reactionMsgId) {
          const reactions = msg.reactions || [];
          if (!reactions.includes(reactionId)) {
            return { ...msg, reactions: [...reactions, reactionId] };
          }
        }
        return msg;
      }));
    }
    setReactionMsgId(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <CosmicBackground planet={activePlanet}>
        <CelestialEvents />
        <SafeAreaView style={{ flex: 1 }}>
          <ChatHeader 
            onBack={() => navigation.goBack()} 
            onAddFriend={() => setShowAddFriend(true)}
            onPressRank={() => setShowStarId(true)}
            sentiment={sentiment} 
            xp={user?.xp || 1540} 
            level={user?.level || 42} 
            rank={user?.rank || 'Moon Pioneer'}
          />
          
          <AddFriendModal 
            visible={showAddFriend} 
            onClose={() => setShowAddFriend(false)} 
            onAdd={(friend) => {
              console.log("Adding friend:", friend);
              setShowAddFriend(false);
            }}
          />

          <StarProfileModal 
            visible={showStarId}
            onClose={() => setShowStarId(false)}
            user={{
              name: authUser?.phone || "Explorer",
              rank: user?.rank || "Moon Pioneer",
              level: user?.level || 42,
              xp: user?.xp || 1540,
              nextLevelXp: 2000
            }}
          />

          <QuickAccessMenu />
          
          <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
          >
            <ScrollView 
              ref={scrollViewRef}
              contentContainerStyle={styles.chatScroll}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={scrollToBottom}
            >
              {messages.map((msg, i) => (
                <ChatBubble 
                  key={i} 
                  text={msg.text} 
                  type={msg.type} 
                  index={i}
                  totalMessages={messages.length}
                  status={msg.status}
                  timestamp={msg.timestamp}
                  media={msg.media}
                  reactions={msg.reactions}
                  onLongPress={(e) => handleLongPress(i, e)}
                />
              ))}
            </ScrollView>

            <View style={styles.footerContainer}>
              {isTyping && <TypingIndicator />}
              {!isTyping && showSmartReplies && <SmartReplies onSelect={handleSendMessage} />}
              <InputArea onSendMessage={handleSendMessage} />
            </View>
          </KeyboardAvoidingView>
          
          {reactionMsgId !== null && (
            <ReactionPicker 
              position={pickerPosition} 
              onSelect={addReaction} 
            />
          )}
        </SafeAreaView>
      </CosmicBackground>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  chatScroll: {
    padding: 15,
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: 'flex-end'
  },
  footerContainer: {
    paddingBottom: Platform.OS === 'ios' ? 0 : 10,
  }
});
