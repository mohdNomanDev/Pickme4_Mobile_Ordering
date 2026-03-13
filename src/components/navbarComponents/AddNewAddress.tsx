import React from 'react';
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
import { useAddressForm } from '../../hooks/useAddressForm';

// --- Types ---
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
  touched?: boolean;
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

// --- Main Form Component ---
export default function AddAddressForm() {
  const theme = useThemeColors();
  const router = useRouter();
  const formik = useAddressForm();

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
              title="SAVE ADDRESS" 
              theme={theme} 
              isPrimary={true} 
              onPress={formik.handleSubmit} 
              icon="save-outline"
            />
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}
