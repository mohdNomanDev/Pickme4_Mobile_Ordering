import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/profileStyles/PaymentMethods.styles';
import { useThemeColors } from '../../hooks/useThemeColors';

export const PaymentMethods = () => {
  const colors = useThemeColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Ionicons name="card" size={24} color={colors.primary} />
      <Text style={[styles.text, { color: colors.text }]}>Payment Methods</Text>
    </View>
  );
};
