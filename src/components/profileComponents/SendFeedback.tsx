import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/profileStyles/SendFeedback.styles';
import { useThemeColors } from '../../hooks/useThemeColors';

export const SendFeedback = () => {
  const colors = useThemeColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Ionicons name="paper-plane" size={24} color={colors.primary} />
      <Text style={[styles.text, { color: colors.text }]}>Send Feedback</Text>
    </View>
  );
};
