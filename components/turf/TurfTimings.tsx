import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { theme } from '../../styles/theme';
import { Timing } from '../../types/turf.types';

interface TurfTimingsProps {
  timings: Timing[];
}

export const TurfTimings: React.FC<TurfTimingsProps> = ({ timings }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timings Information</Text>
      
      <View style={styles.timingCard}>
        <View style={styles.timingRow}>
          <Text style={styles.day}>{timings[0].day}</Text>
          <Text style={styles.time}>{timings[0].time}</Text>
        </View>
        
        {timings.length > 1 && (
          <TouchableOpacity 
            style={styles.expandButton}
            onPress={() => setExpanded(!expanded)}
          >
            <Text style={styles.expandText}>
              {expanded ? 'Show less' : `Show all (${timings.length})`}
            </Text>
            <ChevronDown 
              color={theme.colors.primary} 
              size={16}
              style={{ transform: [{ rotate: expanded ? '180deg' : '0deg' }] }}
            />
          </TouchableOpacity>
        )}
      </View>

      {expanded && timings.slice(1).map((timing, index) => (
        <View key={index} style={[styles.timingCard, styles.expandedCard]}>
          <View style={styles.timingRow}>
            <Text style={styles.day}>{timing.day}</Text>
            <Text style={styles.time}>{timing.time}</Text>
          </View>
        </View>
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
  timingCard: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.md
  },
  expandedCard: {
    marginTop: theme.spacing.sm
  },
  timingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  day: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.dark
  },
  time: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: theme.spacing.sm
  },
  expandText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.semibold
  }
});
