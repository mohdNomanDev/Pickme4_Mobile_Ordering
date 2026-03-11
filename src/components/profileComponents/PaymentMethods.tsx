import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/profileStyles/PaymentMethods.styles';
import { Colors } from '../../theme/theme';

export const PaymentMethods = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="card" size={24} color={Colors.primary} />
      <Text style={styles.text}>Payment Methods</Text>
    </View>
  );
};
