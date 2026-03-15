import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, Modal, Pressable, Platform, useWindowDimensions, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  FadeInUp, 
  FadeOutDown,
  runOnJS,
  interpolate
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { BlurView } from "expo-blur";
import { DetectLocation } from "./DetectLocation";
import { AddAddress } from "./AddAddress";
import { SavedAddress } from "./SavedAddress";
import { styles } from "../../styles/navbarStyles/Address.styles";
import { useThemeColors } from "../../hooks/useThemeColors";
import { Spacing } from "../../theme/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Address = React.memo(() => {
  const [modalVisible, setModalVisible] = useState(false);
  const colors = useThemeColors();
  const { width, height: screenHeight } = useWindowDimensions();
  const scale = useSharedValue(1);

  // Height adjustment values
  const MIN_HEIGHT = screenHeight * 0.4;
  const MAX_HEIGHT = screenHeight * 0.95;
  const INITIAL_HEIGHT = screenHeight * 0.55;
  const sheetHeight = useSharedValue(INITIAL_HEIGHT);
  const context = useSharedValue(0);

  useEffect(() => {
    if (modalVisible) {
      sheetHeight.value = withSpring(INITIAL_HEIGHT, { damping: 20 });
    }
  }, [modalVisible, INITIAL_HEIGHT, sheetHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const modalContentStyle = useAnimatedStyle(() => ({
    height: sheetHeight.value,
    backgroundColor: colors.background,
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 200 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
  }, [scale]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  const panGesture = useMemo(() => Gesture.Pan()
    .onStart(() => {
      context.value = sheetHeight.value;
    })
    .onUpdate((event) => {
      let newHeight = context.value - event.translationY;
      if (newHeight < MIN_HEIGHT) {
        newHeight = MIN_HEIGHT - (MIN_HEIGHT - newHeight) * 0.5;
      } else if (newHeight > MAX_HEIGHT) {
        newHeight = MAX_HEIGHT + (newHeight - MAX_HEIGHT) * 0.3;
      }
      sheetHeight.value = newHeight;
    })
    .onEnd((event) => {
      if (sheetHeight.value < MIN_HEIGHT + 30 || event.velocityY > 1500) {
        runOnJS(closeModal)();
      } else if (sheetHeight.value > MAX_HEIGHT - 50) {
        sheetHeight.value = withSpring(MAX_HEIGHT);
      } else {
        sheetHeight.value = withSpring(sheetHeight.value);
      }
    }), [context, sheetHeight, MIN_HEIGHT, MAX_HEIGHT, closeModal]);

  const isDark = colors.background === "#1A202C";

  const containerStyle = useMemo(() => [
    styles.container,
    animatedStyle,
    { backgroundColor: colors.surface }
  ], [animatedStyle, colors.surface]);

  return (
    <View>
      <AnimatedPressable 
        style={containerStyle} 
        onPress={openModal}
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
        onRequestClose={closeModal}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Pressable 
            style={styles.modalOverlay} 
            onPress={closeModal}
          >
            <BlurView 
              intensity={40} 
              tint={isDark ? "dark" : "light"} 
              style={styles.blurOverlay} 
            />
            <Pressable onPress={stopPropagation}>
              <Animated.View 
                entering={FadeInUp.springify().damping(20)}
                exiting={FadeOutDown.springify().damping(20)}
                style={[styles.modalContent, modalContentStyle]}
              >
                {/* Height Adjustable Handle */}
                <GestureDetector gesture={panGesture}>
                  <View style={localStyles.dragHandleArea}>
                    <View style={[localStyles.dragHandle, { backgroundColor: colors.textLight }]} />
                  </View>
                </GestureDetector>

                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: colors.text }]}>Choose Location</Text>
                  <Pressable onPress={closeModal}>
                    <Ionicons name="close-circle" size={32} color={colors.textLight} />
                  </Pressable>
                </View>
                
                <View style={[styles.modalBody, { flex: 1 }]}>
                  <DetectLocation />
                  <AddAddress onPress={closeModal} />
                  <SavedAddress onSelect={closeModal} />
                </View>
              </Animated.View>
            </Pressable>
          </Pressable>
        </GestureHandlerRootView>
      </Modal>
    </View>
  );
});

const localStyles = StyleSheet.create({
  dragHandleArea: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -Spacing.md, // Adjust based on padding
  },
  dragHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    opacity: 0.3,
  },
});
