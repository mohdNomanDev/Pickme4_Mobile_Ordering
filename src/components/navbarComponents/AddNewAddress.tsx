import React, { useState } from 'react';
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
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../../hooks/useThemeColors';
import { ThemeColors } from '../../theme/theme';
import { styles } from '../../styles/navbarStyles/AddNewAddress.styles';

// --- Types ---
interface AddressForm {
  label: string;
  buildingNumber: string;
  streetName: string;
  district: string;
  city: string;
  region: string;
  postalCode: string;
  secondaryNumber: string;
  deliveryInstructions: string;
  isDefault: boolean;
}

interface AnimatedButtonProps {
  onPress: () => void;
  title: string;
  theme: ThemeColors;
  isPrimary?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
}

interface InputFieldProps extends TextInputProps {
  label: string;
  theme: ThemeColors;
  halfWidth?: boolean;
  error?: string;
  style?: TextStyle;
}

// --- Reusable Animated Button ---
const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  onPress, 
  title, 
  theme, 
  isPrimary = true,
  icon 
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
          },
        ]}
      >
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
  style,
  ...props 
}) => {
  const isFocused = useSharedValue(0);

  const borderAnimatedStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(
      error ? '#EF4444' : (isFocused.value ? theme.primary : theme.border), 
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
      {error && (
        <Text style={{ color: '#EF4444', fontSize: 10, marginTop: 4, fontWeight: '600' }}>
          {error}
        </Text>
      )}
    </View>
  );
};

// --- Main Form Component ---
export default function AddAddressForm() {
  const theme = useThemeColors();
  const router = useRouter();
  const [errors, setErrors] = useState<Partial<Record<keyof AddressForm, string>>>({});
  
  const [form, setForm] = useState<AddressForm>({
    label: 'Home',
    buildingNumber: '',
    streetName: '',
    district: '',
    city: '',
    region: '',
    postalCode: '',
    secondaryNumber: '',
    deliveryInstructions: '',
    isDefault: false,
  });

  const updateForm = (key: keyof AddressForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof AddressForm, string>> = {};
    const requiredFields: (keyof AddressForm)[] = [
      'buildingNumber', 
      'streetName', 
      'district', 
      'city', 
      'postalCode', 
      'region'
    ];

    requiredFields.forEach(field => {
      if (!form[field]) {
        newErrors[field] = 'Required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      console.log('Saving address data:', form);
      // Simulate successful save and go back
      router.back();
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
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
          value={form.label} 
          onChangeText={(t) => updateForm('label', t)} 
          placeholder="e.g. Home"
        />
        
        <View style={styles.row}>
          <InputField 
            label="BUILDING NUMBER *" 
            theme={theme} 
            halfWidth 
            value={form.buildingNumber} 
            onChangeText={(t) => updateForm('buildingNumber', t)} 
            keyboardType="numeric" 
            placeholder="e.g. 4921"
            error={errors.buildingNumber}
          />
          <InputField 
            label="STREET NAME *" 
            theme={theme} 
            halfWidth 
            value={form.streetName} 
            onChangeText={(t) => updateForm('streetName', t)} 
            placeholder="e.g. Al Tharthar Rd"
            error={errors.streetName}
          />
        </View>

        <View style={styles.row}>
          <InputField 
            label="DISTRICT *" 
            theme={theme} 
            halfWidth 
            value={form.district} 
            onChangeText={(t) => updateForm('district', t)} 
            placeholder="e.g. Al Zahra"
            error={errors.district}
          />
          <InputField 
            label="CITY *" 
            theme={theme} 
            halfWidth 
            value={form.city} 
            onChangeText={(t) => updateForm('city', t)} 
            placeholder="e.g. Riyadh"
            error={errors.city}
          />
        </View>

        <View style={styles.row}>
          <InputField 
            label="POSTAL CODE *" 
            theme={theme} 
            halfWidth 
            value={form.postalCode} 
            onChangeText={(t) => updateForm('postalCode', t)} 
            keyboardType="numeric" 
            placeholder="e.g. 12345"
            error={errors.postalCode}
          />
          <InputField 
            label="REGION *" 
            theme={theme} 
            halfWidth 
            value={form.region} 
            onChangeText={(t) => updateForm('region', t)} 
            placeholder="e.g. Central"
            error={errors.region}
          />
        </View>

        <InputField 
          label="DELIVERY INSTRUCTIONS" 
          theme={theme} 
          value={form.deliveryInstructions} 
          onChangeText={(t) => updateForm('deliveryInstructions', t)} 
          multiline 
          numberOfLines={3} 
          style={{ height: 80, textAlignVertical: 'top' }} 
          placeholder="e.g. Near the mosque"
        />

        <View style={[styles.switchContainer, { borderTopColor: theme.border }]}>
          <Text style={[styles.switchLabel, { color: theme.text }]}>Set as default address</Text>
          <Switch
            value={form.isDefault}
            onValueChange={(v) => updateForm('isDefault', v)}
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
              title="SAVE ADDRESS" 
              theme={theme} 
              isPrimary={true} 
              onPress={handleSave} 
              icon="save-outline"
            />
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}
