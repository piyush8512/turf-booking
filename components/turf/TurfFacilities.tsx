import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Car, Droplets, CircleDashed, Sun } from 'lucide-react-native';
import { theme } from '../../styles/theme';

interface TurfFacilitiesProps {
  facilities: string[];
}

export const TurfFacilities: React.FC<TurfFacilitiesProps> = ({ facilities }) => {
  
  // Helper to get the correct icon based on facility name
  const getIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    const iconProps = { size: 18, color: theme.colors.dark, strokeWidth: 1.5 };

    if (lowerName.includes('parking')) return <Car {...iconProps} />;
    if (lowerName.includes('water')) return <Droplets {...iconProps} />;
    if (lowerName.includes('ball')) return <CircleDashed {...iconProps} />;
    if (lowerName.includes('light')) return <Sun {...iconProps} />;
    return <CircleDashed {...iconProps} />; // Default
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Facilities</Text>
      <View style={styles.grid}>
        {facilities.map((facility, index) => (
          <View key={index} style={styles.facilityChip}>
            {getIcon(facility)}
            <Text style={styles.facilityText}>{facility}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    // Removed border bottom to match the cleaner look of the screenshot
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.dark,
    marginBottom: theme.spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  facilityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6', // Light gray background matching screenshot
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20, // Rounded pill shape
    gap: 8,
  },
  facilityText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.dark,
    fontWeight: '500',
  },
});