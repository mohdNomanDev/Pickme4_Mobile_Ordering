import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/profileStyles/About.styles';
import { Colors } from '../../theme/theme';

export const About = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="information-circle" size={24} color={Colors.primary} />
      <Text style={styles.text}>About</Text>
    </View>
  );
};
