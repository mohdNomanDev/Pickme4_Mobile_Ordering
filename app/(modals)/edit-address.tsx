import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
  Switch,
  Pressable,
  TextInputProps,
  TextStyle,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors } from '../../src/hooks/useThemeColors';
import { ThemeColors } from '../../src/theme/theme';
import { styles } from '../../src/styles/navbarStyles/AddNewAddress.styles';
import { useAddressForm, AddressFormValues } from '../../src/hooks/useAddressForm';
import { api } from '../../src/api/apiClient';
import { useAppDispatch } from '../../src/store/store';
import { DeleteAddressBtn } from '../../src/components/profileComponents/DeleteAddressBtn';

// --- Types ---
interface AnimatedButtonProps {
  onPress: () => void;
  title: string;
  theme: ThemeColors;
  isPrimary?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
}

interface InputFieldProps extends TextInputProps {
  label: string;
  theme: ThemeColors;
  halfWidth?: boolean;
  error?: string;
  touched?: boolean;
  style?: TextStyle;
}

// --- Reusable Animated Button ---
const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  onPress, 
  title, 
  theme, 
  isPrimary = true,
  icon,
  loading = false
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      onPressIn={() => (scale.value = withSpring(0.96))}
      onPressOut={() => (scale.value = withSpring(1))}
      // @ts-ignore - Web specific props
      onHoverIn={() => (opacity.value = withTiming(0.85))}
      onHoverOut={() => (opacity.value = withTiming(1))}
    >
      <Animated.View
        style={[
          styles.button,
          animatedStyle,
          {
            backgroundColor: isPrimary ? theme.primary : 'transparent',
            borderColor: isPrimary ? theme.primary : theme.border,
            borderWidth: 1,
            flexDirection: 'row',
            opacity: loading ? 0.7 : 1,
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator size="small" color={isPrimary ? '#FFFFFF' : theme.primary} />
        ) : (
          <>
            {icon && (
              <Ionicons 
                name={icon} 
                size={18} 
                color={isPrimary ? '#FFFFFF' : theme.text} 
                style={{ marginRight: 8 }} 
              />
            )}
            <Text
              style={[
                styles.buttonText,
                { color: isPrimary ? '#FFFFFF' : theme.text },
              ]}
            >
              {title}
            </Text>
          </>
        )}
      </Animated.View>
    </Pressable>
  );
};

// --- Reusable Input Field ---
const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  theme, 
  halfWidth, 
  error, 
  touched,
  style,
  ...props 
}) => {
  const isFocused = useSharedValue(0);
  const showError = touched && error;

  const borderAnimatedStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(
      showError ? '#EF4444' : (isFocused.value ? theme.primary : theme.border), 
      { duration: 300 }
    ),
  }));

  return (
    <View style={[styles.inputContainer, halfWidth && styles.halfWidth]}>
      <Text style={[styles.label, { color: theme.textLight }]}>{label}</Text>
      <Animated.View style={[styles.inputWrapper, borderAnimatedStyle, { backgroundColor: theme.surface }]}>
        <TextInput
          style={[styles.input, { color: theme.text }, style]}
          placeholderTextColor={theme.textLight}
          onFocus={() => (isFocused.value = 1)}
          onBlur={() => (isFocused.value = 0)}
          {...props}
        />
      </Animated.View>
      {showError && (
        <Text style={{ color: '#EF4444', fontSize: 10, marginTop: 4, fontWeight: '600' }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default function EditAddressModal() {
  const theme = useThemeColors();
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  
  // Parse address data from params
  const initialData = useMemo(() => {
    if (params.addressData) {
      try {
        const parsed = JSON.parse(params.addressData as string);
        return {
          label: parsed.label || '',
          shortAddress: parsed.shortAddress || '',
          buildingNumber: parsed.buildingNumber || '',
          streetName: parsed.streetName || '',
          district: parsed.district || '',
          city: parsed.city || '',
          region: parsed.region || '',
          postalCode: parsed.postalCode || '',
          secondaryNumber: parsed.secondaryNumber || '',
          buildingName: parsed.buildingName || '',
          apartmentNumber: parsed.apartmentNumber || '',
          floor: parsed.floor || '',
          landmark: parsed.landmark || '',
          latitude: parsed.location?.coordinates[1] || 0,
          longitude: parsed.location?.coordinates[0] || 0,
          deliveryInstructions: parsed.deliveryInstructions || '',
          isDefault: parsed.isDefault || false,
        };
      } catch (e) {
        console.error("Failed to parse address data", e);
      }
    }
    return undefined;
  }, [params.addressData]);

  const handleUpdate = async (values: AddressFormValues) => {
    try {
      setLoading(true);
      console.log('Updating address:', params.id, values);
      
      const response = await api.post(`/user/address/${params.id}`, values);
      
      if (response && response.addresses) {
        dispatch(setAddresses(response.addresses));
        router.back();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Failed to update address:', error);
      Alert.alert(
        'Update Failed',
        error.data?.message || 'Something went wrong while updating the address.'
      );
    } finally {
      setLoading(false);
    }
  };

  const { formik, handleDelete, isDeleting } = useAddressForm(initialData, handleUpdate, params.id as string);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Header View with Safe Area handling */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: 20, 
        paddingTop: Platform.OS === 'ios' ? insets.top : insets.top + 10,
        paddingBottom: 15,
        backgroundColor: theme.background,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            Edit Address
          </Text>
        </View>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="close-circle" size={32} color={theme.textLight} />
        </Pressable>
      </View>

      <ScrollView 
        style={[styles.container, { backgroundColor: theme.background, marginTop: 0 }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeInDown.delay(100).duration(800).springify()}
          style={styles.formGrid}
        >
          <InputField 
            label="LABEL (e.g., Home, Work)" 
            theme={theme} 
            value={formik.values.label} 
            onChangeText={formik.handleChange('label')} 
            onBlur={formik.handleBlur('label')}
            placeholder="e.g. Home"
            error={formik.errors.label}
            touched={formik.touched.label}
          />
          
          <View style={styles.row}>
            <InputField 
              label="BUILDING NUMBER *" 
              theme={theme} 
              halfWidth 
              value={formik.values.buildingNumber} 
              onChangeText={formik.handleChange('buildingNumber')} 
              onBlur={formik.handleBlur('buildingNumber')}
              keyboardType="numeric" 
              placeholder="e.g. 4921"
              error={formik.errors.buildingNumber}
              touched={formik.touched.buildingNumber}
            />
            <InputField 
              label="STREET NAME *" 
              theme={theme} 
              halfWidth 
              value={formik.values.streetName} 
              onChangeText={formik.handleChange('streetName')} 
              onBlur={formik.handleBlur('streetName')}
              placeholder="e.g. Al Tharthar Rd"
              error={formik.errors.streetName}
              touched={formik.touched.streetName}
            />
          </View>

          <View style={styles.row}>
            <InputField 
              label="DISTRICT *" 
              theme={theme} 
              halfWidth 
              value={formik.values.district} 
              onChangeText={formik.handleChange('district')} 
              onBlur={formik.handleBlur('district')}
              placeholder="e.g. Al Zahra"
              error={formik.errors.district}
              touched={formik.touched.district}
            />
            <InputField 
              label="CITY *" 
              theme={theme} 
              halfWidth 
              value={formik.values.city} 
              onChangeText={formik.handleChange('city')} 
              onBlur={formik.handleBlur('city')}
              placeholder="e.g. Riyadh"
              error={formik.errors.city}
              touched={formik.touched.city}
            />
          </View>

          <View style={styles.row}>
            <InputField 
              label="POSTAL CODE *" 
              theme={theme} 
              halfWidth 
              value={formik.values.postalCode} 
              onChangeText={formik.handleChange('postalCode')} 
              onBlur={formik.handleBlur('postalCode')}
              keyboardType="numeric" 
              placeholder="e.g. 12345"
              error={formik.errors.postalCode}
              touched={formik.touched.postalCode}
            />
            <InputField 
              label="REGION *" 
              theme={theme} 
              halfWidth 
              value={formik.values.region} 
              onChangeText={formik.handleChange('region')} 
              onBlur={formik.handleBlur('region')}
              placeholder="e.g. Central"
              error={formik.errors.region}
              touched={formik.touched.region}
            />
          </View>

          <InputField 
            label="DELIVERY INSTRUCTIONS" 
            theme={theme} 
            value={formik.values.deliveryInstructions} 
            onChangeText={formik.handleChange('deliveryInstructions')} 
            onBlur={formik.handleBlur('deliveryInstructions')}
            multiline 
            numberOfLines={3} 
            style={{ height: 80, textAlignVertical: 'top' }} 
            placeholder="e.g. Near the mosque"
            error={formik.errors.deliveryInstructions}
            touched={formik.touched.deliveryInstructions}
          />

          <View style={[styles.switchContainer, { borderTopColor: theme.border }]}>
            <Text style={[styles.switchLabel, { color: theme.text }]}>Set as default address</Text>
            <Switch
              value={formik.values.isDefault}
              onValueChange={(v) => formik.setFieldValue('isDefault', v)}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={'#FFFFFF'}
            />
          </View>

          <View style={styles.actionRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <AnimatedButton 
                title="CANCEL" 
                theme={theme} 
                isPrimary={false} 
                onPress={() => router.back()} 
              />
            </View>
            <View style={{ flex: 2, marginLeft: 8 }}>
              <AnimatedButton 
                title="UPDATE ADDRESS" 
                theme={theme} 
                isPrimary={true} 
                onPress={formik.handleSubmit} 
                icon="save-outline"
                loading={loading}
              />
            </View>
          </View>

          {/* 
            Premium Destructive Action Section
            Visually separated from the primary actions to prevent accidental taps.
          */}
          <View className="mt-12 pb-10 items-center">
            <View 
              style={{ backgroundColor: theme.border }} 
              className="w-full h-[1px] mb-10 opacity-40" 
            />
            
            <DeleteAddressBtn 
              onPress={handleDelete}
              isLoading={isDeleting}
            />

            <Text 
              className="mt-5 text-[10px] font-bold uppercase tracking-[2px] opacity-30 text-center"
              style={{ color: theme.text }}
            >
              This action cannot be undone
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
