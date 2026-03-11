import React, { useState } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DetectLocation } from "./DetectLocation";
import { AddAddress } from "./AddAddress";
import { SavedAddress } from "./SavedAddress";
import { styles } from "../../styles/navbarStyles/Address.styles";
import { useThemeColors } from "../../hooks/useThemeColors";

export const Address = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const colors = useThemeColors();

  return (
    <View>
      <Pressable 
        style={({ pressed }) => [
          styles.container,
          { opacity: pressed ? 0.8 : 1, backgroundColor: colors.primaryLight }
        ]} 
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="location" size={18} color={colors.primary} />
        <View style={styles.addressContent}>
          <Text style={[styles.label, { color: colors.primary }]}>Deliver to</Text>
          <Text style={[styles.addressText, { color: colors.text }]} numberOfLines={1}>
            Select Address
          </Text>
        </View>
        <Ionicons name="chevron-down" size={14} color={colors.primary} />
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          style={[styles.modalOverlay, { backgroundColor: colors.overlay }]} 
          onPress={() => setModalVisible(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>Choose Location</Text>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color={colors.text} />
                </Pressable>
              </View>
              
              <View style={styles.modalBody}>
                <DetectLocation />
                <AddAddress />
                <SavedAddress />
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};
