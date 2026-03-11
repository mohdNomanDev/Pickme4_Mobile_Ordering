import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    boxShadow: "0 2 10 rgba(0, 0, 0, 0.05)",
    elevation: 3,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
});
