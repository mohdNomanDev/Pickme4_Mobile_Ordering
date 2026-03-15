import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../../hooks/useThemeColors";

interface ProfileImageEditProps {
  imageUri?: string;
  onPress: () => void;
  size?: number;
}

export const ProfileImageEdit: React.FC<ProfileImageEditProps> = React.memo(({
  imageUri,
  onPress,
  size = 120
}) => {
  const colors = useThemeColors();

  return (
    <View className="items-center justify-center my-6">
      <TouchableOpacity 
        onPress={onPress}
        activeOpacity={0.8}
        className="relative shadow-lg"
        style={{ width: size, height: size }}
      >
        <View 
          className="rounded-full overflow-hidden border-4" 
          style={{ width: size, height: size, borderColor: colors.border }}
        >
          {imageUri ? (
            <Image 
              source={{ uri: imageUri }} 
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View 
              className="w-full h-full items-center justify-center"
              style={{ backgroundColor: colors.surface }}
            >
              <Ionicons name="person" size={size * 0.5} color={colors.textLight} />
            </View>
          )}
        </View>
        
        {/* Camera Icon Overlay */}
        <View 
          className="absolute bottom-0 right-0 w-10 h-10 rounded-full border-2 items-center justify-center shadow-md"
          style={{ backgroundColor: colors.primary, borderColor: colors.background }}
        >
          <Ionicons name="camera" size={20} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
});

ProfileImageEdit.displayName = "ProfileImageEdit";
