import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../styles/theme';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  style?: any;
}

export const Chip: React.FC<ChipProps> = ({ 
  label, 
  active = false, 
  onPress,
  icon,
  style 
}) => {
  const Component = onPress ? TouchableOpacity : View;
  
  return (
    <Component
      style={[
        styles.chip,
        active && styles.chipActive,
        style
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon}
      <Text style={[styles.label, active && styles.labelActive]}>
        {label}
      </Text>
    </Component>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.xl,
    gap: 8
  },
  chipActive: {
    backgroundColor: theme.colors.dark
  },
  label: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.dark,
    fontWeight: theme.fontWeight.medium
  },
  labelActive: {
    color: theme.colors.white
  }
});