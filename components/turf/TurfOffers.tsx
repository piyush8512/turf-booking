import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../common/Card';
import { theme } from '../../styles/theme';
import { Offer } from '../../types/turf.types';

interface TurfOffersProps {
  offers: Offer[];
}

export const TurfOffers: React.FC<TurfOffersProps> = ({ offers }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Offers</Text>
      {offers.map((offer, index) => (
        <Card key={index} style={styles.offerCard}>
          <Text style={styles.code}>{offer.code}</Text>
          <Text style={styles.description}>{offer.description}</Text>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.dark,
    marginBottom: theme.spacing.md
  },
  offerCard: {
    backgroundColor: theme.colors.primaryLight,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
    borderColor: 'transparent'
  },
  code: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm
  },
  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.dark,
    lineHeight: 20
  }
});
