import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { styles } from "../../styles/navbarStyles/Pickme4Logo.styles";
import { Colors } from "../../theme/theme";

export const Pickme4Logo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons name="flash" size={20} color={Colors.background} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.brandText}>
          Pickme<Text style={styles.numberHighlight}>4</Text>
        </Text>
      </View>
    </View>
  );
};
