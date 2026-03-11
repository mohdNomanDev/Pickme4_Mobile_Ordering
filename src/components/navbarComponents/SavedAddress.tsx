import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
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

export const SavedAddress = () => {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: colors.text }]}>Saved Addresses</Text>

      <View style={styles.addressList}>
        {MOCK_ADDRESSES.map((address) => (
          <Pressable
            key={address.id}
            style={({ pressed }) => [
              styles.addressItem,
              { opacity: pressed ? 0.7 : 1, backgroundColor: colors.background, borderColor: colors.border },
            ]}
            onPress={() => console.log(`Selected address: ${address.label}`)}
          >
            <View style={[styles.iconWrapper, { backgroundColor: colors.surface }]}>
              <Ionicons
                name={address.icon}
                size={18}
                color={colors.textLight}
              />
            </View>
            <View style={styles.addressInfo}>
              <Text style={[styles.label, { color: colors.text }]}>{address.label}</Text>
              <Text style={[styles.details, { color: colors.textLight }]} numberOfLines={1}>
                {address.details}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.divider} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};
