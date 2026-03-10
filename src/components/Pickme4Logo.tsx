import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/theme";
import { styles } from "../styles/navbarStyles/Pickme4Logo.styles";

export const Pickme4Logo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons name="cart" size={24} color={Colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.brandText}>
          Pickme<Text style={styles.numberHighlight}>4</Text>
        </Text>
      </View>
    </View>
  );
};
