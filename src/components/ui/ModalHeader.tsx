import React from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../../hooks/useThemeColors";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  iconName?: keyof typeof Ionicons.glyphMap;
  containerStyle?: ViewStyle;
}

/**
 * A reusable Modal Header designed with UI/UX best practices.
 * Uses NativeWind for styling as requested.
 */
export const ModalHeader: React.FC<ModalHeaderProps> = React.memo(({ 
  title, 
  onClose, 
  showBack = false,
  rightElement,
  iconName,
  containerStyle
}) => {
  const colors = useThemeColors();

  return (
    <View 
      className="flex-row items-center justify-between px-4 py-3 border-b"
      style={[{ borderBottomColor: colors.border }, containerStyle]}
    >
      <View className="flex-row items-center flex-1">
        <TouchableOpacity 
          onPress={onClose} 
          className="w-9 h-9 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: colors.surface }}
          activeOpacity={0.7}
        >
          <Ionicons 
            name={showBack ? "chevron-back" : (iconName || "close")} 
            size={24} 
            color={colors.text} 
          />
        </TouchableOpacity>
        
        <Text 
          className="text-lg font-bold tracking-tighter"
          style={{ color: colors.text }}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      {rightElement && (
        <View className="flex-row items-center">
          {rightElement}
        </View>
      )}
    </View>
  );
});

ModalHeader.displayName = "ModalHeader";
