import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Maximize2 } from 'lucide-react-native';
import { theme } from '../../styles/theme';

interface DateItem {
  day: string;
  date: number;
  fullDate: string;
}

interface DateSelectorProps {
  dates: DateItem[];
  selectedDate: number;
  onSelectDate: (date: number) => void;
  month?: string;
}

export const DateSelector: React.FC<DateSelectorProps> = ({ 
  dates,
  selectedDate, 
  onSelectDate,
  month = "November 2025" 
}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Select Date</Text>
        <TouchableOpacity>
          <Maximize2 color={theme.colors.dark} size={20} />
        </TouchableOpacity>
      </View>
      
      {/* Month Label */}
      <Text style={styles.month}>{month}</Text>
      
      {/* Horizontal Scroll List */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {dates.map((item) => {
          const isActive = selectedDate === item.date;
          return (
            <TouchableOpacity
              key={item.date}
              style={styles.itemContainer}
              onPress={() => onSelectDate(item.date)}
              activeOpacity={0.7}
            >
              {/* Day Name (Outside the box) */}
              <Text style={[
                styles.day,
                isActive && styles.dayActive
              ]}>
                {item.day}
              </Text>

              {/* Date Number (Inside the box) */}
              <View style={[
                styles.dateBox,
                isActive && styles.dateBoxActive
              ]}>
                <Text style={[
                  styles.date,
                  isActive && styles.dateActive
                ]}>
                  {item.date}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: 0, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.dark
  },
  month: {
    fontSize: theme.fontSize.md,
    color: theme.colors.primary, 
    fontWeight: '600',
    marginBottom: theme.spacing.md
  },
  scrollContent: {
    paddingRight: 20
  },
  
  // Container for the vertical stack (Day Text + Date Box)
  itemContainer: {
    alignItems: 'center',
    marginRight: 12, // Spacing between items
    width: 50, 
  },

  // Day Text Styles
  day: {
    fontSize: 11,
    color: '#9CA3AF', // Gray-400 (Inactive)
    marginBottom: 8,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  dayActive: {
    color: theme.colors.primary, // Teal color when active
    fontWeight: 'bold'
  },

  // Date Box Styles
  dateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F3F4F6', // Light gray background
  },
  dateBoxActive: {
    backgroundColor: theme.colors.primary, // Teal background
  },

  // Date Number Styles
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.dark
  },
  dateActive: {
    color: 'white' // White text inside teal box
  }
});