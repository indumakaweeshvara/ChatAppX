import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { Calendar, Coffee, AlertCircle } from 'lucide-react-native';

const shortcuts = [
  { id: '1', title: 'My Bookings', icon: Calendar },
  { id: '2', title: 'Dining Menu', icon: Coffee },
  { id: '3', title: 'Emergency', icon: AlertCircle, color: '#FF3B30' },
];

export const QuickAccessMenu = () => {
  const handlePress = (title) => {
    Alert.alert(
      "Solaris System",
      `Initializing link to ${title}... This module is currently in beta.`,
      [{ text: "Steady", style: "default" }]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {shortcuts.map(item => {
          const Icon = item.icon;
          const color = item.color || '#00F2FF';
          
          return (
            <TouchableOpacity 
              key={item.id} 
              style={styles.btnWrapper} 
              onPress={() => handlePress(item.title)}
            >
              <BlurView intensity={20} tint="dark" style={styles.glassBtn}>
                <Icon size={16} color={color} />
                <Text style={[styles.text, { color }]}>{item.title}</Text>
              </BlurView>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    zIndex: 90,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  btnWrapper: {
    marginRight: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  glassBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 242, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 255, 0.3)',
  },
  text: {
    marginLeft: 8,
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
  }
});
