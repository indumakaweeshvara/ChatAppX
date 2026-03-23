import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../theme';

const HeaderContainer = styled.View`
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  margin: 10px 20px;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${theme.colors.glassBorder};
`;

const XPSection = styled.View`
  flex: 1;
  margin-right: 15px;
`;

const StatRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const StatLabel = styled.Text`
  color: ${theme.colors.blueMain};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
`;

const RankLabel = styled.Text`
  color: ${theme.colors.textDim};
  font-size: 10px;
`;

const ProgressBarContainer = styled.View`
  height: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressBar = styled.View`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: ${theme.colors.blueMain};
`;

const StreakBadge = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 69, 0, 0.1);
  padding: 4px 10px;
  border-radius: 12px;
  border-width: 1px;
  border-color: rgba(255, 69, 0, 0.2);
`;

const StreakText = styled.Text`
  color: #ff4500;
  font-size: 12px;
  font-weight: 700;
  margin-left: 5px;
`;

export const GamificationHeader = ({ level, progress, streak, rank, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <HeaderContainer>
        <XPSection>
          <StatRow>
            <StatLabel>LVL {level}</StatLabel>
            <RankLabel>{rank}</RankLabel>
          </StatRow>
          <ProgressBarContainer>
            <ProgressBar progress={progress} />
          </ProgressBarContainer>
        </XPSection>
        <StreakBadge>
          <Text>🔥</Text>
          <StreakText>{streak}</StreakText>
        </StreakBadge>
      </HeaderContainer>
    </TouchableOpacity>
  );
};
