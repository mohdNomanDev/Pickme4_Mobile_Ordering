import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const DetectLocation = () => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => console.log("Detecting location...")}>
      <Ionicons name="locate-sharp" size={16} color="#FF6B6B" />
      <Text style={styles.text}>Detect Current Location</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  text: {
    fontSize: 14,
    color: "#FF6B6B",
    fontWeight: "600",
    marginLeft: 6,
  },
});
