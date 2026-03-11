import { StyleSheet } from "react-native";
import { Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    borderRadius: 12,
    marginVertical: Spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  text: {
    fontSize: 16,
    marginLeft: Spacing.md,
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    gap: Spacing.xs,
  },
  optionText: {
    fontSize: 13,
    fontWeight: '500',
  },
});
