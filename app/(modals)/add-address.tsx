import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors } from '../../src/hooks/useThemeColors';
import AddAddressForm from '../../src/components/navbarComponents/AddNewAddress';

export default function AddAddressModal() {
  const theme = useThemeColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Custom Header with Safe Area handling */}
      <View style={{ 
        paddingTop: Platform.OS === 'ios' ? insets.top : insets.top + 10,
        paddingHorizontal: 20,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.background,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
      }}>
        <Pressable 
          onPress={() => router.back()}
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
            padding: 5,
          })}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </Pressable>
        <Text style={{ 
          marginLeft: 20, 
          fontSize: 18, 
          fontWeight: '700', 
          color: theme.text,
          letterSpacing: 0.5 
        }}>
          Add New Address
        </Text>
      </View>
      
      <AddAddressForm />
    </View>
  );
}
