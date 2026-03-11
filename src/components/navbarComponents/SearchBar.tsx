import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { searchBarStyles } from "../../styles/navbarStyles/SearchBar.styles";
import { useThemeColors } from "../../hooks/useThemeColors";

interface SearchBarProps {
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search food, grocery, etc...",
}) => {
  const router = useRouter();
  const colors = useThemeColors();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "100%",
      }}
    >
      <View style={searchBarStyles.container}>
        <TouchableOpacity
          style={[searchBarStyles.searchBox, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}
          activeOpacity={0.8}
          onPress={() => router.push("/(modals)/search")}
        >
          <Ionicons
            name="search"
            size={20}
            color={colors.primary}
            style={searchBarStyles.icon}
          />
          <Text style={[searchBarStyles.input, { color: colors.text }]}>{placeholder}</Text>
          <Ionicons name="mic-outline" size={20} color={colors.textLight} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[searchBarStyles.filterButton, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Ionicons name="options-outline" size={20} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

