import { StyleSheet, Platform } from "react-native";
import { Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderRadius: 20,
    maxWidth: 220,
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      } as any,
    }),
  },
  addressContent: {
    flexDirection: "column",
    marginHorizontal: Spacing.sm,
  },
  label: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  addressText: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: Spacing.xxl,
    paddingBottom: 40,
    minHeight: '45%',
    boxShadow: "0 -10 20 rgba(0, 0, 0, 0.1)",
    elevation: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  modalBody: {
    gap: Spacing.lg,
  },
});
