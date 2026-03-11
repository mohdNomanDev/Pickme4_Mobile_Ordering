import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: 12,
    marginVertical: Spacing.xs,
  },
  text: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: Spacing.md,
    fontWeight: '500',
  },
});
