import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="(modals)/checkout" 
        options={{ 
          presentation: 'modal',
          headerTitle: 'Checkout'
        }} 
      />
      <Stack.Screen name="restaurant/[id]" options={{ headerTitle: 'Restaurant' }} />
    </Stack>
  );
}
