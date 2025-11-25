import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBookings } from '../../contexts/BookingContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/layout/EmptyState';

export default function BookingsScreen() {
  const { bookings } = useBookings();

  if (bookings.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyState
          title="No bookings yet"
          subtitle="Start booking your favorite turfs!"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {bookings.map((booking) => (
          <Card key={booking.id} style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.turfName}>{booking.turfName}</Text>
              <Badge value={booking.status || 'Confirmed'} variant="success" size="sm" />
            </View>
            
            <View style={styles.row}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>{booking.date}</Text>
            </View>
            
            <View style={styles.row}>
              <Text style={styles.label}>Time:</Text>
              <Text style={styles.value}>{booking.time}</Text>
            </View>
            
            <View style={styles.row}>
               <Text style={styles.label}>Court:</Text>
               <Text style={styles.value}>{booking.court}</Text>
            </View>

            {/* Added Players Count */}
            <View style={styles.row}>
               <Text style={styles.label}>Players:</Text>
               <Text style={styles.value}>{booking.players}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.footerRow}>
               <Text style={styles.priceLabel}>Total Amount</Text>
               {/* Show Total Price (Calculated or Saved) */}
               <Text style={styles.price}>
                  ₹{booking.totalPrice || booking.pricePerHour}
               </Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: 16
  },
  card: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  turfName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6
  },
  label: {
    fontSize: 14,
    color: '#888',
    width: 70
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500'
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 10
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  priceLabel: {
    fontSize: 12,
    color: '#666'
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00BFA6', // Teal
  }
});