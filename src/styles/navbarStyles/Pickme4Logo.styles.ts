import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 14,
    marginRight: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  textContainer: {
    justifyContent: "center",
  },
  brandText: {
    fontSize: 24,
    fontWeight: "900",
    color: Colors.text,
    letterSpacing: -0.8,
  },
  numberHighlight: {
    color: Colors.primary,
  },
});
