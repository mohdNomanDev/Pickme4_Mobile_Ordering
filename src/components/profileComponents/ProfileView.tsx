import React from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "../../styles/profileStyles/Profile.styles";
import { MyProfile } from "./MyProfile";
import { useThemeColors } from "../../hooks/useThemeColors";

// Import new components
import { About } from "./About";
import { Appearance } from "./Appearance";
import { CouponsOffers } from "./CouponsOffers";
import { Logout } from "./Logout";
import { MySubscription } from "./MySubscription";
import { PaymentMethods } from "./PaymentMethods";
import { SendFeedback } from "./SendFeedback";
import { Settings } from "./Settings";
import { YourFeedback } from "./YourFeedback";

export const ProfileView = () => {
  const colors = useThemeColors();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      showsVerticalScrollIndicator={false}
    >
      <MyProfile />

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Subscription & Rewards</Text>
      <MySubscription />
      <CouponsOffers />

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Account & Payments</Text>
      <PaymentMethods />

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
      <Appearance />
      <Settings />

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Feedback & Support</Text>
      <YourFeedback />
      <SendFeedback />

      <Text style={[styles.sectionTitle, { color: colors.text }]}>App Info</Text>
      <About />

      <View style={{ marginTop: 20 }}>
        <Logout />
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};
