import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { theme } from '../../styles/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const WEEK_TIMINGS = [
  { day: 'Monday', time: '06:00 PM – 07:00 PM' },
  { day: 'Tuesday', time: '06:00 PM – 07:00 PM' },
  { day: 'Wednesday', time: '06:00 PM – 07:00 PM' },
  { day: 'Thursday', time: '06:00 PM – 07:00 PM' },
  { day: 'Friday', time: '06:00 PM – 11:00 PM' },
  { day: 'Saturday', time: '06:00 AM – 11:00 PM' },
  { day: 'Sunday', time: '06:00 AM – 11:00 PM' },
];

export const TimingInformation: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timings Information</Text>
      
      <TouchableOpacity 
        style={[styles.timingBox, expanded && styles.timingBoxExpanded]} 
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <View style={styles.headerContent}>
          <View style={styles.timeRow}>
            <Text style={styles.dayText}>Monday</Text>
            <View style={styles.divider} />
            <Text style={styles.timeText}>06:00 PM – 07:00 PM</Text>
          </View>
          {expanded ? (
            <ChevronUp size={20} color={theme.colors.dark} />
          ) : (
            <ChevronDown size={20} color={theme.colors.dark} />
          )}
        </View>

        {/* Dropdown List */}
        {expanded && (
          <View style={styles.dropdown}>
            {WEEK_TIMINGS.slice(1).map((item, index) => (
              <View key={index} style={styles.dropdownRow}>
                <Text style={styles.dayText}>{item.day}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            ))}
          </View>
        )}
      </TouchableOpacity>
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
  timingBox: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    padding: 16,
    overflow: 'hidden',
  },
  timingBoxExpanded: {
    backgroundColor: '#fff',
    borderColor: theme.colors.primary, // Highlight border when open
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.dark,
    fontWeight: '500',
    minWidth: 80,
  },
  divider: {
    width: 1,
    height: 14,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 12,
  },
  timeText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.dark,
    fontWeight: '500',
  },
  dropdown: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 12,
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});