import { View } from "react-native";
import { Pickme4Logo } from "./Pickme4Logo";
import { Address } from "./Address";
import { SearchBar } from "./SearchBar";
import { styles } from "../styles/navbarStyles/Navbar.styles";

export const Navbar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pickme4Logo />
        <Address />
      </View>
      <SearchBar />
    </View>
  );
};
