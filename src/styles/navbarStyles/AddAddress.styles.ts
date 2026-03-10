import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    marginTop: Spacing.xs,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
});
