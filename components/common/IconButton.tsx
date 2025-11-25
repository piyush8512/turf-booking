import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';


interface IconButtonProps {
  onPress: () => void;
  icon: React.ReactNode;
  size?: number;
  backgroundColor?: string;
  style?: any;
}

export const IconButton: React.FC<IconButtonProps> = ({ 
  onPress, 
  icon,
  size = 40,
  backgroundColor = 'rgba(0,0,0,0.3)',
  style 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width: size, height: size, borderRadius: size / 2, backgroundColor },
        style
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});