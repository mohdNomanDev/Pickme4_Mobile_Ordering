import React from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "../../styles/profileStyles/Profile.styles";
import { MyProfile } from "./MyProfile";

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
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <MyProfile />

      <Text style={styles.sectionTitle}>Subscription & Rewards</Text>
      <MySubscription />
      <CouponsOffers />

      <Text style={styles.sectionTitle}>Account & Payments</Text>
      <PaymentMethods />

      <Text style={styles.sectionTitle}>Preferences</Text>
      <Appearance />
      <Settings />

      <Text style={styles.sectionTitle}>Feedback & Support</Text>
      <YourFeedback />
      <SendFeedback />

      <Text style={styles.sectionTitle}>App Info</Text>
      <About />

      <View style={{ marginTop: 20 }}>
        <Logout />
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};
