import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: Colors.primaryLight,
    padding: 6,
    borderRadius: 12,
    marginRight: Spacing.sm,
    boxShadow: `0px 2px 4px ${Colors.primary}1A`, // 1A is ~0.1 opacity in hex
    elevation: 2,
  },
  textContainer: {
    justifyContent: "center",
  },
  brandText: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
    letterSpacing: -0.5,
  },
  numberHighlight: {
    color: Colors.primary,
    fontWeight: "900",
  },
});
