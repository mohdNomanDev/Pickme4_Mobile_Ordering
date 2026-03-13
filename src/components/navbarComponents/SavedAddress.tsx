import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { styles } from "../../styles/navbarStyles/SavedAddress.styles";
import { useThemeColors } from "../../hooks/useThemeColors";

const MOCK_ADDRESSES = [
  {
    id: "1",
    label: "Home",
    details: "123, Maple Avenue, Springfield",
    icon: "home-outline" as const,
  },
  {
    id: "2",
    label: "Office",
    details: "456, Business Bay, Downtown",
    icon: "briefcase-outline" as const,
  },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AddressItem = ({ address, colors }: { address: any, colors: any }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <AnimatedPressable
      style={[
        styles.addressItem,
        animatedStyle,
        { backgroundColor: colors.background, borderColor: colors.border },
      ]}
      onPressIn={() => (scale.value = withSpring(0.97, { damping: 15 }))}
      onPressOut={() => (scale.value = withSpring(1, { damping: 15 }))}
      onPress={() => console.log(`Selected address: ${address.label}`)}
    >
      <View style={[styles.iconWrapper, { backgroundColor: colors.surface }]}>
        <Ionicons
          name={address.icon}
          size={22}
          color={colors.text}
        />
      </View>
      <View style={styles.addressInfo}>
        <Text style={[styles.label, { color: colors.text }]}>{address.label}</Text>
        <Text style={[styles.details, { color: colors.textLight }]} numberOfLines={1}>
          {address.details}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
    </AnimatedPressable>
  );
};

export const SavedAddress = () => {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: colors.text }]}>Saved Addresses</Text>

      <View style={styles.addressList}>
        {MOCK_ADDRESSES.map((address) => (
          <AddressItem key={address.id} address={address} colors={colors} />
        ))}
      </View>
    </View>
  );
};
