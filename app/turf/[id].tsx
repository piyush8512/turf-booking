import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { ArrowLeft, Heart, Share2, ChevronRight } from "lucide-react-native";
import { turfData } from "../../data/mockData";
import { TurfInfo } from "../../components/turf/TurfInfo";
import { TurfFacilities } from "../../components/turf/TurfFacilities";
import { TurfOffers } from "../../components/turf/TurfOffers";
import { TimingInformation } from "@/components/turf/TimingInformation";
import { AboutPolicies } from "../../components/turf/AboutPolicies";
import { ImageSlider } from "../../components/turf/ImageSlider";
import { ActionButtons } from "../../components/turf/ActionButtons";
import { TurfReviews } from "@/components/turf/TurfReviews";
import { TurfSports } from "@/components/turf/TurfSports";
import { TurfMap } from "@/components/turf/TurfMap";

const Separator = () => <View style={styles.separator} />;

export default function TurfDetailsScreen() {
  const { id } = useLocalSearchParams();
  const turf = turfData; // In real app, find((t) => t.id === id)

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 1. Image Slider & Header Overlay */}
        <View style={styles.headerWrapper}>
          <ImageSlider images={turf.images} />

          {/* Overlay Buttons */}
          <View style={styles.imageOverlay}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => router.back()}
            >
              <ArrowLeft color="#fff" size={24} />
            </TouchableOpacity>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.iconBtn}>
                <Heart color="#fff" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <Share2 color="#fff" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 2. Turf Name & Rating Info */}
        <TurfInfo
          name={turf.name}
          rating={turf.rating}
          totalRatings={turf.totalRatings}
          address={turf.address}
          verified={turf.verified}
        />

        {/* 3. Actions (Direction & Call) */}
        <ActionButtons address={turf.address} />

        <Separator />

        {/* 4. About & Policies */}
        <AboutPolicies turfName={turf.name} description={turf.about} />

        {/* 5. Timings */}
        <TimingInformation />

        <Separator />

        {/* 6. Facilities */}
        <TurfFacilities facilities={turf.facilities} />

        <Separator />
        <TurfSports />

        {/* 7. Offers */}
        <Separator />
        <TurfOffers offers={turf.offers} />

        <Separator />

        {/* 8. Reviews */}
        <TurfReviews />

        <Separator />
        <TurfMap />

        {/* Bottom Padding (Increased to account for taller footer) */}
        <View style={{ height: 140 }} />
      </ScrollView>

      {/* --- STICKY FOOTER WRAPPER --- */}
      <View style={styles.footerWrapper}>
        
        {/* Green Discount Strip */}
        <View style={styles.discountBanner}>
           <Text style={styles.discountText}>15% OFF ends in 01:50 s</Text>
        </View>

        {/* Main Booking Bar */}
        <View style={styles.bottomBarContent}>
          <View>
            {/* UPDATED SECTION START */}
            <View style={styles.priceRow}>
              <Text style={styles.price}>₹ {turf.pricePerHour}</Text>
              <Text style={styles.durationText}> / 1 hour</Text>
            </View>
            <Text style={styles.disclaimerText}>per player cost in next step</Text>
            {/* UPDATED SECTION END */}
          </View>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => router.push("/turf/booking")}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
            <ChevronRight color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerWrapper: {
    position: "relative",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: 48,
    zIndex: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginHorizontal: 16,
    marginVertical: 12,
  },
  
  // --- Footer Styles ---
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: "transparent", 
  },
  discountBanner: {
    backgroundColor: "#E0F2F1", // Light Teal/Green background
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 36,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  discountText: {
    color: "#00BFA6", // Primary Teal color
    fontSize: 12,
    fontWeight: "600",
  },
  bottomBarContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  // UPDATED STYLES FOR PRICE SECTION
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline", // Ensures the symbol and text align at the bottom
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111", // Dark black
  },
  durationText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#111", // Dark black to match image
    marginLeft: 4,
  },
  disclaimerText: {
    fontSize: 12,
    color: "#888", // Gray color
    marginTop: 2,
    fontWeight: "500",
  },
  // END UPDATED STYLES
  bookButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 32,
    paddingVertical: 14,
    backgroundColor: "#00BFA6",
    borderRadius: 12,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});