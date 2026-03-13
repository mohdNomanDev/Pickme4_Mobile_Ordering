import React from 'react';
import { Pressable, Text, StyleSheet, Platform, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Spacing } from '../../theme/theme';
import { useThemeColors } from '../../hooks/useThemeColors';

interface EditBtnProps {
  onPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const EditBtn: React.FC<EditBtnProps> = ({ onPress }) => {
  const colors = useThemeColors();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable 
      style={[
        styles.button, 
        animatedStyle,
        { backgroundColor: colors.primary }
      ]} 
      onPress={onPress}
      onPressIn={() => (scale.value = withSpring(0.92))}
      onPressOut={() => (scale.value = withSpring(1))}
    >
      <Ionicons name="pencil-sharp" size={16} color="#FFF" />
      <Text style={styles.text}>Edit Profile</Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 10,
    boxShadow: "0 6 12 rgba(255, 107, 107, 0.3)",
    elevation: 5,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
      } as any,
    }),
  },
  text: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
});
