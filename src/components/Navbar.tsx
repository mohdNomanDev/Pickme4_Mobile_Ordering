import { View } from "react-native";
import { Pickme4Logo } from "./Pickme4Logo";
import { Address } from "./Address";
import { styles } from "../styles/navbarStyles/Navbar.styles";

export const Navbar = () => {
  return (
    <View style={styles.container}>
      <Pickme4Logo />
      <Address />
    </View>
  );
};
