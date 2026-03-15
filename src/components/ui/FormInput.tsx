import React from "react";
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from "react-native";
import { useThemeColors } from "../../hooks/useThemeColors";

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  touched?: boolean;
  actionTitle?: string;
  onActionPress?: () => void;
  containerClassName?: string;
  inputClassName?: string;
}

export const FormInput: React.FC<FormInputProps> = React.memo(({
  label,
  error,
  touched,
  actionTitle,
  onActionPress,
  containerClassName = "",
  inputClassName = "",
  ...props
}) => {
  const colors = useThemeColors();
  const showError = error && touched;

  return (
    <View className={`mb-5 ${containerClassName}`}>
      <Text className="text-sm font-semibold mb-2" style={{ color: colors.textLight }}>
        {label}
      </Text>
      
      <View className="flex-row items-center h-12 rounded-xl px-4 border" 
            style={{ 
              backgroundColor: colors.surface, 
              borderColor: showError ? colors.primary : colors.border 
            }}>
        <TextInput
          className={`flex-1 text-base font-medium h-full ${inputClassName}`}
          style={{ color: colors.text }}
          placeholderTextColor={colors.textLight}
          {...props}
        />
        
        {actionTitle && onActionPress && (
          <TouchableOpacity 
            onPress={onActionPress}
            activeOpacity={0.7}
            className="ml-2"
          >
            <Text className="text-sm font-bold" style={{ color: colors.primary }}>
              {actionTitle}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {showError && (
        <Text className="text-xs mt-1 font-medium" style={{ color: colors.primary }}>
          {error}
        </Text>
      )}
    </View>
  );
});

FormInput.displayName = "FormInput";
