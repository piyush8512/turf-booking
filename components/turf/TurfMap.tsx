import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import this
import { theme } from '../../styles/theme';

const { width } = Dimensions.get('window');

export const TurfMap: React.FC = () => {
  const handleGetDirection = () => {
    // Open Google Maps
    Linking.openURL('https://maps.google.com'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map View</Text>
      
      <View style={styles.mapContainer}>
        {/* Map Image */}
        <Image 
          source={require('../../assets/images/location.png')}
          style={styles.mapImage}
          resizeMode="cover"
        />

        {/* Faded Gradient Overlay (Bottom) */}
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.8)', '#ffffff']}
          style={styles.gradientOverlay}
        />
        
        {/* Black Floating Button */}
        <TouchableOpacity style={styles.directionBtn} onPress={handleGetDirection}>
          <Text style={styles.btnText}>Get Direction</Text>
          <ChevronRight size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    // Removed large bottom padding since gradient handles the fade out visual
    backgroundColor: '#fff',
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.dark,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  mapContainer: {
    width: width,
    height: 300, // Slightly taller to allow fade effect
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    paddingBottom: 40, // Push button up slightly
  },
  mapImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100, // Height of the fade effect
    zIndex: 1, // Sit above image, below button (or above button if you want button faded too, but usually below)
  },
  directionBtn: {
    backgroundColor: '#111827', // Black
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 92,
    borderRadius: 30,
    marginBottom: 10, // Adjust position relative to gradient
    gap: 8,
    elevation: 6, // Higher elevation to sit on top of gradient visually
    zIndex: 10,   // Ensure button is clickable above gradient
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
});