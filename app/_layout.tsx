import { Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { ActivityIndicator, View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../global.css";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const segments = useSegments();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_Regular: PlusJakartaSans_400Regular,
    PlusJakartaSans_Bold: PlusJakartaSans_700Bold,
  });

  useEffect(() => {
    const prepare = async () => {
      try {
        // Remove this line in production - it's only for testing
        // await AsyncStorage.removeItem("hasSeenOnboarding");
        
        const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
        console.log("Onboarding status:", hasSeenOnboarding);

        if (hasSeenOnboarding === null) {
          setInitialRoute("onboarding");
        } else {
          setInitialRoute("(tabs)"); // or whatever your main app route is
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        setInitialRoute("(tabs)"); // Fallback to main app
      } finally {
        setIsReady(true);
      }
    };

    prepare();
  }, []);

  useEffect(() => {
    if (!isReady || !fontsLoaded || !initialRoute) return;

    // Check if we need to redirect
    const inAuthGroup = segments[0] === "onboarding";

    if (initialRoute === "onboarding" && !inAuthGroup) {
      router.replace("/onboarding");
    } else if (initialRoute !== "onboarding" && inAuthGroup) {
      router.replace("/");
    }
  }, [isReady, fontsLoaded, initialRoute, segments]);

  if (!fontsLoaded || !isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}