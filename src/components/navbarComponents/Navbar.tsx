import { View } from "react-native";
import { styles } from "../../styles/navbarStyles/Navbar.styles";
import { Address } from "./Address";
import { Pickme4Logo } from "./Pickme4Logo";
import { SearchBar } from "./SearchBar";
import { Profile } from "./Profile";

export const Navbar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pickme4Logo />
        <Address />
        <Profile />
      </View>
      <SearchBar />
    </View>
  );
};
