import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/profileStyles/YourFeedback.styles';
import { Colors } from '../../theme/theme';

export const YourFeedback = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="chatbox-ellipses" size={24} color={Colors.primary} />
      <Text style={styles.text}>Your Feedback</Text>
    </View>
  );
};
