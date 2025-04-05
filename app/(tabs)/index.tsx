import React, { useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert
} from "react-native";
import { Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import { useCourses } from "../../context/CourseContext";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const { 
    trendingCourses,
    enrolledCourses,
    unenrolledCourses,
    setCurrentCourse,
    claimDailyReward,
    hasClaimedDailyReward,
    streakDays,
    totalGems
  } = useCourses();
  
  const router = useRouter();

  useEffect(() => {
    // Check for daily streak reward on component mount
    if (!hasClaimedDailyReward) {
      setTimeout(() => {
        showStreakReward();
      }, 1000);
    }
  }, []);

  const showStreakReward = () => {
    const reward = claimDailyReward();
    if (reward > 0) {
      Alert.alert(
        "Daily Streak Reward!",
        `Day ${streakDays}: You earned ${reward} gems for your streak! 🎉`,
        [{ text: "Claim", style: "default" }]
      );
    }
  };

  const handleCoursePress = (course: any) => {
    setCurrentCourse(course);
    router.push("/(pages)/course-details");
  };

  const renderTrendingCourses = () => {
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.horizontalScroll}
      >
        {trendingCourses.map((course) => (
          <TouchableOpacity 
            key={course.id} 
            style={styles.courseCard}
            onPress={() => handleCoursePress(course)}
          >
            <Image 
              source={{ uri: course.thumbnailUrl }} 
              style={styles.courseImage}
            />
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseCount}>{course.lessons.length} Lessons</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderEnrolledCourses = () => {
    if (enrolledCourses.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>You haven't enrolled in any courses yet</Text>
          <TouchableOpacity style={styles.emptyStateButton}>
            <Text style={styles.emptyStateButtonText}>Browse Courses</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.myCoursesList}>
        {enrolledCourses.map((course) => (
          <TouchableOpacity 
            key={course.id} 
            style={styles.myCourseCard}
            onPress={() => handleCoursePress(course)}
          >
            <Image 
              source={{ uri: course.thumbnailUrl }} 
              style={styles.myCourseImage}
            />
            <View style={styles.myCourseInfo}>
              <Text style={styles.myCourseTitle}>{course.title}</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${course.progress}%` }]} />
              </View>
              <View style={styles.progressDetails}>
                <Text style={styles.progressText}>{course.progress}% completed</Text>
                <TouchableOpacity>
                  <Text style={styles.viewProgressText}>View Progress</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderFeaturedCourse = () => {
    // Get the first unenrolled course for the featured section
    const featuredCourse = unenrolledCourses[0];
    if (!featuredCourse) return null;

    return (
      <View style={styles.featuredContainer}>
        <View style={styles.featuredContent}>
          <View style={styles.featuredTextContainer}>
            <Text style={styles.featuredTitle}>{featuredCourse.title}</Text>
            <Text style={styles.featuredAuthor}>By {featuredCourse.instructor.name}</Text>
            <TouchableOpacity 
              style={styles.enrollButton}
              onPress={() => handleCoursePress(featuredCourse)}
            >
              <Text style={styles.enrollButtonText}>Enroll Now</Text>
              <AntDesign name="arrowright" size={16} color="#1C170D" />
            </TouchableOpacity>
          </View>
          <Image 
            source={{ uri: featuredCourse.thumbnailUrl }} 
            style={styles.featuredImage}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8DECF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image 
            source={require("../../assets/images/profile-picture.png")} 
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Welcome!!</Text>
        <View style={styles.headerRight}>
          <View style={styles.gemsContainer}>
            <Ionicons name="diamond" size={18} color="#FFD700" />
            <Text style={styles.gemsText}>{totalGems}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Feather name="bell" size={24} color="#1C170D" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#8A7D65" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Courses"
          placeholderTextColor="#8A7D65"
        />
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Streak Banner */}
        <TouchableOpacity style={styles.streakBanner} onPress={showStreakReward}>
          <View style={styles.streakIconContainer}>
            <Ionicons name="flame" size={24} color="#FF6B6B" />
          </View>
          <View style={styles.streakInfo}>
            <Text style={styles.streakTitle}>Daily Streak: {streakDays} days</Text>
            <Text style={styles.streakSubtitle}>
              {hasClaimedDailyReward 
                ? "You've claimed today's reward!" 
                : "Tap to claim your daily reward!"}
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color="#8A7D65" />
        </TouchableOpacity>

        {/* Trending Courses */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Trending Courses</Text>
          {renderTrendingCourses()}
        </View>
        
        {/* My Courses */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My Courses</Text>
          {renderEnrolledCourses()}
        </View>
        
        {/* Featured Course */}
        {renderFeaturedCourse()}
      </ScrollView>
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => router.push("/all-courses")}
      >
        <Feather name="plus" size={24} color="#FFFFFF" />
        <Text style={styles.floatingButtonText}>Add Course</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8DECF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  gemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F0E5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 12,
  },
  gemsText: {
    fontFamily: "PlusJakartaSans_Bold",
    fontSize: 14,
    color: "#1C170D",
    marginLeft: 4,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#D9CEB9",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C170D",
    fontFamily: "PlusJakartaSans_Bold",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F0E5",
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1C170D",
    fontFamily: "PlusJakartaSans_Regular",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  streakBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F0E5",
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B6B",
  },
  streakIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFEEEE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  streakInfo: {
    flex: 1,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C170D",
    fontFamily: "PlusJakartaSans_Bold",
  },
  streakSubtitle: {
    fontSize: 14,
    color: "#8A7D65",
    fontFamily: "PlusJakartaSans_Regular",
  },
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1C170D",
    marginBottom: 16,
    fontFamily: "PlusJakartaSans_Bold",
  },
  horizontalScroll: {
    gap: 16,
    paddingRight: 20,
  },
  courseCard: {
    width: 250,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  courseInfo: {
    padding: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C170D",
    marginBottom: 4,
    fontFamily: "PlusJakartaSans_Bold",
  },
  courseCount: {
    fontSize: 14,
    color: "#8A7D65",
    fontFamily: "PlusJakartaSans_Regular",
  },
  myCoursesList: {
    gap: 16,
  },
  myCourseCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  myCourseImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  myCourseInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  myCourseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C170D",
    marginBottom: 8,
    fontFamily: "PlusJakartaSans_Bold",
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#F5F0E5",
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#8A7D65",
    borderRadius: 3,
  },
  progressDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressText: {
    fontSize: 14,
    color: "#8A7D65",
    fontFamily: "PlusJakartaSans_Regular",
  },
  viewProgressText: {
    fontSize: 14,
    color: "#8A7D65",
    fontWeight: "600",
    fontFamily: "PlusJakartaSans_Bold",
  },
  featuredContainer: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F5F0E5",
    borderRadius: 16,
  },
  featuredContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  featuredTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C170D",
    marginBottom: 4,
    fontFamily: "PlusJakartaSans_Bold",
  },
  featuredAuthor: {
    fontSize: 14,
    color: "#8A7D65",
    marginBottom: 16,
    fontFamily: "PlusJakartaSans_Regular",
  },
  enrollButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F0E5",
    borderWidth: 1,
    borderColor: "#D9CEB9",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  enrollButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1C170D",
    marginRight: 8,
    fontFamily: "PlusJakartaSans_Bold",
  },
  featuredImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  floatingButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#00A86B",
    borderRadius: 28,
    height: 56,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  floatingButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "PlusJakartaSans_Bold",
    marginLeft: 8,
  },
  emptyState: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F0E5",
    borderRadius: 16,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#8A7D65",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "PlusJakartaSans_Regular",
  },
  emptyStateButton: {
    backgroundColor: "#8A7D65",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  emptyStateButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "PlusJakartaSans_Bold",
  },
});