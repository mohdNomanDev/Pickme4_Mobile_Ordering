import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme/theme";

export const searchBarStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Spacing.xs,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 25,
    paddingHorizontal: Spacing.lg,
    height: 48,
    borderWidth: 1,
    borderBottomColor: Colors.border,
    borderColor: 'transparent',
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  icon: {
    marginRight: 0,
  },
  filterButton: {
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  }
});
