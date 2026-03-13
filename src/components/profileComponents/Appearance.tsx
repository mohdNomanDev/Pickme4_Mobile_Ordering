import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  FadeInDown 
} from 'react-native-reanimated';
import { styles } from '../../styles/profileStyles/Appearance.styles';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setThemeMode, ThemeMode } from '../../store/slices/themeSlice';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Appearance Component: Allows the user to toggle between Light, Dark, and System theme modes.
 * Features:
 * - Reanimated tactile feedback (scaling on press).
 * - Cinematic entrance animations.
 * - Platform-specific styling (hover states on Web).
 * - Dynamic theme switching through Redux.
 */
export const Appearance = () => {
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const currentMode = useAppSelector((state) => state.theme.mode);

  const themeOptions: { label: string; mode: ThemeMode; icon: keyof typeof Ionicons.glyphMap }[] = [
    { label: 'Light', mode: 'light', icon: 'sunny-outline' },
    { label: 'Dark', mode: 'dark', icon: 'moon-outline' },
    { label: 'System', mode: 'system', icon: 'settings-outline' },
  ];

  return (
    <Animated.View 
      entering={FadeInDown.duration(800).springify().damping(20)}
      style={[styles.container, { backgroundColor: colors.surface }]}
    >
      <View style={styles.header}>
        <View style={{ padding: 8, backgroundColor: 'rgba(161, 140, 209, 0.1)', borderRadius: 10 }}>
          <Ionicons name="color-palette" size={24} color="#a18cd1" />
        </View>
        <Text style={[styles.text, { color: colors.text }]}>Appearance</Text>
      </View>
      
      <View style={styles.optionsContainer}>
        {themeOptions.map((option) => (
          <ThemeOption 
            key={option.mode}
            option={option}
            isActive={currentMode === option.mode}
            onSelect={() => dispatch(setThemeMode(option.mode))}
            colors={colors}
          />
        ))}
      </View>
    </Animated.View>
  );
};

interface ThemeOptionProps {
  option: { label: string; mode: ThemeMode; icon: keyof typeof Ionicons.glyphMap };
  isActive: boolean;
  onSelect: () => void;
  colors: any;
}

const ThemeOption: React.FC<ThemeOptionProps> = ({ option, isActive, onSelect, colors }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
    opacity.value = withSpring(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      onPress={onSelect}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.optionButton,
        animatedStyle,
        isActive 
          ? { backgroundColor: colors.primaryLight, borderColor: colors.primary }
          : { backgroundColor: colors.background, borderColor: colors.border }
      ]}
    >
      <Ionicons 
        name={option.icon} 
        size={24} 
        color={isActive ? colors.primary : colors.textLight} 
      />
      <Text style={[
        styles.optionText,
        { color: isActive ? colors.primary : colors.textLight }
      ]}>
        {option.label}
      </Text>
      {isActive && (
        <Animated.View 
          entering={FadeInDown}
          style={{ position: 'absolute', top: -5, right: -5 }}
        >
          <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
        </Animated.View>
      )}
    </AnimatedPressable>
  );
};
