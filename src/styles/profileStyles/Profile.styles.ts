import { StyleSheet, Platform } from "react-native";
import { Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: Spacing.lg,
    marginTop: Spacing.xl,
    letterSpacing: -0.5,
  },
  menuContainer: {
    borderRadius: 24,
    padding: Spacing.xs,
    boxShadow: "0 4 20 rgba(0, 0, 0, 0.05)",
    elevation: 2,
    overflow: "hidden",
    borderWidth: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
      } as any,
    }),
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  menuItemDivider: {
    height: 1,
    marginHorizontal: 16,
    opacity: 0.1,
  },
});
