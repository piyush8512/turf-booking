import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { ChevronRight, Phone } from 'lucide-react-native';
import { theme } from '../../styles/theme';

interface ActionButtonsProps {
  address: string;
  phoneNumber?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ address, phoneNumber = '1234567890' }) => {
  
  const openMap = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${0},${0}`; // Ideally pass lat/long props
    const label = 'Turf Location';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    // Fallback to simple query if lat/long missing
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`);
  };

  const openDialer = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      {/* Get Direction Button (Pill Shape) */}
      <TouchableOpacity style={styles.directionBtn} onPress={openMap}>
        <Text style={styles.directionText}>Get Direction</Text>
        <ChevronRight size={20} color={theme.colors.dark} />
      </TouchableOpacity>

      {/* Phone Button (Circle Shape) */}
      <TouchableOpacity style={styles.phoneBtn} onPress={openDialer}>
        <Phone size={22} color={theme.colors.dark} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg, // Space before the separator line
    gap: 12,
  },
  directionBtn: {
    flex: 1, // Takes up remaining space
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB', // Light gray border
    backgroundColor: theme.colors.white,
  },
  directionText: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.dark,
    marginRight: 4,
  },
  phoneBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  }
});