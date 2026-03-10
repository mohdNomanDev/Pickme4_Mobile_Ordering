import { View, StyleSheet } from "react-native";
import { Pickme4Logo } from "./Pickme4Logo";

export const Navbar = () => {
  return (
    <View style={styles.container}>
      <Pickme4Logo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 60,
  },
});
