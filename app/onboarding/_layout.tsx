import { Stack } from 'expo-router/stack';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="cycle-info" />
      <Stack.Screen name="goals" />
      <Stack.Screen name="complete" />
    </Stack>
  );
}