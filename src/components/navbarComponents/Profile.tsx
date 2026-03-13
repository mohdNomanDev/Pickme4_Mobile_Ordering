import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, TouchableOpacity, Modal, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { styles } from "../../styles/navbarStyles/Profile.styles";
import { ProfileView } from "../profileComponents/ProfileView";
import { useThemeColors } from "../../hooks/useThemeColors";

interface ProfileProps {
  imageUri?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Profile: React.FC<ProfileProps> = ({ imageUri }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const colors = useThemeColors();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View>
      <AnimatedPressable 
        style={[
          styles.container, 
          animatedStyle,
          { backgroundColor: colors.surface, borderColor: colors.border }
        ]} 
        onPress={() => setModalVisible(true)}
        onPressIn={() => (scale.value = withSpring(0.9, { damping: 12 }))}
        onPressOut={() => (scale.value = withSpring(1, { damping: 12 }))}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Ionicons name="person" size={24} color={colors.text} />
        )}
      </AnimatedPressable>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={0.7}>
              <Ionicons name="close-outline" size={32} color={colors.text} />
            </TouchableOpacity>
          </View>
          <ProfileView />
        </SafeAreaView>
      </Modal>
    </View>
  );
};
