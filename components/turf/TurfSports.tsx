import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { CircleDashed } from "lucide-react-native"; // Using generic icons as placeholders
import { theme } from "../../styles/theme";

export const TurfSports: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Sports & Types</Text>

      {/* Sports Chips */}
      <View style={styles.chipRow}>
        <TouchableOpacity style={styles.activeChip}>
          <Text style={styles.activeChipText}>⚽ Foot Ball</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.inactiveChip}>
          <Text style={styles.inactiveChipText}>🏏 Cricket</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.inactiveChip}>
          <Text style={styles.inactiveChipText}>🎾 Pickle Ball</Text>
        </TouchableOpacity>
      </View>

      {/* Field Image Banner */}
      <View style={styles.fieldContainer}>
        <Image
          source={require("../../assets/images/footbalfield.png")} // Use local asset or this URL
          style={styles.fieldImage}
          resizeMode="cover"
        />
        <View style={styles.captionContainer}>
          <Text style={styles.captionTitle}>Turf – Foot Ball & Cricket</Text>
          <Text style={styles.captionSubtitle}>7v7</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: 0,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.dark,
    marginBottom: theme.spacing.md,
  },
  chipRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  activeChip: {
    backgroundColor: "#111827", // Black
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  activeChipText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  inactiveChip: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  inactiveChipText: {
    color: "#374151",
    fontWeight: "500",
    fontSize: 14,
  },
  fieldContainer: {
    alignItems: "center",
  },
  fieldImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },
  captionContainer: {
    alignItems: "center",
  },
  captionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.dark,
    marginBottom: 4,
  },
  captionSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
});
