import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MyProfile } from "./MyProfile";
import { Colors } from "../../theme/theme";
import { styles } from "../../styles/profileStyles/Profile.styles";

export const ProfileView = () => {
  const MENU_ITEMS = [
    { icon: "cart-outline", label: "My Orders" },
    { icon: "location-outline", label: "My Addresses" },
    { icon: "card-outline", label: "Payment Methods" },
    { icon: "notifications-outline", label: "Notifications" },
    { icon: "help-circle-outline", label: "Help & Support" },
    { icon: "settings-outline", label: "Settings" },
    { icon: "log-out-outline", label: "Logout", color: Colors.primary },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <MyProfile />
      
      <Text style={styles.sectionTitle}>Account</Text>
      
      <View style={styles.menuContainer}>
        {MENU_ITEMS.map((item, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Ionicons 
                  name={item.icon as any} 
                  size={22} 
                  color={item.color || Colors.text} 
                />
                <Text style={[
                  styles.menuItemText,
                  item.color ? { color: item.color } : {}
                ]}>
                  {item.label}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.divider} />
            </TouchableOpacity>
            {index < MENU_ITEMS.length - 1 && <View style={styles.menuItemDivider} />}
          </React.Fragment>
        ))}
      </View>
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};
