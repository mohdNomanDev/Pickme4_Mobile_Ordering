import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { styles } from "../../styles/navbarStyles/Pickme4Logo.styles";
import { useThemeColors } from "../../hooks/useThemeColors";

export const Pickme4Logo = () => {
  const colors = useThemeColors();
  
  return (
    <View style={styles.container}>
      <View style={[styles.iconWrapper, { backgroundColor: colors.primary }]}>
        <Ionicons name="flash" size={20} color={colors.background} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.brandText, { color: colors.text }]}>
          Pickme<Text style={[styles.numberHighlight, { color: colors.primary }]}>4</Text>
        </Text>
      </View>
    </View>
  );
};
