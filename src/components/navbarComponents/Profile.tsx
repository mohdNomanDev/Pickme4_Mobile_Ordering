import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, TouchableOpacity, Modal, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/navbarStyles/Profile.styles";
import { ProfileView } from "../profileComponents/ProfileView";
import { useThemeColors } from "../../hooks/useThemeColors";

interface ProfileProps {
  imageUri?: string;
}

export const Profile: React.FC<ProfileProps> = ({ imageUri }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const colors = useThemeColors();

  return (
    <View>
      <TouchableOpacity 
        style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]} 
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Ionicons name="person" size={20} color={colors.text} />
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            paddingHorizontal: 16, 
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: colors.border
          }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={28} color={colors.text} />
            </TouchableOpacity>
          </View>
          <ProfileView />
        </SafeAreaView>
      </Modal>
    </View>
  );
};
