import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

interface CourtSelectorProps {
  courts: string[];
  selectedCourt: string;
  onSelectCourt: (court: string) => void;
}

export const CourtSelector: React.FC<CourtSelectorProps> = ({ 
  courts, 
  selectedCourt, 
  onSelectCourt 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Cricket Court</Text>
      
      <View style={styles.courtsGrid}>
        {courts.map((court) => {
          const isActive = selectedCourt === court;
          
          return (
            <TouchableOpacity
              key={court}
              style={[
                styles.courtCard,
                isActive && styles.courtCardActive
              ]}
              onPress={() => onSelectCourt(court)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.radio,
                isActive && styles.radioActive
              ]}>
                {isActive && <View style={styles.radioInner} />}
              </View>
              <Text style={[
                styles.courtLabel,
                isActive && styles.courtLabelActive
              ]}>
                {court}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border || '#E5E7EB'
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.dark,
    marginBottom: theme.spacing.md
  },
  courtsGrid: {
    flexDirection: 'row',
    gap: 12
  },
  courtCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: theme.spacing.lg,
    backgroundColor: '#F9FAFB', // Light Gray
    borderRadius: theme.borderRadius.md,
    borderWidth: 1, // Changed from 2 to 1 for cleaner look
    borderColor: '#E5E7EB'
  },
  courtCardActive: {
    borderColor: theme.colors.primary,
    backgroundColor: '#F0FDFA' // Light Teal tint
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioActive: {
    borderColor: theme.colors.primary
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary
  },
  courtLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.dark
  },
  courtLabelActive: {
    color: theme.colors.primary,
    fontWeight: '700'
  }
});