import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/theme";
import { styles } from "../styles/navbarStyles/DetectLocation.styles";

export const DetectLocation = () => {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.7 : 1 }
      ]} 
      onPress={() => console.log("Detecting location...")}
    >
      <Ionicons name="locate-sharp" size={16} color={Colors.primary} />
      <Text style={styles.text}>Detect Current Location</Text>
    </Pressable>
  );
};
