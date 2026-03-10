import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/theme";
import { styles } from "../styles/navbarStyles/DetectLocation.styles";

export const DetectLocation = () => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => console.log("Detecting location...")}>
      <Ionicons name="locate-sharp" size={16} color={Colors.primary} />
      <Text style={styles.text}>Detect Current Location</Text>
    </TouchableOpacity>
  );
};
