import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
  FadeInDown,
} from "react-native-reanimated";
import { styles } from "../../styles/navbarStyles/SavedAddress.styles";
import { useThemeColors } from "../../hooks/useThemeColors";
import { useAppSelector } from "../../store/store";

// Address Interface matching the provided Mongoose schema
interface Address {
  _id?: string;
  label: "Home" | "Work" | "Other";
  houseNumber: string;
  buildingName?: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
  pincode?: string;
  deliveryInstructions?: string;
  isDefault: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AddressCard = ({
  address,
  colors,
  index,
}: {
  address: Address;
  colors: any;
  index: number;
}) => {
  const scale = useSharedValue(1);
  const isHovered = useSharedValue(0);

  const getIconName = () => {
    switch (address.label) {
      case "Home":
        return "home";
      case "Work":
        return "briefcase";
      default:
        return "location";
    }
  };

  const formatAddress = () => {
    const parts = [
      address.houseNumber,
      address.buildingName,
      address.street,
      address.landmark,
      address.city,
      address.state,
      address.pincode,
    ].filter(Boolean);

    return parts.join(", ");
  };

  const animatedCardStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      isHovered.value,
      [0, 1],
      [colors.border, colors.primary]
    );

    const backgroundColor = interpolateColor(
      isHovered.value,
      [0, 1],
      [colors.background, colors.surface]
    );

    return {
      transform: [{ scale: scale.value }],
      borderColor,
      backgroundColor,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const iconBg = interpolateColor(
      isHovered.value,
      [0, 1],
      [colors.surface, colors.primaryLight]
    );
    return {
      backgroundColor: iconBg,
      transform: [{ scale: isHovered.value ? withSpring(1.1) : withSpring(1) }],
    };
  });

  const webHoverProps = Platform.OS === 'web' ? {
    onHoverIn: () => { isHovered.value = withTiming(1, { duration: 250 }); },
    onHoverOut: () => { isHovered.value = withTiming(0, { duration: 250 }); }
  } : {};

  return (
    <Animated.View
      // Simplified entrance to avoid Web Node removal issues
      entering={Platform.OS === 'web' ? undefined : FadeInDown.delay(index * 100).springify()}
      style={styles.cardWrapper}
    >
      <AnimatedPressable
        {...(webHoverProps as any)}
        onPressIn={() => (scale.value = withSpring(0.96))}
        onPressOut={() => (scale.value = withSpring(1))}
        onPress={() => console.log(`Selected Address: ${address.label}`)}
        style={[styles.card, animatedCardStyle]}
      >
        <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
          <Ionicons
            name={getIconName()}
            size={22}
            color={colors.primary}
          />
        </Animated.View>

        <View style={styles.contentContainer}>
          <View style={styles.topRow}>
            <View style={styles.labelContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                {address.label}
              </Text>
              {address.isDefault && (
                <View
                  style={[
                    styles.defaultBadge,
                    { backgroundColor: colors.primaryLight },
                  ]}
                >
                  <Text style={[styles.defaultText, { color: colors.primary }]}>
                    Default
                  </Text>
                </View>
              )}
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textLight}
            />
          </View>

          <Text
            style={[styles.addressText, { color: colors.textLight }]}
            numberOfLines={2}
          >
            {formatAddress()}
          </Text>

          {address.deliveryInstructions && (
            <View style={styles.bottomRow}>
              <Ionicons
                name="information-circle"
                size={16}
                color={colors.primary}
              />
              <Text
                style={[
                  styles.instructionsText,
                  { color: colors.text },
                ]}
                numberOfLines={1}
              >
                {address.deliveryInstructions}
              </Text>
            </View>
          )}
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
};

export const SavedAddress = () => {
  const colors = useThemeColors();
  const addresses = useAppSelector((state) => state.addresses.addresses);

  // Debug log to check data on mobile console
  console.log("Addresses in Component:", addresses);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.heading, { color: colors.text }]}>
          Saved Addresses
        </Text>
        <View style={[styles.badge, { backgroundColor: colors.surface }]}>
          <Text style={[styles.badgeText, { color: colors.textLight }]}>
            {addresses?.length || 0} {addresses?.length === 1 ? 'Location' : 'Locations'}
          </Text>
        </View>
      </View>

      {addresses && addresses.length > 0 ? (
        <View style={styles.listContainer}>
          {addresses.map((address: Address, index: number) => (
            <AddressCard
              key={address._id || `addr-${index}`}
              address={address}
              colors={colors}
              index={index}
            />
          ))}
        </View>
      ) : (
        <View 
          style={[styles.emptyContainer, { borderColor: colors.border, backgroundColor: colors.background }]}
        >
          <Ionicons name="location-outline" size={54} color={colors.textLight} />
          <Text style={[styles.emptyText, { color: colors.text }]}>No addresses yet</Text>
          <Text style={[styles.emptySubText, { color: colors.textLight }]}>
            Save your home or work address for faster checkout.
          </Text>
        </View>
      )}
    </View>
  );
};