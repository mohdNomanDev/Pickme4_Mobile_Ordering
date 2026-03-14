import React from 'react';
import { Pressable, Text, View, ActivityIndicator, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  FadeInUp
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

/**
 * DeleteAddressBtnProps
 * @property {() => void} [onPress] - Callback when the button is pressed.
 * @property {boolean} [isLoading] - Shows a loading indicator when true.
 * @property {string} [className] - Additional Tailwind classes for layout customization.
 */
export interface DeleteAddressBtnProps {
  onPress?: () => void;
  isLoading?: boolean;
  className?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * DeleteAddressBtn
 * A full-width, destructive action button with cinematic animations.
 * Features Feather icons, Reanimated micro-interactions, and NativeWind styling.
 */
export const DeleteAddressBtn: React.FC<DeleteAddressBtnProps> = ({ 
  onPress, 
  isLoading = false, 
  className = "" 
}) => {
  // Shared values for high-end micro-interactions
  const scale = useSharedValue(1);
  const hoverOpacity = useSharedValue(1);

  // Reanimated style for the 0.95 scale-down effect on press
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: withTiming(isLoading ? 0.7 : hoverOpacity.value),
  }));

  const handlePressIn = () => {
    if (isLoading) return;
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handlePress = () => {
    if (!isLoading && onPress) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }
      onPress();
    }
  };

  return (
    <Animated.View 
      entering={FadeInUp.duration(600).delay(300).springify()}
      className="w-full"
    >
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={isLoading}
        // Web-only hover feedback via opacity for a sleek feel
        onPointerEnter={() => {
          if (Platform.OS === 'web') hoverOpacity.value = 0.9;
        }}
        onPointerLeave={() => {
          if (Platform.OS === 'web') hoverOpacity.value = 1;
        }}
        className={`
          flex-row items-center justify-center 
          py-4 px-6 rounded-2xl
          bg-red-500 dark:bg-red-600
          shadow-lg shadow-red-500/30 dark:shadow-black/40
          active:bg-red-600 dark:active:bg-red-700
          min-h-[56px]
          ${className}
        `}
        style={animatedStyle}
      >
        {isLoading ? (
          <View className="flex-row items-center justify-center gap-3">
            <ActivityIndicator color="white" size="small" />
            <Text className="text-white font-bold text-base tracking-wide uppercase">
              Processing...
            </Text>
          </View>
        ) : (
          <View className="flex-row items-center justify-center gap-3">
            <Feather name="trash-2" size={20} color="white" />
            <Text className="text-white font-bold text-base tracking-wide">
              Delete Address
            </Text>
          </View>
        )}
      </AnimatedPressable>
    </Animated.View>
  );
};
