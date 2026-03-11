import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/profileStyles/Settings.styles';
import { Colors } from '../../theme/theme';

export const Settings = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="settings" size={24} color={Colors.primary} />
      <Text style={styles.text}>Settings</Text>
    </View>
  );
};
