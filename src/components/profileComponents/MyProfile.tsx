import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../theme/theme";
import { styles } from "../../styles/profileStyles/MyProfile.styles";

interface MyProfileProps {
  name?: string;
  email?: string;
  phoneNumber?: string;
  imageUri?: string;
}

export const MyProfile: React.FC<MyProfileProps> = ({
  name = "Noman",
  email = "mohdnoman@example.com",
  phoneNumber = "+91 9876543210",
  imageUri,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Profile</Text>

      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
        ) : (
          <Ionicons name="person" size={50} color={Colors.textLight} />
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        
        <View style={styles.contactInfo}>
          <Ionicons name="mail-outline" size={16} color={Colors.textLight} />
          <Text style={styles.subText}>{email}</Text>
        </View>

        <View style={styles.contactInfo}>
          <Ionicons name="call-outline" size={16} color={Colors.textLight} />
          <Text style={styles.subText}>{phoneNumber}</Text>
        </View>
      </View>

      <View style={styles.divider} />
    </View>
  );
};
