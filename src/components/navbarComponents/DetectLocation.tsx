import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { styles } from "../../styles/navbarStyles/DetectLocation.styles";
import { useThemeColors } from "../../hooks/useThemeColors";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const DetectLocation = () => {
  const colors = useThemeColors();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <AnimatedPressable
      style={[
        styles.container,
        animatedStyle,
        { backgroundColor: colors.primaryLight }
      ]}
      onPressIn={() => (scale.value = withSpring(0.96, { damping: 15 }))}
      onPressOut={() => (scale.value = withSpring(1, { damping: 15 }))}
      onPress={() => console.log("Detecting location...")}
    >
      <View style={[styles.iconWrapper, { backgroundColor: 'rgba(255,107,107,0.1)' }]}>
        <Ionicons name="locate-sharp" size={20} color={colors.primary} />
      </View>
      <Text style={[styles.text, { color: colors.primary }]}>Detect Current Location</Text>
    </AnimatedPressable>
  );
};
