import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRight, ChevronLeft } from "lucide-react-native";
import { useBookings } from "../../contexts/BookingContext";
import { DateSelector } from "../../components/booking/DateSelector";
import { TimeSelector } from "../../components/booking/TimeSelector";
import { CourtSelector } from "../../components/booking/CourtSelector";
import { PlayerCounter } from "../../components/booking/PlayerCounter";
import { turfData } from "../../data/mockData";
import { generateDates, formatDate } from "../../utils/dateHelpers";
import { theme } from "../../styles/theme";

const TIME_PERIODS = [
  { name: "Morning", slots: 4 },
  { name: "Noon", slots: 4 },
  { name: "Evening", slots: 2 },
  { name: "Twilight", slots: 1 },
];
const COURTS = ["Court A", "Court B"];

export default function BookingScreen() {
  const { addBooking } = useBookings();

  // State
  const [selectedDate, setSelectedDate] = useState<number>(24);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Noon");
  const [selectedCourt, setSelectedCourt] = useState<string>("Court B");
  const [playerCount, setPlayerCount] = useState<number>(5);

  // Time & Duration State
  const [timeInfo, setTimeInfo] = useState({
    formattedTime: "12:00 PM - 01:00 PM",
    duration: 1,
  });

  const dates = generateDates(24, 7).map((d: any) => ({
    ...d,
    fullDate: `2025-11-${d.date}`,
  }));

  // --- UPDATED CALCULATIONS ---
  
  // 1. Base Rate per Person (e.g., 1200)
  const ratePerPersonPerHour = turfData.pricePerHour || 1200;

  // 2. Cost for ONE player for the selected duration
  // (e.g. 1200 * 2 hours = 2400 per person)
  const costPerPerson = Math.round(ratePerPersonPerHour * timeInfo.duration);

  // 3. Total Bill (Cost per person * Number of players)
  // (e.g. 2400 * 5 players = 12000 Total)
  const calculatedTotalBill = costPerPerson * playerCount;

  const isValid =
    selectedDate && selectedPeriod && selectedCourt && playerCount > 0;

  const handleNext = () => {
    if (!isValid) return;

    const booking = {
      turfId: turfData.id,
      turfName: turfData.name,
      date: formatDate(selectedDate),
      time: timeInfo.formattedTime,
      period: selectedPeriod,
      court: selectedCourt,
      players: playerCount,
      totalPrice: calculatedTotalBill,     // Grand Total
      pricePerHour: ratePerPersonPerHour,  // Base Rate
      pricePerPlayer: costPerPerson,       // Cost per individual
    };

    addBooking(booking);
    router.push("/(tabs)/bookings");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={24} color={theme.colors.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {turfData.name || "Xciteplay Club"}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <DateSelector
          dates={dates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        <TimeSelector
          periods={TIME_PERIODS}
          selectedPeriod={selectedPeriod}
          onSelectPeriod={setSelectedPeriod}
          availableSlots={8}
          onTimeChange={(data) => setTimeInfo(data)}
        />

        <CourtSelector
          courts={COURTS}
          selectedCourt={selectedCourt}
          onSelectCourt={setSelectedCourt}
        />

        <PlayerCounter
          count={playerCount}
          onIncrement={() => setPlayerCount(playerCount + 1)}
          onDecrement={() => setPlayerCount(Math.max(1, playerCount - 1))}
        />

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          {/* Total Price (Black) | Per Player (Grey) */}
          <Text style={styles.totalPrice}>
            ₹ {calculatedTotalBill}
            <Text style={styles.perPlayerText}>
              {" "}
              | ₹{costPerPerson} per player
            </Text>
          </Text>
          <Text style={styles.durationText}>for {timeInfo.duration} hours</Text>
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !isValid && styles.disabledButton]}
          onPress={handleNext}
          disabled={!isValid}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <ChevronRight color="#fff" size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: theme.colors.dark },

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    backgroundColor: "#fff",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  priceContainer: {
    flex: 1,
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.dark, // Black Color
    marginBottom: 2,
  },
  perPlayerText: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#9CA3AF", // Light Grey Color
  },
  durationText: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: "500",
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 4,
  },
  disabledButton: { backgroundColor: "#9CA3AF" },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});