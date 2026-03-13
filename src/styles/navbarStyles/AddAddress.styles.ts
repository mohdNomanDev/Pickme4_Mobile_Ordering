import { StyleSheet, Platform } from "react-native";
import { Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: 16,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      } as any,
    }),
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
    boxShadow: "0 4 6 rgba(255, 107, 107, 0.2)",
    elevation: 3,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
