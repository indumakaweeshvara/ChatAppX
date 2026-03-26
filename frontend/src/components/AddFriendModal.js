import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { BlurView } from 'expo-blur';
import { UserPlus, Search, X } from 'lucide-react-native';
import { theme } from '../theme';

export const AddFriendModal = ({ visible, onClose, onAdd }) => {
  const [phone, setPhone] = useState('');
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!phone) return;
    setSearching(true);
    setError('');
    setResult(null);
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/user/search?phoneNumber=${phone}`);
      const data = await response.json();
      if (data.id) {
        setResult(data);
      } else {
        setError('Galactic ID not found.');
      }
    } catch (err) {
      setError('Search failed. Check connection.');
    } finally {
      setSearching(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <BlurView intensity={50} tint="dark" style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Locate Explorer</Text>
            <TouchableOpacity onPress={onClose}>
              <X color="#fff" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchBox}>
            <TextInput
              style={styles.input}
              placeholder="+94XXXXXXXXX"
              placeholderTextColor="rgba(255,255,255,0.3)"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
              {searching ? <ActivityIndicator color="#000" size="small" /> : <Search color="#000" size={20} />}
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {result && (
            <View style={styles.resultCard}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{result.username}</Text>
                <Text style={styles.userStatus}>{result.rank} • LVL {result.level}</Text>
              </View>
              <TouchableOpacity style={styles.addBtn} onPress={() => onAdd(result)}>
                <UserPlus color="#000" size={20} />
              </TouchableOpacity>
            </View>
          )}
        </BlurView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
    width: '100%',
    maxWidth: 350,
    borderRadius: 25,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Outfit_600SemiBold'
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    height: 55,
    alignItems: 'center',
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Outfit_400Regular'
  },
  searchBtn: {
    backgroundColor: theme.colors.blueMain,
    width: 55,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultCard: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Outfit_600SemiBold'
  },
  userStatus: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontFamily: 'Outfit_300Light'
  },
  addBtn: {
    backgroundColor: theme.colors.blueMain,
    padding: 10,
    borderRadius: 10
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center'
  }
});
