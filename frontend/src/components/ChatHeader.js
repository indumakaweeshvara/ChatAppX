import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { ChevronLeft, Phone, UserPlus, Star } from 'lucide-react-native';
import { theme } from '../theme';

export const ChatHeader = ({ onBack, onAddFriend, onPressRank, sentiment = 'positive', xp = 1540, level = 42, rank = 'Moon Drifter' }) => {
  const moodColor = sentiment === 'positive' ? '#00FF00' : sentiment === 'negative' ? '#FF3B30' : theme.colors.blueMain;

  return (
    <View style={styles.container}>
      <BlurView intensity={30} tint="dark" style={[styles.glass, { borderColor: moodColor, shadowColor: moodColor, shadowOpacity: 0.5, shadowRadius: 10 }]}>
        <TouchableOpacity style={styles.iconBtn} onPress={onBack}>
          <ChevronLeft size={24} color="#00F2FF" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.userInfo} onPress={onPressRank} activeOpacity={0.7}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatarGlow, { backgroundColor: moodColor, shadowColor: moodColor }]} />
            <View style={[styles.avatar, { borderColor: moodColor }]} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{rank}</Text>
            <View style={styles.levelRow}>
              <Star size={10} color="#FFD700" style={{marginRight: 4}} />
              <Text style={styles.status}>LVL {level} • {xp} XP</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.orbitBtn} onPress={onAddFriend}>
            <UserPlus size={18} color="#FFF" />
            <Text style={styles.orbitText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconBtn} 
            onPress={() => Alert.alert("Voice Canal", "Establishing sub-space audio link... [ENC: 256-BIT]", [{text: "Accept"}])}
          >
            <Phone size={20} color="#00F2FF" />
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 100,
  },
  glass: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'rgba(20, 10, 40, 0.4)',
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 10,
  },
  iconBtn: {
    padding: 8,
  },
  orbitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(138, 43, 226, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 5,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.8)',
  },
  orbitText: {
    color: '#FFF',
    fontSize: 12,
    marginLeft: 4,
    fontFamily: 'Outfit_600SemiBold',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatarGlow: {
    position: 'absolute',
    top: -4, left: -4, right: -4, bottom: -4,
    borderRadius: 25,
    opacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  avatar: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    borderWidth: 2,
  },
  textContainer: {
    justifyContent: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Outfit_600SemiBold',
    textShadowColor: 'rgba(0, 242, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  status: {
    color: '#FFD700',
    fontSize: 12,
    fontFamily: 'Outfit_300Light',
    opacity: 0.9,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
