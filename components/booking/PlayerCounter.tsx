import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Plus, Minus } from 'lucide-react-native';
import { theme } from '../../styles/theme';

interface PlayerCounterProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

export const PlayerCounter: React.FC<PlayerCounterProps> = ({ 
  count, 
  onIncrement, 
  onDecrement,
  min = 1,
  max = 20 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Players Count</Text>
      
      {/* Gray Counter Bar */}
      <View style={styles.counterBar}>
        <TouchableOpacity
          style={styles.button}
          onPress={onDecrement}
          disabled={count <= min}
          activeOpacity={0.6}
        >
          <Minus color={theme.colors.dark} size={20} />
        </TouchableOpacity>
        
        <View style={styles.textContainer}>
            <Text style={styles.countText}>{count} Players</Text>
        </View>
        
        <TouchableOpacity
          style={styles.button}
          onPress={onIncrement}
          disabled={count >= max}
          activeOpacity={0.6}
        >
          <Plus color={theme.colors.dark} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.dark,
    marginBottom: 12
  },
  counterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB', // The gray background from screenshot
    borderRadius: 8,
    height: 56, // Taller touch target
    padding: 4, // Inner padding
  },
  button: {
    width: 48,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    // Optional: Add white bg to buttons if needed, usually transparent or slightly shaded
    // backgroundColor: 'rgba(255,255,255,0.5)' 
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6', // Slightly lighter middle section
    height: '100%',
  },
  countText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.dark,
  }
});