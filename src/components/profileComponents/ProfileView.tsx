import React from "react";
import { ScrollView, Text, View, Pressable, Platform } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInDown,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles/profileStyles/Profile.styles";
import { MyProfile } from "./MyProfile";
import { useThemeColors } from "../../hooks/useThemeColors";

// Individual components
// import { About } from "./About";
import { Appearance } from "./Appearance";
// import { CouponsOffers } from "./CouponsOffers";
import { Logout } from "./Logout";
// import { MySubscription } from "./MySubscription";
// import { PaymentMethods } from "./PaymentMethods";
// import { SendFeedback } from "./SendFeedback";
// import { Settings } from "./Settings";
// import { YourFeedback } from "./YourFeedback";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  color?: string;
  showDivider?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  onPress,
  color,
  showDivider = true,
}) => {
  const colors = useThemeColors();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View>
      <AnimatedPressable
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.98);
          opacity.value = withSpring(0.8);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
          opacity.value = withSpring(1);
        }}
        style={[
          styles.menuItem,
          animatedStyle,
          Platform.OS === "web" && ({ transition: "all 0.2s ease" } as any),
        ]}
      >
        <View style={styles.menuItemLeft}>
          <View
            style={[styles.iconWrapper, { backgroundColor: colors.surface }]}
          >
            <Ionicons name={icon} size={22} color={color || colors.text} />
          </View>
          <Text style={[styles.menuItemText, { color: colors.text }]}>
            {label}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
      </AnimatedPressable>
      {showDivider && (
        <View
          style={[styles.menuItemDivider, { backgroundColor: colors.divider }]}
        />
      )}
    </View>
  );
};

export const ProfileView = () => {
  const colors = useThemeColors();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <Animated.View entering={FadeInDown.duration(600).springify()}>
        <MyProfile />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(100).duration(600).springify()}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Subscription & Rewards
        </Text>
        <View
          style={[
            styles.menuContainer,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <MenuItem icon="star" label="My Subscription" color="#FFD700" />
          <MenuItem
            icon="gift"
            label="Coupons & Offers"
            color="#FF6B6B"
            showDivider={false}
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(200).duration(600).springify()}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Account & Payments
        </Text>
        <View
          style={[
            styles.menuContainer,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <MenuItem
            icon="card"
            label="Payment Methods"
            color="#4facfe"
            showDivider={false}
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(600).springify()}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Preferences
        </Text>
        <Appearance />
        <View
          style={[
            styles.menuContainer,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              marginTop: 16,
            },
          ]}
        >
          <MenuItem
            icon="settings"
            label="Settings"
            color="#636e72"
            showDivider={false}
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400).duration(600).springify()}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Feedback & Support
        </Text>
        <View
          style={[
            styles.menuContainer,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <MenuItem
            icon="chatbubble-ellipses"
            label="Your Feedback"
            color="#00b894"
          />
          <MenuItem
            icon="help-circle"
            label="Send Feedback"
            color="#0984e3"
            showDivider={false}
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(500).duration(600).springify()}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          App Info
        </Text>
        <View
          style={[
            styles.menuContainer,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <MenuItem
            icon="information-circle"
            label="About"
            color="#636e72"
            showDivider={false}
          />
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(600).duration(600).springify()}
        style={{ marginTop: 40 }}
      >
        <Logout />
      </Animated.View>
    </ScrollView>
  );
};
