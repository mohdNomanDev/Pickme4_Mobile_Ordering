import React, { useState } from "react";
import { View, Text, Modal, Pressable, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { BlurView } from "expo-blur";
import { DetectLocation } from "./DetectLocation";
import { AddAddress } from "./AddAddress";
import { SavedAddress } from "./SavedAddress";
import { styles } from "../../styles/navbarStyles/Address.styles";
import { useThemeColors } from "../../hooks/useThemeColors";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Address = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const colors = useThemeColors();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  const isDark = colors.background === "#1A202C";

  return (
    <View>
      <AnimatedPressable 
        style={[
          styles.container,
          animatedStyle,
          { backgroundColor: colors.surface }
        ]} 
        onPress={() => setModalVisible(true)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Ionicons name="location" size={20} color={colors.primary} />
        <View style={styles.addressContent}>
          <Text style={[styles.label, { color: colors.primary }]}>Deliver to</Text>
          <Text style={[styles.addressText, { color: colors.text }]} numberOfLines={1}>
            Select Address
          </Text>
        </View>
        <Ionicons name="chevron-down" size={16} color={colors.primary} />
      </AnimatedPressable>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setModalVisible(false)}
        >
          <BlurView 
            intensity={40} 
            tint={isDark ? "dark" : "light"} 
            style={styles.blurOverlay} 
          />
          <Pressable onPress={(e) => e.stopPropagation()}>
            <Animated.View 
              entering={FadeInUp.springify().damping(20)}
              exiting={FadeOutDown.springify().damping(20)}
              style={[styles.modalContent, { backgroundColor: colors.background }]}
            >
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>Choose Location</Text>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Ionicons name="close-circle" size={32} color={colors.textLight} />
                </Pressable>
              </View>
              
              <View style={styles.modalBody}>
                <DetectLocation />
                <AddAddress onPress={() => setModalVisible(false)} />
                <SavedAddress />
              </View>
            </Animated.View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};
