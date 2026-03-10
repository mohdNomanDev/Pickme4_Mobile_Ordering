import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.lg,
  },
  heading: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  addressList: {
    gap: Spacing.sm,
  },
  addressItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  addressInfo: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 2,
  },
  details: {
    fontSize: 12,
    color: Colors.textLight,
  },
});
