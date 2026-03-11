import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    backgroundColor: Colors.background,
    borderRadius: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: Spacing.xl,
    alignSelf: "flex-start",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
    boxShadow: "0 4 10 rgba(0, 0, 0, 0.1)",
    elevation: 4,
    borderWidth: 3,
    borderColor: Colors.background,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  infoContainer: {
    alignItems: "center",
    gap: Spacing.xs,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  subText: {
    fontSize: 14,
    color: Colors.textLight,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    width: "100%",
    marginVertical: Spacing.lg,
    opacity: 0.5,
  },
});
