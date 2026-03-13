import { StyleSheet, Platform } from "react-native";
import { Spacing } from "../../theme/theme";

export const searchBarStyles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  container: {
    flex: 1,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 28, // rounder pill shape
    paddingHorizontal: Spacing.lg,
    height: 54, // slightly taller
    borderWidth: 1.5,
    boxShadow: "0 4 10 rgba(0, 0, 0, 0.05)",
    elevation: 3,
    ...Platform.select({
      web: {
        cursor: 'text',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
      } as any,
    }),
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: Spacing.sm,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      } as any,
    }),
  },
  icon: {
    marginRight: 4,
  },
  filterButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4 10 rgba(0, 0, 0, 0.05)",
    elevation: 3,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'transform 0.2s ease, background-color 0.2s ease',
      } as any,
    }),
  }
});
