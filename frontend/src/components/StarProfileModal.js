import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { X, Star, Shield, Zap, Globe } from 'lucide-react-native';
import { theme } from '../theme';

export const StarProfileModal = ({ visible, onClose, user = {} }) => {
  const { 
    name = "Explorer", 
    rank = "Moon Drifter", 
    level = 1, 
    xp = 0, 
    nextLevelXp = 1000,
    badges = ['Pioneer', 'Navigator']
  } = user;

  const progress = (xp / nextLevelXp) * 100;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <BlurView intensity={60} tint="dark" style={styles.modalView}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <X color="#FFF" size={24} />
          </TouchableOpacity>

          <View style={styles.profileHeader}>
            <View style={styles.avatarGlow} />
            <View style={styles.avatar}>
               <Globe size={40} color={theme.colors.blueMain} />
            </View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.rank}>{rank}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>{level}</Text>
              <Text style={styles.statLabel}>LEVEL</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statVal}>{xp}</Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressHead}>
              <Text style={styles.progressText}>Next Rank Progress</Text>
              <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
            </View>
            <View style={styles.barBg}>
              <View style={[styles.barFill, { width: `${progress}%` }]} />
            </View>
          </View>

          <View style={styles.badgesSection}>
            <Text style={styles.sectionTitle}>Achievement Badges</Text>
            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <Shield size={20} color="#FFD700" />
                <Text style={styles.badgeText}>Guardian</Text>
              </View>
              <View style={styles.badge}>
                <Star size={20} color="#A855F7" />
                <Text style={styles.badgeText}>Elite</Text>
              </View>
              <View style={styles.badge}>
                <Zap size={20} color="#00F2FF" />
                <Text style={styles.badgeText}>Nova</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.actionBtn} onPress={onClose}>
            <Text style={styles.actionText}>Close Star-ID</Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    width: '85%',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 255, 0.3)',
    overflow: 'hidden',
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatarGlow: {
    position: 'absolute',
    width: 90, height: 90,
    borderRadius: 45,
    backgroundColor: theme.colors.blueMain,
    opacity: 0.2,
    shadowColor: theme.colors.blueMain,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  avatar: {
    width: 80, height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.blueMain,
    marginBottom: 15,
  },
  name: {
    color: '#FFF',
    fontSize: 22,
    fontFamily: 'Outfit_600SemiBold',
    letterSpacing: 0.5,
  },
  rank: {
    color: theme.colors.blueMain,
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    paddingVertical: 15,
    width: '100%',
    marginBottom: 25,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statVal: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Outfit_700Bold',
  },
  statLabel: {
    color: theme.colors.textDim,
    fontSize: 10,
    fontFamily: 'Outfit_300Light',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignSelf: 'center',
  },
  progressSection: {
    width: '100%',
    marginBottom: 25,
  },
  progressHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
  },
  progressPercent: {
    color: theme.colors.blueMain,
    fontSize: 12,
    fontFamily: 'Outfit_600SemiBold',
  },
  barBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: theme.colors.blueMain,
    shadowColor: theme.colors.blueMain,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  badgesSection: {
    width: '100%',
    marginBottom: 30,
  },
  sectionTitle: {
    color: theme.colors.textDim,
    fontSize: 12,
    fontFamily: 'Outfit_600SemiBold',
    marginBottom: 15,
    textAlign: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  badge: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 10,
    borderRadius: 15,
    width: 70,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 9,
    fontFamily: 'Outfit_300Light',
    marginTop: 5,
  },
  actionBtn: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: theme.colors.blueMain,
    borderRadius: 15,
    alignItems: 'center',
  },
  actionText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Outfit_600SemiBold',
  }
});
