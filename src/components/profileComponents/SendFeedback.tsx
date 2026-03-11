import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/profileStyles/SendFeedback.styles';
import { Colors } from '../../theme/theme';

export const SendFeedback = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="paper-plane" size={24} color={Colors.primary} />
      <Text style={styles.text}>Send Feedback</Text>
    </View>
  );
};
