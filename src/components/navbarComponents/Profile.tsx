import { Ionicons } from "@expo/vector-icons";
import React, { useState, useCallback } from "react";
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

export const Profile: React.FC<ProfileProps> = React.memo(({ imageUri }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const colors = useThemeColors();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.9, { damping: 12 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 12 });
  }, [scale]);

  const openModal = useCallback(() => setModalVisible(true), []);
  const closeModal = useCallback(() => setModalVisible(false), []);

  return (
    <View>
      <AnimatedPressable 
        style={[
          styles.container, 
          animatedStyle,
          { backgroundColor: colors.surface, borderColor: colors.border }
        ]} 
        onPress={openModal}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
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
        onRequestClose={closeModal}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <TouchableOpacity onPress={closeModal} activeOpacity={0.7}>
              <Ionicons name="close-outline" size={32} color={colors.text} />
            </TouchableOpacity>
          </View>
          <ProfileView />
        </SafeAreaView>
      </Modal>
    </View>
  );
});
