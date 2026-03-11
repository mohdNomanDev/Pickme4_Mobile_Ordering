import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/profileStyles/Appearance.styles';
import { Colors } from '../../theme/theme';

export const Appearance = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="color-palette" size={24} color={Colors.primary} />
      <Text style={styles.text}>Appearance</Text>
    </View>
  );
};
