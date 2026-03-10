import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const Pickme4Logo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons name="cart" size={24} color="#FF6B6B" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.brandText}>
          Pickme<Text style={styles.numberHighlight}>4</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "#FFEBEB",
    padding: 6,
    borderRadius: 12,
    marginRight: 8,
    shadowColor: "#FF6B6B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    justifyContent: "center",
  },
  brandText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2D3436",
    letterSpacing: -0.5,
  },
  numberHighlight: {
    color: "#FF6B6B",
    fontWeight: "900",
  },
});
