import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import { theme } from '../../styles/theme';

export const TurfReviews: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ratings & Reviews</Text>
      
      {/* Summary Header */}
      <View style={styles.summaryRow}>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingValue}>4.5</Text>
          <Star size={14} fill="#FFB02E" color="#FFB02E" />
        </View>
        <Text style={styles.ratingCount}>15 Ratings  |  10 Reviews</Text>
      </View>

      {/* Review Item 1 */}
      <View style={styles.reviewItem}>
        <View style={styles.reviewHeader}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
            style={styles.avatar} 
          />
          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>Siva</Text>
              <Text style={styles.dotSeparator}>•</Text>
              <View style={styles.userRatingPill}>
                <Text style={styles.userRatingText}>5.0</Text>
                <Star size={10} fill="#F59E0B" color="#F59E0B" />
              </View>
            </View>
            <Text style={styles.reviewDate}>2 days ago  •  22 Nov, 2025</Text>
          </View>
        </View>
        <Text style={styles.comment}>
          Hand On The Best And The Easiest Way Of Booking Turfs Just In Seconds And Within Your Hand !
        </Text>
      </View>

       {/* Review Item 2 (Duplicate for demo) */}
       <View style={[styles.reviewItem, { borderBottomWidth: 0 }]}>
        <View style={styles.reviewHeader}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=33' }} 
            style={styles.avatar} 
          />
          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>Kumar</Text>
              <Text style={styles.dotSeparator}>•</Text>
              <View style={styles.userRatingPill}>
                <Text style={styles.userRatingText}>5.0</Text>
                <Star size={10} fill="#F59E0B" color="#F59E0B" />
              </View>
            </View>
            <Text style={styles.reviewDate}>2 days ago  •  22 Nov, 2025</Text>
          </View>
        </View>
        <Text style={styles.comment}>
          Hand On The Best And The Easiest Way Of Booking Turfs Just In Seconds And Within Your Hand !
        </Text>
      </View>

      <TouchableOpacity>
        <Text style={styles.seeAll}>See All Reviews</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingTop: 0,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.dark,
    marginBottom: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary, // Teal
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4
  },
  ratingValue: { color: 'white', fontWeight: 'bold' },
  ratingCount: { color: '#6B7280', fontSize: 14 },
  
  reviewItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 20,
    borderStyle: 'dashed'
  },
  reviewHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  userName: { fontWeight: 'bold', fontSize: 16, color: theme.colors.dark },
  dotSeparator: { color: '#9CA3AF' },
  userRatingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 2
  },
  userRatingText: { fontSize: 12, fontWeight: 'bold', color: theme.colors.dark },
  reviewDate: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  comment: { fontSize: 15, color: '#374151', lineHeight: 22,marginLeft: 50 },
  seeAll: {
    color: theme.colors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: 10
  }
});