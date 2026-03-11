import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '../../theme/theme';

interface EditBtnProps {
  onPress?: () => void;
}

export const EditBtn: React.FC<EditBtnProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="pencil" size={16} color={Colors.background} />
      <Text style={styles.text}>Edit</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    gap: Spacing.xs,
    elevation: 2,
    boxShadow: "0 2 4 rgba(0, 0, 0, 0.1)",
  },
  text: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: '600',
  },
});
