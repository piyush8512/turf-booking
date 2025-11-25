import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
  LayoutChangeEvent,
} from "react-native";
import { Sun, Cloud, Sunset, Moon } from "lucide-react-native";
import { theme } from "../../styles/theme";

const PERIOD_ICONS: Record<string, any> = {
  Morning: Cloud,
  Noon: Sun,
  Evening: Sunset,
  Twilight: Moon,
};

// --- Time Helper Logic ---
const START_HOUR = 11; // 11:00 AM
const TOTAL_HOURS = 4; // 4 Hours timeline length

const formatTimeFromPercent = (percent: number) => {
  const totalMinutes = TOTAL_HOURS * 60;
  const currentMinutes = (percent / 100) * totalMinutes;

  let hours = Math.floor(START_HOUR + currentMinutes / 60);
  let minutes = Math.floor(currentMinutes % 60);

  // Snap to 15 mins
  minutes = Math.round(minutes / 15) * 15;
  if (minutes === 60) {
    minutes = 0;
    hours += 1;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours > 12 ? hours - 12 : hours;
  const displayMinutes = minutes.toString().padStart(2, "0");

  return `${displayHours}:${displayMinutes} ${period}`;
};

const getDurationInHours = (startPos: number, endPos: number) => {
  const percentDiff = endPos - startPos;
  // If 100% is 4 hours, then X% is...
  const hours = (percentDiff / 100) * TOTAL_HOURS;
  // Round to 2 decimal places for price calc
  return Math.round(hours * 100) / 100;
};

interface TimeSelectorProps {
  periods: { name: string; slots: number }[];
  selectedPeriod: string;
  onSelectPeriod: (period: string) => void;
  availableSlots: number;
  // NEW PROP: To send data back to BookingScreen
  onTimeChange: (data: { formattedTime: string; duration: number }) => void;
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({
  periods,
  selectedPeriod,
  onSelectPeriod,
  availableSlots,
  onTimeChange,
}) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const [startPos, setStartPos] = useState(25); // Starts at ~12:00
  const [endPos, setEndPos] = useState(50); // Ends at ~01:00

  // Update parent whenever sliders move
  useEffect(() => {
    const startStr = formatTimeFromPercent(startPos);
    const endStr = formatTimeFromPercent(endPos);
    const duration = getDurationInHours(startPos, endPos);

    onTimeChange({
      formattedTime: `${startStr} - ${endStr}`,
      duration: duration,
    });
  }, [startPos, endPos]);

  // Left Cursor
  const panResponderLeft = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
          if (trackWidth === 0) return;
          const deltaPercent = (gestureState.dx / trackWidth) * 100;
          let newPos = startPos + deltaPercent;
          if (newPos < 0) newPos = 0;
          if (newPos > endPos - 5) newPos = endPos - 5;
          setStartPos(newPos);
        },
      }),
    [trackWidth, startPos, endPos]
  );

  // Right Cursor
  const panResponderRight = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
          if (trackWidth === 0) return;
          const deltaPercent = (gestureState.dx / trackWidth) * 100;
          let newPos = endPos + deltaPercent;
          if (newPos > 100) newPos = 100;
          if (newPos < startPos + 5) newPos = startPos + 5;
          setEndPos(newPos);
        },
      }),
    [trackWidth, startPos, endPos]
  );

  const handleLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  };

  const renderPeriodCard = (period: { name: string; slots: number }) => {
    const Icon = PERIOD_ICONS[period.name] || Sun;
    const isActive = selectedPeriod === period.name;
    return (
      <TouchableOpacity
        key={period.name}
        style={[styles.periodCard, isActive && styles.periodCardActive]}
        onPress={() => onSelectPeriod(period.name)}
        activeOpacity={0.7}
      >
        <View style={styles.cardContent}>
          <Icon
            color={isActive ? theme.colors.white : theme.colors.text}
            size={18}
          />
          <Text
            style={[styles.periodName, isActive && styles.periodNameActive]}
          >
            {period.name}
          </Text>
        </View>
        <View style={[styles.slotBadge, isActive && styles.slotBadgeActive]}>
          <Text style={styles.slotCount}>{period.slots}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Time</Text>
        <Text style={styles.slotsText}>
          {availableSlots} slots available for today.
        </Text>
      </View>

      <View style={styles.periodsGrid}>
        {periods.slice(0, 2).map((period) => renderPeriodCard(period))}
      </View>

      {/* Dynamic Label */}
      <View style={styles.rangeLabelContainer}>
        <Text style={styles.rangeLabelText}>
          {formatTimeFromPercent(startPos)} – {formatTimeFromPercent(endPos)}
        </Text>
      </View>

      <View style={styles.periodsGrid}>
        {periods.slice(2, 4).map((period) => renderPeriodCard(period))}
      </View>

      <View style={styles.timelineContainer}>
        <View style={styles.timeLabelsRow}>
          {["11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"].map(
            (time, index) => (
              <View key={index} style={{ alignItems: "center", width: 70 }}>
                <Text style={styles.timeLabel}>{time}</Text>
                <View style={styles.tickMark} />
              </View>
            )
          )}
        </View>

        <View style={styles.trackContainer} onLayout={handleLayout}>
          <View style={styles.baseLine} />
          <View
            style={[
              styles.activeSegment,
              { left: `${startPos}%`, width: `${endPos - startPos}%` },
            ]}
          />

          <View
            style={[styles.cursorWrapper, { left: `${startPos}%` }]}
            {...panResponderLeft.panHandlers}
          >
            <View style={styles.hitSlop} />
            <View style={styles.dot} />
            <View style={styles.triangle} />
          </View>

          <View
            style={[styles.cursorWrapper, { left: `${endPos}%` }]}
            {...panResponderRight.panHandlers}
          >
            <View style={styles.hitSlop} />
            <View style={styles.dot} />
            <View style={styles.triangle} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.dark,
  },
  slotsText: { fontSize: 12, color: "#6B7280" },
  periodsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },
  periodCard: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 24,
  },
  periodCardActive: { backgroundColor: "#111827" },
  cardContent: { flexDirection: "row", alignItems: "center", gap: 8 },
  periodName: { fontSize: 14, fontWeight: "500", color: "#374151" },
  periodNameActive: { color: "white" },
  slotBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  slotBadgeActive: {},
  slotCount: { fontSize: 12, fontWeight: "700", color: "#111827" },
  rangeLabelContainer: {
    alignItems: "flex-end",
    marginTop: 0,
    marginBottom: 12,
  },
  rangeLabelText: { fontSize: 12, color: "#6B7280", fontWeight: "500" },
  timelineContainer: {
    marginTop: 10,
    overflow: "hidden",
    marginHorizontal: -theme.spacing.lg,
  },
  timeLabelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  timeLabel: { fontSize: 10, color: "#9CA3AF", marginBottom: 4 },
  tickMark: { width: 1, height: 4, backgroundColor: "#E5E7EB" },
  trackContainer: {
    height: 30,
    position: "relative",
    justifyContent: "center",
  },
  baseLine: {
    height: 2,
    width: "100%",
    backgroundColor: "#F3F4F6",
    position: "absolute",
    top: 14,
  },
  activeSegment: {
    height: 2,
    backgroundColor: "#111827",
    position: "absolute",
    top: 14,
    zIndex: 1,
  },
  cursorWrapper: {
    position: "absolute",
    top: 0,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -15,
    width: 30,
    zIndex: 10,
  },
  hitSlop: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: "transparent",
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#111827",
    marginTop: 2,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E5E7EB",
    marginBottom: 0,
  },
});
