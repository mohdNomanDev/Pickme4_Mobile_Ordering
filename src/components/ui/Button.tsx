import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from "react-native";
import { useThemeColors } from "../../hooks/useThemeColors";

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  textClassName?: string;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = React.memo(({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  className = "",
  textClassName = "",
  style
}) => {
  const colors = useThemeColors();

  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return { 
          container: `border border-[${colors.primary}] bg-transparent`, 
          text: `text-[${colors.primary}]` 
        };
      case 'secondary':
        return { 
          container: `bg-[${colors.surface}]`, 
          text: `text-[${colors.text}]` 
        };
      case 'ghost':
        return { 
          container: 'bg-transparent', 
          text: `text-[${colors.text}]` 
        };
      default:
        return { 
          container: `bg-[${colors.primary}]`, 
          text: 'text-white' 
        };
    }
  };

  const variantStyles = getVariantStyles();
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      className={`h-12 rounded-xl flex-row items-center justify-center px-6 ${variantStyles.container} ${isDisabled ? 'opacity-50' : ''} ${className}`}
      style={style}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : colors.primary} />
      ) : (
        <Text className={`text-base font-bold text-center ${variantStyles.text} ${textClassName}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
});

Button.displayName = "Button";
