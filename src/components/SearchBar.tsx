import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { searchBarStyles } from '../styles/navbarStyles/SearchBar.styles';
import { Colors } from '../theme/theme';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search for restaurants or dishes...", 
  onSearch 
}) => {
  const [query, setQuery] = useState('');

  const handleClear = () => {
    setQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <View style={searchBarStyles.container}>
      <View style={searchBarStyles.searchBox}>
        <Ionicons 
          name="search" 
          size={20} 
          color={Colors.textLight} 
          style={searchBarStyles.icon} 
        />
        <TextInput
          style={searchBarStyles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.textLight}
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            if (onSearch) onSearch(text);
          }}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Ionicons name="close-circle" size={20} color={Colors.textLight} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
