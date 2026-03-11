import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/profileStyles/CouponsOffers.styles';
import { useThemeColors } from '../../hooks/useThemeColors';

export const CouponsOffers = () => {
  const colors = useThemeColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Ionicons name="pricetag" size={24} color={colors.primary} />
      <Text style={[styles.text, { color: colors.text }]}>Coupons & Offers</Text>
    </View>
  );
};
