import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, TouchableOpacity, Modal, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/navbarStyles/Profile.styles";
import { Colors } from "../../theme/theme";
import { Profile as ProfileView } from "../profileComponents/Profile";

interface ProfileProps {
  imageUri?: string;
}

export const Profile: React.FC<ProfileProps> = ({ imageUri }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity 
        style={styles.container} 
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Ionicons name="person" size={20} color={Colors.text} />
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            paddingHorizontal: 16, 
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: Colors.border
          }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={28} color={Colors.text} />
            </TouchableOpacity>
          </View>
          <ProfileView />
        </SafeAreaView>
      </Modal>
    </View>
  );
};
