import { StyleSheet, Platform } from "react-native";
import { Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 100,
    ...Platform.select({
      web: {
        position: 'sticky',
        top: 0,
      } as any,
    }),
  },
  blurContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    overflow: "hidden",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.xl, // Increased space for a more premium airy feel
  },
});
