import React from "react";
import { View, Text, Image, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { Spacing } from "../../theme/theme";
import { styles } from "../../styles/profileStyles/MyProfile.styles";
import { EditBtn } from "./EditBtn";
import { useThemeColors } from "../../hooks/useThemeColors";

interface MyProfileProps {
  name?: string;
  email?: string;
  phoneNumber?: string;
  imageUri?: string;
  onEditPress?: () => void;
}

export const MyProfile: React.FC<MyProfileProps> = ({
  name = "Noman",
  email = "mohdnoman@example.com",
  phoneNumber = "+91 9876543210",
  imageUri,
  onEditPress,
}) => {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>My Profile</Text>

      <Animated.View 
        entering={FadeIn.duration(800)}
        style={[styles.imageContainer, { backgroundColor: colors.surface, borderColor: colors.background }]}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
        ) : (
          <Ionicons name="person" size={50} color={colors.textLight} />
        )}
      </Animated.View>

      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: colors.text }]}>{name}</Text>

        <View style={styles.contactInfo}>
          <Ionicons name="mail" size={16} color={colors.primary} />
          <Text style={[styles.subText, { color: colors.textLight }]}>{email}</Text>
        </View>

        <View style={styles.contactInfo}>
          <Ionicons name="call" size={16} color={colors.primary} />
          <Text style={[styles.subText, { color: colors.textLight }]}>{phoneNumber}</Text>
        </View>

        <View style={{ marginTop: Spacing.lg }}>
          <EditBtn onPress={onEditPress} />
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.divider }]} />
    </View>
  );
};
