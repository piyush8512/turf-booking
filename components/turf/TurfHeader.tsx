import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ArrowLeft, Heart, Share2 } from 'lucide-react-native';
import {theme} from '../../styles/theme';

const { width } = Dimensions.get('window');

interface TurfHeaderProps {
  images: string[];
  onBack: () => void;
  onFavorite?: () => void;
  onShare?: () => void;
}

export const TurfHeader: React.FC<TurfHeaderProps> = ({ 
  images, 
  onBack,
  onFavorite,
  onShare 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: images[currentIndex] }} 
        style={styles.image}
        resizeMode="cover"
      />
      
      {/* Overlay with actions */}
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.iconButton} onPress={onFavorite}>
            <Heart color="#fff" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onShare}>
            <Share2 color="#fff" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Image indicators */}
      <View style={styles.indicators}>
        {images.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot
            ]} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 280,
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    paddingTop: 48
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actions: {
    flexDirection: 'row',
    gap: 12
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
  activeDot: {
    backgroundColor: theme.colors.primary,
    width: 24
  }
});