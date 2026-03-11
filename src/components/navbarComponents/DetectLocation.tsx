import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { styles } from "../../styles/navbarStyles/DetectLocation.styles";
import { useThemeColors } from "../../hooks/useThemeColors";

export const DetectLocation = () => {
  const colors = useThemeColors();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={() => console.log("Detecting location...")}
    >
      <Ionicons name="locate-sharp" size={16} color={colors.primary} />
      <Text style={[styles.text, { color: colors.primary }]}>Detect Current Location</Text>
    </Pressable>
  );
};
