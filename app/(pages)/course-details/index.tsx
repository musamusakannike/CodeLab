import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useCourses } from "../../../context/CourseContext";
import { useRouter } from "expo-router";

const CourseDetailsScreen = () => {
  const { 
    currentCourse, 
    setCurrentLesson,
    enroll
  } = useCourses();
  const router = useRouter();

  if (!currentCourse) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Course not found</Text>
      </SafeAreaView>
    );
  }

  const handleEnroll = () => {
    enroll(currentCourse.id);
    // Refresh the current course
    router.back();
    router.push("/(pages)/course-details"); 
  };

  const handleStartCourse = () => {
    // Find the first unlocked lesson
    const firstUnlockedLesson = currentCourse.lessons.find(lesson => !lesson.isLocked);
    if (firstUnlockedLesson) {
      setCurrentLesson(firstUnlockedLesson);
      router.push("/(pages)/lesson-details");
    }
  };

  const handleLessonPress = (lesson: any) => {
    if (lesson.isLocked) return;
    setCurrentLesson(lesson);
    router.push("/(pages)/lesson-details");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C170D" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Course Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Course Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: currentCourse.thumbnailUrl }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay}>
            <View style={styles.courseInfo}>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>{currentCourse.level}</Text>
              </View>
              <Text style={styles.courseTitle}>{currentCourse.title}</Text>
              <View style={styles.instructorRow}>
                <Image
                  source={{ uri: currentCourse.instructor.avatarUrl }}
                  style={styles.instructorAvatar}
                />
                <Text style={styles.instructorName}>
                  {currentCourse.instructor.name}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Course Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={20} color="#8A7D65" />
            <Text style={styles.statValue}>{currentCourse.totalDuration} min</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="book-outline" size={20} color="#8A7D65" />
            <Text style={styles.statValue}>{currentCourse.lessons.length}</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="trophy-outline" size={20} color="#8A7D65" />
            <Text style={styles.statValue}>{currentCourse.achievements.length}</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
        </View>

        {/* Course Description */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About this course</Text>
          <Text style={styles.descriptionText}>{currentCourse.description}</Text>
        </View>

        {/* Course Achievements */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.achievementsContainer}
          >
            {currentCourse.achievements.map((achievement) => (
              <View 
                key={achievement.id} 
                style={[
                  styles.achievementCard,
                  achievement.isEarned ? styles.achievementEarned : styles.achievementLocked
                ]}
              >
                <Image
                  source={{ uri: achievement.imageUrl }}
                  style={styles.achievementImage}
                />
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Course Lessons */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Lessons</Text>
          <View style={styles.lessonsContainer}>
            {currentCourse.lessons.map((lesson, index) => (
              <TouchableOpacity
                key={lesson.id}
                style={[
                  styles.lessonCard,
                  lesson.isLocked && styles.lessonLocked
                ]}
                onPress={() => handleLessonPress(lesson)}
                disabled={lesson.isLocked}
              >
                <View style={styles.lessonNumber}>
                  <Text style={styles.lessonNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.lessonInfo}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonDescription}>
                    {lesson.description}
                  </Text>
                  <View style={styles.lessonMeta}>
                    <View style={styles.lessonDuration}>
                      <Ionicons name="time-outline" size={14} color="#8A7D65" />
                      <Text style={styles.lessonDurationText}>
                        {lesson.duration} min
                      </Text>
                    </View>
                    {lesson.isCompleted && (
                      <View style={styles.completedBadge}>
                        <Feather name="check" size={12} color="#FFFFFF" />
                        <Text style={styles.completedText}>Completed</Text>
                      </View>
                    )}
                  </View>
                </View>
                {lesson.isLocked ? (
                  <Feather name="lock" size={20} color="#8A7D65" />
                ) : (
                  <Feather name="chevron-right" size={20} color="#8A7D65" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Spacing for button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Action Button */}
      <View style={styles.actionButtonContainer}>
        {currentCourse.isEnrolled ? (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleStartCourse}
          >
            <Text style={styles.actionButtonText}>Continue Learning</Text>
            <Feather name="arrow-right" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleEnroll}
          >
            <Text style={styles.actionButtonText}>Enroll Now</Text>
            <Feather name="arrow-right" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CourseDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8DECF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1C170D",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "PlusJakartaSans_Bold",
  },
  placeholder: {
    width: 40,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "PlusJakartaSans_Regular",
  },
  bannerContainer: {
    position: "relative",
    height: 220,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "rgba(28, 23, 13, 0.7)",
  },
  courseInfo: {
    gap: 8,
  },
  levelBadge: {
    backgroundColor: "#8A7D65",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  levelText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "PlusJakartaSans_Bold",
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "PlusJakartaSans_Bold",
  },
  instructorRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  instructorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  instructorName: {
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "PlusJakartaSans_Regular",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: -20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1C170D",
    marginTop: 4,
    fontFamily: "PlusJakartaSans_Bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#8A7D65",
    fontFamily: "PlusJakartaSans_Regular",
  },
  statDivider: {
    width: 1,
    height: "80%",
    backgroundColor: "#E8DECF",
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C170D",
    marginBottom: 12,
    fontFamily: "PlusJakartaSans_Bold",
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#1C170D",
    fontFamily: "PlusJakartaSans_Regular",
  },
  achievementsContainer: {
    paddingVertical: 8,
    paddingRight: 20,
    gap: 16,
  },
  achievementCard: {
    width: 150,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  achievementEarned: {
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  achievementLocked: {
    opacity: 0.7,
  },
  achievementImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1C170D",
    textAlign: "center",
    marginBottom: 4,
    fontFamily: "PlusJakartaSans_Bold",
  },
  achievementDescription: {
    fontSize: 12,
    color: "#8A7D65",
    textAlign: "center",
    fontFamily: "PlusJakartaSans_Regular",
  },
  lessonsContainer: {
    gap: 12,
  },
  lessonCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonLocked: {
    opacity: 0.7,
  },
  lessonNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F5F0E5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  lessonNumberText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8A7D65",
    fontFamily: "PlusJakartaSans_Bold",
  },
  lessonInfo: {
    flex: 1,
    marginRight: 8,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C170D",
    marginBottom: 4,
    fontFamily: "PlusJakartaSans_Bold",
  },
  lessonDescription: {
    fontSize: 12,
    color: "#8A7D65",
    marginBottom: 8,
    fontFamily: "PlusJakartaSans_Regular",
  },
  lessonMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  lessonDuration: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  lessonDurationText: {
    fontSize: 12,
    color: "#8A7D65",
    marginLeft: 4,
    fontFamily: "PlusJakartaSans_Regular",
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00A86B",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  completedText: {
    fontSize: 10,
    color: "#FFFFFF",
    marginLeft: 4,
    fontFamily: "PlusJakartaSans_Bold",
  },
  actionButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#E8DECF",
    borderTopWidth: 1,
    borderTopColor: "#D9CEB9",
  },
  actionButton: {
    flexDirection: "row",
    backgroundColor: "#00A86B",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginRight: 8,
    fontFamily: "PlusJakartaSans_Bold",
  },
});