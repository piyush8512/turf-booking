import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MapPin, Star, Check } from "lucide-react-native";
import { theme } from "../../styles/theme";

interface TurfInfoProps {
  name: string;
  rating: number;
  totalRatings: number;
  address: string;
  verified: boolean;
}

export const TurfInfo: React.FC<TurfInfoProps> = ({
  name,
  rating,
  totalRatings,
  address,
  verified,
}) => {
  return (
    <View style={styles.container}>
      {/* Header Row: Name (Left) + Rating Pill (Right) */}
      <View style={styles.headerRow}>
        {/* Left Side: Name + Verified Check */}
        <View style={styles.nameContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          {verified && (
            <View style={styles.verifiedBadge}>
              <Check color="white" size={12} strokeWidth={4} />
            </View>
          )}
        </View>

        {/* Right Side: Oval Rating Pill with Shadow */}
        <View style={styles.ratingPill}>
          <Text style={styles.ratingValue}>{rating}</Text>
          <Star
            fill={theme.colors.warning}
            color={theme.colors.warning}
            size={12}
            style={{ marginHorizontal: 4 }}
          />
          <Text style={styles.ratingCount}>| {totalRatings} Ratings</Text>
        </View>
      </View>

      {/* Address Row */}
      <View style={styles.addressRow}>
        <MapPin color={theme.colors.text} size={18} />
        <Text style={styles.address}>{address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.white,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm, // Spacing between Header and Address
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Allows name to take available space
    marginRight: 10,
  },
  name: {
    fontSize: theme.fontSize.xl, // Slightly adjusted for fit
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.dark,
    marginRight: 6,
  },
  verifiedBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: theme.colors.primary, // Teal color
    alignItems: "center",
    justifyContent: "center",
  },
  // --- The Oval Shadow Pill Style ---
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20, // Makes it Oval
    borderWidth: 1,
    borderColor: "#EEEEEE",
    // Shadow Props
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ratingValue: {
    fontSize: 13,
    fontWeight: "bold",
    color: theme.colors.dark,
  },
  ratingCount: {
    fontSize: 11,
    color: theme.colors.text, // Gray text
    marginLeft: 2,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start", // Aligns icon with top line of text
    gap: 6,
    paddingRight: 20,
  },
  address: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 18,
  },
});
