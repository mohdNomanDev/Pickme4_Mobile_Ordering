import { TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/navbarStyles/Navbar.styles";
import { Colors } from "../../theme/theme";
import { Address } from "./Address";
import { Pickme4Logo } from "./Pickme4Logo";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pickme4Logo />
        <Address />
        <TouchableOpacity
          style={{
            padding: 8,
            backgroundColor: Colors.surface,
            borderRadius: 12,
          }}
        ></TouchableOpacity>
      </View>
      <SearchBar />
    </View>
  );
};
