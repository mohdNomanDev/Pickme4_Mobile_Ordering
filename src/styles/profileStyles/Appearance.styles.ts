import { StyleSheet, Platform } from "react-native";
import { Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
    gap: 6,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      } as any,
    }),
  },
  optionText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
