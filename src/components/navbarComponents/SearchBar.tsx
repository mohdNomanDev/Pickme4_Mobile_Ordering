import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { searchBarStyles } from "../../styles/navbarStyles/SearchBar.styles";
import { Colors } from "../../theme/theme";

interface SearchBarProps {
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search food, grocery, etc...",
}) => {
  const router = useRouter();

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
          style={searchBarStyles.searchBox}
          activeOpacity={0.8}
          onPress={() => router.push("/(modals)/search")}
        >
          <Ionicons
            name="search"
            size={20}
            color={Colors.primary}
            style={searchBarStyles.icon}
          />
          <Text style={searchBarStyles.input}>{placeholder}</Text>
          <Ionicons name="mic-outline" size={20} color={Colors.textLight} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={searchBarStyles.filterButton}>
        <Ionicons name="options-outline" size={20} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );
};
