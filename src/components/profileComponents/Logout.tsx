import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/profileStyles/Logout.styles';
import { Colors } from '../../theme/theme';

export const Logout = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="log-out" size={24} color={Colors.primary} />
      <Text style={styles.text}>Logout</Text>
    </View>
  );
};
