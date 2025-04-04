import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

interface OnboardingItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: any;
}

const onboardingData: OnboardingItem[] = [
  {
    id: "1",
    title: "Welcome to CodeLab",
    subtitle: "Learn to Code with Ease",
    description:
      "Join thousands of learners and start your coding journey today with hands-on lessons and expert guidance.",
    image: require("../../../assets/images/onboarding1.png"),
  },
  {
    id: "2",
    title: "Interactive Lessons",
    subtitle: "Practice as You Learn",
    description:
      "Our interactive coding environment lets you write and test code directly in the app, with real-time feedback.",
    image: require("../../../assets/images/onboarding2.png"),
  },
  {
    id: "3",
    title: "Track Your Progress",
    subtitle: "Achieve Your Goals",
    description:
      "Set learning goals and track your progress with detailed statistics and achievement badges.",
    image: require("../../../assets/images/onboarding3.png"),
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item }: { item: OnboardingItem }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      // Navigate to main app
      router.replace("/");
    }
  };

  const handleLearnMore = () => {
    // Handle learn more action
    // For now, just navigate to home
    router.replace("/");
  };

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(currentIndex);
  };

  const Footer = () => {
    return (
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleLearnMore}
          >
            <Text style={styles.secondaryButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={updateCurrentSlideIndex}
      />

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slide: {
    width,
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: height * 0.45,
    backgroundColor: "#f5e6e0",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
    alignItems: "center",
  },
  title: {
    fontFamily: "PlusJakartaSans_Bold",
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    position: "absolute",
    bottom: 10,
    left: 10,
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontFamily: "PlusJakartaSans_Regular",
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontFamily: "PlusJakartaSans_Regular",
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    paddingHorizontal: 30,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  indicator: {
    height: 8,
    width: 8,
    backgroundColor: "#ddd",
    marginHorizontal: 5,
    borderRadius: 4,
  },
  activeIndicator: {
    backgroundColor: "#00A86B", // Green color for active indicator
  },
  buttonContainer: {
    width: "100%",
  },
  primaryButton: {
    backgroundColor: "#00A86B", // Green button
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#f5f5f0", // Light beige color
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "500",
  },
});
