import { View, StyleSheet } from "react-native";
import { Pickme4Logo } from "./Pickme4Logo";
import { Address } from "./Address";

export const Navbar = () => {
  return (
    <View style={styles.container}>
      <Pickme4Logo />
      <Address />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 70,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F6",
  },
});
