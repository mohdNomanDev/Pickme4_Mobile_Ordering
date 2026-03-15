import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState, useCallback } from "react";
import { TextInput, View, Pressable, Platform } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { searchBarStyles } from "../../styles/navbarStyles/SearchBar.styles";
import { useThemeColors } from "../../hooks/useThemeColors";

interface SearchBarProps {
  placeholder?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const SearchBar: React.FC<SearchBarProps> = React.memo(({
  placeholder = "Search food, grocery, etc...",
}) => {
  const router = useRouter();
  const colors = useThemeColors();
  const filterScale = useSharedValue(1);
  const [isFocused, setIsFocused] = useState(false);

  const filterAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: filterScale.value }],
    };
  });

  const handlePressIn = useCallback(() => {
    filterScale.value = withSpring(0.9, { damping: 12 });
  }, [filterScale]);

  const handlePressOut = useCallback(() => {
    filterScale.value = withSpring(1, { damping: 12 });
  }, [filterScale]);

  const navigateToSearch = useCallback(() => {
    router.push("/(modals)/search");
  }, [router]);

  return (
    <View style={searchBarStyles.wrapper}>
      <View style={searchBarStyles.container}>
        <Pressable
          style={[
            searchBarStyles.searchBox, 
            { 
              backgroundColor: colors.surface, 
              borderColor: isFocused ? colors.primary : colors.border 
            }
          ]}
          onPress={navigateToSearch}
        >
          <Ionicons
            name="search"
            size={22}
            color={isFocused ? colors.primary : colors.textLight}
            style={searchBarStyles.icon}
          />
          <TextInput
            style={[searchBarStyles.input, { color: colors.text }]}
            placeholder={placeholder}
            placeholderTextColor={colors.textLight}
            editable={false} // Disable input as it acts as a button to open modal
            pointerEvents="none"
          />
          <View style={{ padding: 6, backgroundColor: colors.background, borderRadius: 20, marginLeft: 8 }}>
            <Ionicons name="mic" size={18} color={colors.primary} />
          </View>
        </Pressable>
      </View>
      <AnimatedPressable 
        style={[
          searchBarStyles.filterButton, 
          filterAnimatedStyle,
          { backgroundColor: colors.surface, borderColor: colors.border }
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Ionicons name="options" size={24} color={colors.text} />
      </AnimatedPressable>
    </View>
  );
});
