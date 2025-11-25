import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Star } from 'lucide-react-native';
import { turfData } from '../data/mockData';

export default function HomeScreen() {
  const turfs = [turfData]; // In real app, this would be a list

  const renderTurf = ({ item }: { item: typeof turfData }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/turf/${item.id}`)}
    >
      <Image source={{ uri: item.images[0] }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.ratingRow}>
          <Star fill="#FFB800" color="#FFB800" size={16} />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviews}>({item.totalRatings} reviews)</Text>
        </View>
        <Text style={styles.address} numberOfLines={1}>{item.address}</Text>
        <Text style={styles.price}>₹{item.pricePerHour}/hour</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={turfs}
        renderItem={renderTurf}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  list: {
    padding: 16
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  image: {
    width: '100%',
    height: 200
  },
  cardContent: {
    padding: 16
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  },
  reviews: {
    fontSize: 14,
    color: '#666'
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00BFA6'
  }
});