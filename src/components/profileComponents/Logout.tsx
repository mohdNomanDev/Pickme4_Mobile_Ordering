import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { styles } from '../../styles/profileStyles/Logout.styles';
import { useThemeColors } from '../../hooks/useThemeColors';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Logout = () => {
  const colors = useThemeColors();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable 
      style={[
        styles.container, 
        animatedStyle,
        { backgroundColor: colors.surface, borderColor: colors.border }
      ]}
      onPressIn={() => (scale.value = withSpring(0.97))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={() => console.log('Logout clicked')}
    >
      <View style={[styles.iconWrapper, { backgroundColor: 'rgba(255, 107, 107, 0.1)' }]}>
        <Ionicons name="log-out" size={22} color="#FF6B6B" />
      </View>
      <Text style={[styles.text, { color: "#FF6B6B" }]}>Log Out</Text>
    </AnimatedPressable>
  );
};
