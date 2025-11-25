import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

interface BottomBarProps {
  children: React.ReactNode;
  style?: any;
}

export const BottomBar: React.FC<BottomBarProps> = ({ children, style }) => {
  return (
    <View style={[styles.bottomBar, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border
  }
});