import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/profileStyles/CouponsOffers.styles';
import { Colors } from '../../theme/theme';

export const CouponsOffers = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="pricetag" size={24} color={Colors.primary} />
      <Text style={styles.text}>Coupons & Offers</Text>
    </View>
  );
};
