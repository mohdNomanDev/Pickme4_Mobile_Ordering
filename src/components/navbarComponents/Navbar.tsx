import { View, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { styles } from "../../styles/navbarStyles/Navbar.styles";
import { Address } from "./Address";
import { Pickme4Logo } from "./Pickme4Logo";
import { SearchBar } from "./SearchBar";
import { Profile } from "./Profile";
import { useThemeColors } from "../../hooks/useThemeColors";

export const Navbar = () => {
  const colors = useThemeColors();
  const isDark = colors.background === "#1A202C"; // Assuming default dark theme color
  
  return (
    <View style={[styles.container, { backgroundColor: 'transparent' }]}>
      <BlurView 
        intensity={Platform.OS === 'web' ? 70 : 80} 
        tint={isDark ? "dark" : "light"}
        style={[
          styles.blurContainer, 
          { 
            backgroundColor: Platform.OS === 'web' 
              ? (isDark ? 'rgba(26, 32, 44, 0.75)' : 'rgba(255, 255, 255, 0.85)')
              : (isDark ? 'rgba(26, 32, 44, 0.5)' : 'rgba(255, 255, 255, 0.5)'),
            borderBottomColor: colors.border
          }
        ]}
      >
        <View style={styles.topRow}>
          <Pickme4Logo />
          <Address />
          <Profile />
        </View>
        <SearchBar />
      </BlurView>
    </View>
  );
};
