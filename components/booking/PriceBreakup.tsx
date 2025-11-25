import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../../styles/theme";
import { formatPrice } from "../../utils/priceCalculator";

interface PriceBreakupProps {
  pricePerHour: number;
  pricePerPlayer: number;
  onViewDetails: () => void;
}

export const PriceBreakup: React.FC<PriceBreakupProps> = ({
  pricePerHour,
  pricePerPlayer,
  onViewDetails,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{formatPrice(pricePerHour)}</Text>
        <Text style={styles.priceLabel}>
          | {formatPrice(pricePerPlayer)} per player
        </Text>
      </View>
      <TouchableOpacity onPress={onViewDetails}>
        <Text style={styles.link}>View Price Breakup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  price: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.dark,
  },
  priceLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text,
  },
  link: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primary,
    textDecorationLine: "underline",
  },
});
