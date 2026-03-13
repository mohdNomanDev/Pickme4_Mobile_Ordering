import { Pressable, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { styles } from "../../styles/navbarStyles/AddAddress.styles";
import { useThemeColors } from "../../hooks/useThemeColors";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AddAddress = ({ onPress }: { onPress?: () => void }) => {
  const colors = useThemeColors();
  const router = useRouter();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const handlePress = () => {
    if (onPress) onPress();
    router.push("/(modals)/add-address");
  };
  
  return (
    <AnimatedPressable 
      style={[
        styles.container,
        animatedStyle,
        { backgroundColor: colors.surface }
      ]}
      onPressIn={() => (scale.value = withSpring(0.96, { damping: 15 }))}
      onPressOut={() => (scale.value = withSpring(1, { damping: 15 }))}
      onPress={handlePress}
    >
      <View style={[styles.iconWrapper, { backgroundColor: colors.primary }]}>
        <Ionicons name="add" size={20} color={colors.background} />
      </View>
      <Text style={[styles.text, { color: colors.primary }]}>Add New Address</Text>
    </AnimatedPressable>
  );
};
