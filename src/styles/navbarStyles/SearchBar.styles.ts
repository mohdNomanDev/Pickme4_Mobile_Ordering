import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme/theme";

export const searchBarStyles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.background,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: Spacing.sm,
    paddingHorizontal: Spacing.md,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  icon: {
    marginRight: Spacing.xs,
  },
});
