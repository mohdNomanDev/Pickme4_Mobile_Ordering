import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    boxShadow: "0 2 5 rgba(0, 0, 0, 0.05)",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },
});
