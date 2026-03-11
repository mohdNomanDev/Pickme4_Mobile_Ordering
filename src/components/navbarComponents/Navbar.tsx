import { View } from "react-native";
import { styles } from "../../styles/navbarStyles/Navbar.styles";
import { Address } from "./Address";
import { Pickme4Logo } from "./Pickme4Logo";
import { SearchBar } from "./SearchBar";
import { Profile } from "./Profile";
import { useThemeColors } from "../../hooks/useThemeColors";

export const Navbar = () => {
  const colors = useThemeColors();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      <View style={styles.topRow}>
        <Pickme4Logo />
        <Address />
        <Profile />
      </View>
      <SearchBar />
    </View>
  );
};
