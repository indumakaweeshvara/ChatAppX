import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { CosmicBackground } from '../components/CosmicBackground';
import { theme } from '../theme';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 40px;
`;

const Title = styled.Text`
  color: white;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
`;

const Subtitle = styled.Text`
  color: ${theme.colors.blueMain};
  font-size: 14px;
  text-align: center;
  margin-bottom: 40px;
  letter-spacing: 2px;
`;

const GlassInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.05);
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
  color: white;
  margin-bottom: 20px;
`;

const PrimaryButton = styled.TouchableOpacity`
  background-color: ${theme.colors.blueMain};
  padding: 18px;
  border-radius: 12px;
  align-items: center;
  margin-top: 20px;
  box-shadow: 0 0 15px ${theme.colors.blueGlow};
`;

const ButtonText = styled.Text`
  color: black;
  font-weight: 700;
  font-size: 16px;
`;

const SecondaryButton = styled.TouchableOpacity`
  margin-top: 20px;
  align-self: center;
`;

const SecondaryText = styled.Text`
  color: ${theme.colors.textDim};
  font-size: 14px;
`;

import { useAuth } from '../hooks/useAuth';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLogin, setIsLogin] = React.useState(true);
  const { login, register } = useAuth();

  const handleAuth = async () => {
    setError('');
    let result;
    if (isLogin) {
      result = await login(email, password);
    } else {
      result = await register(email, password);
    }

    if (result.success) {
      navigation.navigate('Chat');
    } else {
      setError(result.error);
    }
  };

  return (
    <CosmicBackground>
      <Container>
        <Title>GALACTIC</Title>
        <Subtitle>UNIVERSAL CONNECTIVITY</Subtitle>
        
        {error ? <Text style={{ color: theme.colors.danger, textAlign: 'center', marginBottom: 10, fontSize: 12 }}>{error}</Text> : null}

        <GlassInput 
          placeholder="Sector Email" 
          placeholderTextColor="rgba(255,255,255,0.3)" 
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <GlassInput 
          placeholder="Access Secret" 
          placeholderTextColor="rgba(255,255,255,0.3)" 
          secureTextEntry 
          value={password}
          onChangeText={setPassword}
        />

        <PrimaryButton onPress={handleAuth}>
          <ButtonText>{isLogin ? 'INITIALIZE LINK' : 'CREATE IDENTITY'}</ButtonText>
        </PrimaryButton>

        <SecondaryButton onPress={() => setIsLogin(!isLogin)}>
          <SecondaryText>
            {isLogin ? 'Create New Sector Identity' : 'Already have an Identity? Sign In'}
          </SecondaryText>
        </SecondaryButton>
      </Container>
    </CosmicBackground>
  );
};
