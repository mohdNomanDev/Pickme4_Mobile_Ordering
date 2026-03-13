import { StyleSheet, Platform } from "react-native";
import { Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.xl,
  },
  heading: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: Spacing.lg,
    letterSpacing: -0.3,
  },
  addressList: {
    gap: Spacing.md,
  },
  addressItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: 20,
    borderWidth: 1.5,
    boxShadow: "0 4 10 rgba(0, 0, 0, 0.03)",
    elevation: 2,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
      } as any,
    }),
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.lg,
  },
  addressInfo: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  details: {
    fontSize: 13,
    fontWeight: "500",
  },
});
