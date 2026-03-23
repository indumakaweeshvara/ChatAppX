import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Modal } from 'react-native';
import styled from 'styled-components/native';
import { CosmicBackground } from '../components/CosmicBackground';
import { BlurView } from 'expo-blur';
import { theme } from '../theme';
import { Award, Zap, Flame, User, Edit2, UserPlus, X, Send } from 'lucide-react-native';
import { useUser } from '../hooks/useUser';

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const TopActions = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
`;

const ActionBtn = styled.TouchableOpacity`
  padding: 8px;
  background-color: rgba(0, 242, 255, 0.1);
  border-radius: 20px;
  margin-left: 10px;
  border: 1px solid rgba(0, 242, 255, 0.3);
`;

const ProfileHeader = styled.View`
  align-items: center;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const AvatarContainer = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  padding: 3px;
  background-color: ${theme.colors.blueMain};
  margin-bottom: 15px;
  shadow-color: ${theme.colors.blueMain};
  shadow-offset: 0px 0px;
  shadow-opacity: 0.8;
  shadow-radius: 10px;
`;

const Avatar = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 50px;
  background-color: #111;
  align-items: center;
  justify-content: center;
`;

const UserName = styled.Text`
  color: white;
  font-size: 24px;
  font-family: 'Outfit_600SemiBold';
`;

const UserLevel = styled.Text`
  color: ${theme.colors.blueMain};
  font-size: 12px;
  letter-spacing: 2px;
  margin-top: 5px;
  font-family: 'Outfit_300Light';
`;

const StatsGrid = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const StatCard = styled.View`
  background-color: rgba(255, 255, 255, 0.05);
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  width: 30%;
  align-items: center;
`;

const StatValue = styled.Text`
  color: white;
  font-size: 16px;
  font-family: 'Outfit_600SemiBold';
  margin-top: 5px;
`;

const StatLabel = styled.Text`
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
  text-transform: uppercase;
  font-family: 'Outfit_400Regular';
`;

const ContactsSection = styled.View`
  margin-top: 10px;
  margin-bottom: 40px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SectionTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-family: 'Outfit_600SemiBold';
`;

const ContactCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.05);
  margin-bottom: 10px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.1);
`;

const ContactAvatar = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #333;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  border-width: 1px;
  border-color: ${theme.colors.purpleMain};
`;

const ContactName = styled.Text`
  color: white;
  font-size: 16px;
  font-family: 'Outfit_400Regular';
`;

const ModalOverlay = styled(BlurView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ModalContent = styled.View`
  background-color: #1a1a2e;
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  border-width: 1px;
  border-color: ${theme.colors.blueMain};
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.1);
  font-family: 'Outfit_400Regular';
`;

const PrimaryButton = styled.TouchableOpacity`
  background-color: ${theme.colors.blueMain};
  padding: 15px;
  border-radius: 10px;
  align-items: center;
`;

const USER_ID = 'user-1';

export const ProfileScreen = ({ navigation }) => {
  const { user, loading } = useUser(USER_ID);
  
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isContactModalVisible, setContactModalVisible] = useState(false);
  
  const [username, setUsername] = useState('G-Explorer');
  const [newContact, setNewContact] = useState('');
  
  const [contacts, setContacts] = useState([
    { id: '1', name: 'Nova Explorer' },
    { id: '2', name: 'Commander Shepard' }
  ]);

  const handleSaveProfile = () => {
    setEditModalVisible(false);
  };

  const handleAddContact = () => {
    if (newContact.trim()) {
      setContacts([...contacts, { id: Date.now().toString(), name: newContact }]);
      setNewContact('');
      setContactModalVisible(false);
    }
  };

  if (loading) {
    return (
      <CosmicBackground>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontFamily: 'Outfit_400Regular' }}>Scanning Sector Identity...</Text>
        </SafeAreaView>
      </CosmicBackground>
    );
  }

  return (
    <CosmicBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          <TopActions>
            <ActionBtn onPress={() => setContactModalVisible(true)}>
               <UserPlus color="#00F2FF" size={20} />
            </ActionBtn>
            <ActionBtn onPress={() => setEditModalVisible(true)}>
               <Edit2 color="#00F2FF" size={20} />
            </ActionBtn>
          </TopActions>

          <ProfileHeader>
            <AvatarContainer>
              <Avatar>
                <User color={theme.colors.blueMain} size={50} />
              </Avatar>
            </AvatarContainer>
            <UserName>{username}</UserName>
            <UserLevel>{user?.rank || 'ELITE COMMUNICATOR'} • LVL {user?.level || 1}</UserLevel>
          </ProfileHeader>

          <StatsGrid>
            <StatCard>
              <Zap color={theme.colors.blueMain} size={20} />
              <StatValue>{user?.xp || 0}</StatValue>
              <StatLabel>Total XP</StatLabel>
            </StatCard>
            <StatCard>
              <Flame color="#ff4500" size={20} />
              <StatValue>{user?.streak || 0}</StatValue>
              <StatLabel>Streak</StatLabel>
            </StatCard>
            <StatCard>
              <Award color={theme.colors.purpleMain} size={20} />
              <StatValue>{user?.badgesCount || 3}</StatValue>
              <StatLabel>Badges</StatLabel>
            </StatCard>
          </StatsGrid>

          <ContactsSection>
            <SectionHeader>
              <SectionTitle>My Contacts ({contacts.length})</SectionTitle>
            </SectionHeader>
            {contacts.map(contact => (
              <ContactCard key={contact.id} onPress={() => navigation.navigate('Chat')}>
                <ContactAvatar>
                  <User color="rgba(255,255,255,0.5)" size={20} />
                </ContactAvatar>
                <ContactName>{contact.name}</ContactName>
                <View style={{ flex: 1 }} />
                <Send color="rgba(0,242,255,0.5)" size={16} />
              </ContactCard>
            ))}
          </ContactsSection>

        </Container>

        {/* Edit Profile Modal */}
        <Modal visible={isEditModalVisible} transparent animationType="fade">
          <ModalOverlay intensity={40} tint="dark">
             <ModalContent>
               <SectionHeader>
                 <SectionTitle>Edit Comm Profile</SectionTitle>
                 <TouchableOpacity onPress={() => setEditModalVisible(false)}><X color="white" size={24}/></TouchableOpacity>
               </SectionHeader>
               <Input 
                 placeholder="Enter new username..." 
                 placeholderTextColor="rgba(255,255,255,0.3)"
                 value={username}
                 onChangeText={setUsername}
               />
               <PrimaryButton onPress={handleSaveProfile}>
                 <Text style={{ color: 'black', fontFamily: 'Outfit_600SemiBold' }}>Save Changes</Text>
               </PrimaryButton>
             </ModalContent>
          </ModalOverlay>
        </Modal>

        {/* Add Contact Modal */}
        <Modal visible={isContactModalVisible} transparent animationType="fade">
          <ModalOverlay intensity={40} tint="dark">
             <ModalContent>
               <SectionHeader>
                 <SectionTitle>Add New Contact</SectionTitle>
                 <TouchableOpacity onPress={() => setContactModalVisible(false)}><X color="white" size={24}/></TouchableOpacity>
               </SectionHeader>
               <Input 
                 placeholder="Enter Galactic ID or Name..." 
                 placeholderTextColor="rgba(255,255,255,0.3)"
                 value={newContact}
                 onChangeText={setNewContact}
               />
               <PrimaryButton onPress={handleAddContact}>
                 <Text style={{ color: 'black', fontFamily: 'Outfit_600SemiBold' }}>Add to Roster</Text>
               </PrimaryButton>
             </ModalContent>
          </ModalOverlay>
        </Modal>

      </SafeAreaView>
    </CosmicBackground>
  );
};
