import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/profileStyles/Appearance.styles';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setThemeMode, ThemeMode } from '../../store/slices/themeSlice';

export const Appearance = () => {
  const colors = useThemeColors();
  const dispatch = useAppDispatch();
  const currentMode = useAppSelector((state) => state.theme.mode);

  const themeOptions: { label: string; mode: ThemeMode; icon: any }[] = [
    { label: 'Light', mode: 'light', icon: 'sunny-outline' },
    { label: 'Dark', mode: 'dark', icon: 'moon-outline' },
    { label: 'System', mode: 'system', icon: 'settings-outline' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <Ionicons name="color-palette" size={24} color={colors.primary} />
        <Text style={[styles.text, { color: colors.text }]}>Appearance</Text>
      </View>
      
      <View style={styles.optionsContainer}>
        {themeOptions.map((option) => (
          <TouchableOpacity
            key={option.mode}
            style={[
              styles.optionButton,
              currentMode === option.mode && { backgroundColor: colors.primaryLight, borderColor: colors.primary }
            ]}
            onPress={() => dispatch(setThemeMode(option.mode))}
          >
            <Ionicons 
              name={option.icon} 
              size={20} 
              color={currentMode === option.mode ? colors.primary : colors.textLight} 
            />
            <Text style={[
              styles.optionText,
              { color: currentMode === option.mode ? colors.primary : colors.textLight }
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
