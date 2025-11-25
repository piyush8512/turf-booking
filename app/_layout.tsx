import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BookingProvider } from "../contexts/BookingContext";

export default function RootLayout() {
  return (
    <BookingProvider>
      <StatusBar style="dark" />

      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Turfs",
            headerShown: true,
   
          }}
        />
        <Stack.Screen
          name="turf/[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="turf/booking"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </BookingProvider>
  );
}
