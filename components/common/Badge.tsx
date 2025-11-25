import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

interface BadgeProps {
  value: string;
  variant?: 'primary' | 'warning' | 'success';
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  style?: any;
}

export const Badge: React.FC<BadgeProps> = ({ 
  value, 
  variant = 'primary',
  icon,
  size = 'md',
  style 
}) => {
  return (
    <View style={[
      styles.badge,
      styles[variant],
      styles[size],
      style
    ]}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {value}
      </Text>
      {icon}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.xl,
    gap: 4
  },
  primary: {
    backgroundColor: theme.colors.primary
  },
  warning: {
    backgroundColor: theme.colors.warningLight
  },
  success: {
    backgroundColor: theme.colors.primaryLight
  },
  sm: {
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  md: {
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  lg: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  text: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold
  },
  primaryText: {
    color: theme.colors.white
  },
  warningText: {
    color: theme.colors.dark
  },
  successText: {
    color: theme.colors.primary
  }
});