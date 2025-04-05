// _layout.tsx
import { Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { ActivityIndicator, View, Text, StatusBar } from "react-native";
import { useEffect } from "react";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CourseProvider } from "../context/CourseContext";

// Create a separate component for the navigation logic
function NavigationContent() {
  const { hasSeenOnboarding, authToken, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_Regular: PlusJakartaSans_400Regular,
    PlusJakartaSans_Bold: PlusJakartaSans_700Bold,
  });

  // const simulateMemoryClear = async () => {
  //   await AsyncStorage.clear();
  // };
  // simulateMemoryClear();

  useEffect(() => {
    if (isLoading || !fontsLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inOnboardingGroup = segments[0] === "onboarding";
    const inTabsGroup = segments[0] === "(tabs)";

    if (!hasSeenOnboarding && !inOnboardingGroup) {
      router.replace("/(pages)/onboarding");
      return;
    }

    if (authToken) {
      if (inAuthGroup || inOnboardingGroup) {
        router.replace("/(tabs)");
      }
    } else {
      if (!inAuthGroup) {
        router.replace("/(auth)/login");
      }
    }
  }, [hasSeenOnboarding, authToken, isLoading, fontsLoaded, segments]);

  if (!fontsLoaded || isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F5F0E5]">
        <ActivityIndicator size="large" color="#00A86B" />
        <Text className="text-2xl font-bold text-[#040404]">Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F5F0E5]">
      <StatusBar animated backgroundColor="#F5F0E5" barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}

// Main layout component
export default function RootLayout() {
  return (
    <AuthProvider>
      <CourseProvider>
        <NavigationContent />
      </CourseProvider>
    </AuthProvider>
  );
}