import React from "react";
import { 
  View, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView
} from "react-native";
import { useRouter } from "expo-router";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import { ModalHeader } from "../../src/components/ui/ModalHeader";
import { Button } from "../../src/components/ui/Button";
import { FormInput } from "../../src/components/ui/FormInput";
import { ProfileImageEdit } from "../../src/components/profileComponents/ProfileImageEdit";
import { useProfileEdit } from "../../src/hooks/useProfileEdit";

export default function EditProfilePage() {
  const router = useRouter();
  const colors = useThemeColors();
  const { formik, handleVerifyEmail, handleVerifyPhone, handleImagePicker, isLoading } = useProfileEdit();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <ModalHeader 
        title="Edit Profile" 
        onClose={() => router.back()} 
      />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1"
          contentContainerClassName="p-4 pb-10"
          showsVerticalScrollIndicator={false}
        >
          {/* Responsive container for Tablet/Web */}
          <View className="w-full max-w-xl mx-auto">
            
            <ProfileImageEdit 
              imageUri={formik.values.avatar} 
              onPress={handleImagePicker} 
            />

            <FormInput
              label="Full Name"
              placeholder="Enter your name"
              value={formik.values.name}
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              error={formik.errors.name}
              touched={formik.touched.name}
            />

            <FormInput
              label="Email Address"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              error={formik.errors.email}
              touched={formik.touched.email}
              actionTitle="Verify"
              onActionPress={handleVerifyEmail}
            />

            <FormInput
              label="Phone Number"
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={formik.values.phone}
              onChangeText={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
              error={formik.errors.phone}
              touched={formik.touched.phone}
              actionTitle="Verify"
              onActionPress={handleVerifyPhone}
            />

            <View className="mt-6">
              <Button 
                title="Save Changes" 
                onPress={formik.handleSubmit}
                loading={isLoading}
                disabled={!formik.isValid || !formik.dirty}
              />
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
