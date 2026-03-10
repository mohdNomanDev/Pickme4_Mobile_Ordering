import React, { useState } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DetectLocation } from "./DetectLocation";
import { AddAddress } from "./AddAddress";
import { SavedAddress } from "./SavedAddress";
import { Colors } from "../theme/theme";
import { styles } from "../styles/navbarStyles/Address.styles";

export const Address = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Pressable 
        style={({ pressed }) => [
          styles.container,
          { opacity: pressed ? 0.7 : 1 }
        ]} 
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="location-sharp" size={18} color={Colors.primary} />
        <Text style={styles.addressText} numberOfLines={1}>
          Select Address
        </Text>
        <Ionicons name="chevron-down" size={14} color={Colors.textLight} />
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setModalVisible(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Choose Location</Text>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color={Colors.text} />
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
