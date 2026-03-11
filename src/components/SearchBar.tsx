import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { searchBarStyles } from '../styles/navbarStyles/SearchBar.styles';
import { Colors } from '../theme/theme';

interface SearchBarProps {
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search for restaurants or dishes...", 
}) => {
  const router = useRouter();

  return (
    <View style={searchBarStyles.container}>
      <TouchableOpacity 
        style={searchBarStyles.searchBox}
        activeOpacity={0.8}
        onPress={() => router.push('/(modals)/search')}
      >
        <Ionicons 
          name="search" 
          size={20} 
          color={Colors.textLight} 
          style={searchBarStyles.icon} 
        />
        <Text style={[searchBarStyles.input, { color: Colors.textLight }]}>
          {placeholder}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
