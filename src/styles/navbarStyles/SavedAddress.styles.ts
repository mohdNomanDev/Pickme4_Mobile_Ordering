import { StyleSheet, Platform } from "react-native";
import { Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.xl,
    paddingHorizontal: Platform.OS === "web" ? Spacing.xl : 0,
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  heading: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  listContainer: {
    flexDirection: Platform.OS === "web" ? "row" : "column",
    flexWrap: Platform.OS === "web" ? "wrap" : "nowrap",
    gap: Spacing.lg,
  },
  cardWrapper: {
    width: (Platform.OS === "web" ? "calc(33.333% - 11px)" : "100%") as any,
    minWidth: Platform.OS === "web" ? 320 : "100%",
  },
  card: {
    flexDirection: "row",
    padding: Spacing.lg,
    borderRadius: 20,
    borderWidth: 1.5,
    overflow: "hidden",
    ...Platform.select({
      web: {
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
      } as any,
    }),
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.lg,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  label: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  shortAddressBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  shortAddressText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  defaultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  defaultText: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  addressText: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    marginBottom: 6,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  instructionsText: {
    fontSize: 13,
    fontWeight: "600",
    fontStyle: "italic",
    flex: 1,
  },
  emptyContainer: {
    padding: Spacing.xxl,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    borderWidth: 2,
    borderStyle: "dashed",
    marginTop: Spacing.md,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  emptySubText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});