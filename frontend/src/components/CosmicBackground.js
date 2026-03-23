import React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import styled from 'styled-components/native';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.bgDark};
`;

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  width: ${width}px;
  height: ${height}px;
`;

const DarkOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const CosmicBackground = ({ children }) => {
  return (
    <Container>
      <BackgroundImage
        source={require('../../assets/cosmic_bg.png')}
        resizeMode="cover"
      >
        <DarkOverlay />
        {children}
      </BackgroundImage>
    </Container>
  );
};
