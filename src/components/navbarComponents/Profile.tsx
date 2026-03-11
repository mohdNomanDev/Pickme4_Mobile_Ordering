import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../../theme/theme";
import { styles } from "../../styles/navbarStyles/Profile.styles";

interface ProfileProps {
  imageUri?: string;
}

export const Profile: React.FC<ProfileProps> = ({ imageUri }) => {
  const router = useRouter();

  const handlePress = () => {
    // Navigate to profile tab or open profile menu
    router.push("/(tabs)/profile");
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.8}
      onPress={handlePress}
    >
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Ionicons name="person" size={20} color={Colors.text} />
      )}
    </TouchableOpacity>
  );
};
