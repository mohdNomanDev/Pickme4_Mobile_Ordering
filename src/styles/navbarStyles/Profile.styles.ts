import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    boxShadow: "0 4 6 rgba(0, 0, 0, 0.1)",
    elevation: 4,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      } as any,
    }),
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
  },
  modalHeader: {
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 16,
    borderBottomWidth: 1,
  }
});
