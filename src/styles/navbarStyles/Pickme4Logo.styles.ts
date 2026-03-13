import { StyleSheet, Platform } from "react-native";
import { Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 18,
    marginRight: Spacing.sm,
    boxShadow: "0 6 10 rgba(255, 107, 107, 0.4)",
    elevation: 8,
  },
  textContainer: {
    justifyContent: "center",
  },
  brandText: {
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: -1,
    ...Platform.select({
      web: {
        textShadow: '0px 2px 10px rgba(0,0,0,0.1)',
      } as any,
    }),
  },
  numberHighlight: {
    fontWeight: "900",
  },
});
