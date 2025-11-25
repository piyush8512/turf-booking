import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../styles/theme';

interface AboutPoliciesProps {
  turfName: string;
  description: string;  
}

export const AboutPolicies: React.FC<AboutPoliciesProps> = ({ turfName, description }) => {
  const [activeTab, setActiveTab] = useState<'About' | 'Policies'>('About');

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'About' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('About')}
        >
          <Text style={[styles.tabText, activeTab === 'About' ? styles.activeTabText : styles.inactiveTabText]}>
            About
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Policies' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('Policies')}
        >
          <Text style={[styles.tabText, activeTab === 'Policies' ? styles.activeTabText : styles.inactiveTabText]}>
            Policies
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'About' ? (
          <>
            <Text style={styles.header}>About '{turfName}'</Text>
            <Text style={styles.bodyText}>
              {description}
              <Text style={styles.readMore}> read more</Text>
            </Text>
          </>
        ) : (
          <>
             <Text style={styles.header}>Venue Policies</Text>
             <Text style={styles.bodyText}>
               • Non-marking shoes are mandatory.{'\n'}
               • Please arrive 15 minutes before your slot.{'\n'}
               • No smoking inside the premises.
             </Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: theme.colors.dark, // Black background for active
  },
  inactiveTab: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: '#E5E7EB', // Light gray border
  },
  tabText: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
  activeTabText: {
    color: theme.colors.white,
  },
  inactiveTabText: {
    color: theme.colors.dark,
  },
  content: {
    marginTop: 4,
  },
  header: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.dark,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: theme.fontSize.md,
    color: '#4B5563', // Gray-600
    lineHeight: 22,
  },
  readMore: {
    color: theme.colors.primary, // Teal color
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});