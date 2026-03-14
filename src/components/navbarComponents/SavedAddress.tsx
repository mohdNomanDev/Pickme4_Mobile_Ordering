import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, Text, View, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
  FadeInDown,
  Layout,
  FadeIn,
} from "react-native-reanimated";
import { styles } from "../../styles/navbarStyles/SavedAddress.styles";
import { useThemeColors } from "../../hooks/useThemeColors";
import { useAppSelector } from "../../store/store";
import { Address } from "../../store/slices/addressesSlice";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AddressCard = ({
  address,
  colors,
  index,
  onSelect,
}: {
  address: Address;
  colors: any;
  index: number;
  onSelect?: () => void;
}) => {
  const router = useRouter();
  const lastTap = React.useRef<number>(0);
  const scale = useSharedValue(1);
  const isHovered = useSharedValue(0);

  const getIconName = () => {
    const label = address.label?.toLowerCase() || "";
    if (label.includes("home")) return "home";
    if (label.includes("work") || label.includes("office")) return "briefcase";
    return "location";
  };

  const formatAddress = () => {
    const mainAddress = [
      address.buildingNumber,
      address.streetName,
      address.district,
    ].filter(Boolean).join(" ");

    const buildingInfo = [
      address.buildingName,
      address.floor ? `Floor ${address.floor}` : null,
      address.apartmentNumber ? `Apt ${address.apartmentNumber}` : null,
    ].filter(Boolean).join(", ");

    const cityRegion = [
      address.city,
      address.region,
    ].filter(Boolean).join(", ");

    const parts = [
      mainAddress,
      buildingInfo,
      cityRegion,
      address.landmark ? `Near ${address.landmark}` : null,
    ].filter(Boolean);

    return parts.join(" • ");
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
    onHoverIn: () => { isHovered.value = withTiming(1, { duration: 300 }); },
    onHoverOut: () => { isHovered.value = withTiming(0, { duration: 300 }); }
  } : {};

  const handlePress = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap.current && (now - lastTap.current) < DOUBLE_PRESS_DELAY) {
      // Double Tap Detected - Open Edit Page
      console.log(`Double Tap: Editing Address ${address.label}`);
      if (onSelect) onSelect();
      router.push({
        pathname: "/(modals)/edit-address" as any,
        params: { 
          id: address._id || address.id,
          addressData: JSON.stringify(address) // Passing full address data as string
        }
      });
    } else {
      lastTap.current = now;
      console.log(`Single Tap: Selected Address ${address.label}`);
    }
  };

  return (
    <Animated.View
      entering={Platform.OS === 'web' ? undefined : FadeInDown.delay(index * 80).springify().damping(12)}
      layout={Platform.OS === 'web' ? undefined : Layout.springify()}
      style={styles.cardWrapper}
    >
      <AnimatedPressable
        {...(webHoverProps as any)}
        onPressIn={() => (scale.value = withSpring(0.96))}
        onPressOut={() => (scale.value = withSpring(1))}
        onPress={handlePress}
        style={[styles.card, animatedCardStyle]}
      >
        <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
          <Ionicons
            name={getIconName() as any}
            size={24}
            color={colors.primary}
          />
        </Animated.View>

        <View style={styles.contentContainer}>
          <View style={styles.topRow}>
            <View style={styles.labelContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                {address.label}
              </Text>
              {!!address.shortAddress && (
                <View style={[styles.shortAddressBadge, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <Text style={[styles.shortAddressText, { color: colors.textLight }]}>
                    {address.shortAddress}
                  </Text>
                </View>
              )}
              {!!address.isDefault && (
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
              name="chevron-forward-outline"
              size={18}
              color={colors.textLight}
              style={{ opacity: 0.6 }}
            />
          </View>

          <Text
            style={[styles.addressText, { color: colors.textLight }]}
            numberOfLines={2}
          >
            {formatAddress()}
          </Text>

          {!!address.deliveryInstructions && (
            <View style={[styles.bottomRow, { borderTopColor: colors.border }]}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={14}
                color={colors.primary}
              />
              <Text
                style={[
                  styles.instructionsText,
                  { color: colors.textLight },
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

export const SavedAddress = ({ onSelect }: { onSelect?: () => void }) => {
  const colors = useThemeColors();
  const addresses = useAppSelector((state) => state.addresses.addresses);

  const renderEmpty = () => (
    <Animated.View 
      entering={Platform.OS === 'web' ? undefined : FadeIn.duration(600)}
      style={[styles.emptyContainer, { borderColor: colors.border }]}
    >
      <View style={styles.emptyIconContainer}>
        <Ionicons name="map-outline" size={40} color={colors.primary} />
      </View>
      <Text style={[styles.emptyText, { color: colors.text }]}>No addresses yet</Text>
      <Text style={[styles.emptySubText, { color: colors.textLight }]}>
        Add your home or office address for faster delivery and a personalized experience.
      </Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.heading, { color: colors.text }]}>
          Saved Addresses
        </Text>
        <View style={[styles.badge, { backgroundColor: colors.surface }]}>
          <Text style={[styles.badgeText, { color: colors.primary }]}>
            {addresses?.length || 0} {addresses?.length === 1 ? 'Location' : 'Locations'}
          </Text>
        </View>
      </View>

      {addresses && addresses.length > 0 ? (
        <ScrollView 
          style={{ 
            // Average card height is ~110-120px + gap. 
            // 380px fits ~3 cards comfortably on most screens.
            maxHeight: 380, 
          }}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        >
          {addresses.map((address: Address, index: number) => (
            <AddressCard
              key={address._id || `addr-${index}`}
              address={address}
              colors={colors}
              index={index}
              onSelect={onSelect}
            />
          ))}
        </ScrollView>
      ) : (
        renderEmpty()
      )}
    </View>
  );
};