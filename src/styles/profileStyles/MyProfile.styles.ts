import { StyleSheet, Platform } from "react-native";
import { Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.xl,
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "900",
    marginBottom: Spacing.xl,
    alignSelf: "flex-start",
    letterSpacing: -1,
  },
  imageContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    marginBottom: Spacing.lg,
    boxShadow: "0 8 25 rgba(0, 0, 0, 0.1)",
    elevation: 10,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 55,
  },
  infoContainer: {
    alignItems: "center",
    width: "100%",
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: Spacing.xs,
    letterSpacing: -0.5,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    fontWeight: "500",
  },
  divider: {
    width: "100%",
    height: 1,
    marginTop: Spacing.xxl,
    opacity: 0.1,
  },
});
