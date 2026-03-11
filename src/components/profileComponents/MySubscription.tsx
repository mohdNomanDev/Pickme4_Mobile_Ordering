import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/profileStyles/MySubscription.styles';
import { Colors } from '../../theme/theme';

export const MySubscription = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="star" size={24} color={Colors.primary} />
      <Text style={styles.text}>My Subscription</Text>
    </View>
  );
};
