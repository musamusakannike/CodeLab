import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useCourses } from "../../../context/CourseContext";
import { useRouter } from "expo-router";

const LessonDetailsScreen = () => {
  const { 
    currentCourse, 
    currentLesson,
    setCurrentContent
  } = useCourses();
  const router = useRouter();

  if (!currentCourse || !currentLesson) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Lesson not found</Text>
      </SafeAreaView>
    );
  }

  const handleContentPress = (content: any) => {
    if (content.isLocked) return;
    setCurrentContent(content);
    router.push("/(pages)/content-view");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8DECF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#1C170D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lesson Details</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Lesson Info */}
      <View style={styles.lessonInfoContainer}>
        <Text style={styles.lessonTitle}>{currentLesson.title}</Text>
        <Text style={styles.lessonDescription}>{currentLesson.description}</Text>
        <View style={styles.lessonMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color="#8A7D65" />
            <Text style={styles.metaText}>{currentLesson.duration} min</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="document-text-outline" size={16} color="#8A7D65" />
            <Text style={styles.metaText}>{currentLesson.contents.length} contents</Text>
          </View>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>Lesson Contents</Text>
        
        <View style={styles.contentsContainer}>
          {currentLesson.contents.map((content, index) => (
            <TouchableOpacity
              key={content.id}
              style={[
                styles.contentCard,
                content.isLocked && styles.contentLocked
              ]}
              onPress={() => handleContentPress(content)}
              disabled={content.isLocked}
            >
              <View style={styles.contentNumber}>
                <Text style={styles.contentNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.contentInfo}>
                <Text style={styles.contentTitle}>{content.title}</Text>
                <View style={styles.contentTypeContainer}>
                  {content.type === 'text' && (
                    <View style={styles.contentType}>
                      <Feather name="file-text" size={12} color="#8A7D65" />
                      <Text style={styles.contentTypeText}>Reading</Text>
                    </View>
                  )}
                  {content.type === 'image' && (
                    <View style={styles.contentType}>
                      <Feather name="image" size={12} color="#8A7D65" />
                      <Text style={styles.contentTypeText}>Visual</Text>
                    </View>
                  )}
                  {content.type === 'quiz' && (
                    <View style={[styles.contentType, styles.quizType]}>
                      <Feather name="help-circle" size={12} color="#9B59B6" />
                      <Text style={[styles.contentTypeText, styles.quizTypeText]}>Quiz</Text>
                    </View>
                  )}
                  {content.isCompleted && (
                    <View style={styles.completedBadge}>
                      <Feather name="check" size={10} color="#FFFFFF" />
                      <Text style={styles.completedText}>Completed</Text>
                    </View>
                  )}
                </View>
              </View>
              {content.isLocked ? (
                <Feather name="lock" size={20} color="#8A7D65" />
              ) : (
                <Feather name="chevron-right" size={20} color="#8A7D65" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { 
                width: `${(currentLesson.contents.filter(c => c.isCompleted).length / 
                  currentLesson.contents.length) * 100}%` 
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {currentLesson.contents.filter(c => c.isCompleted).length} of {currentLesson.contents.length} completed
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LessonDetailsScreen;

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
    borderBottomWidth: 1,
    borderBottomColor: "#D9CEB9",
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
    color: "#1C170D",
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
  lessonInfoContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#D9CEB9",
  },
  lessonTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1C170D",
    marginBottom: 8,
    fontFamily: "PlusJakartaSans_Bold",
  },
  lessonDescription: {
    fontSize: 14,
    color: "#1C170D",
    marginBottom: 16,
    lineHeight: 22,
    fontFamily: "PlusJakartaSans_Regular",
  },
  lessonMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  metaText: {
    fontSize: 14,
    color: "#8A7D65",
    marginLeft: 6,
    fontFamily: "PlusJakartaSans_Regular",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C170D",
    marginBottom: 16,
    fontFamily: "PlusJakartaSans_Bold",
  },
  contentsContainer: {
    gap: 12,
  },
  contentCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  contentLocked: {
    opacity: 0.7,
  },
  contentNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F5F0E5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contentNumberText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8A7D65",
    fontFamily: "PlusJakartaSans_Bold",
  },
  contentInfo: {
    flex: 1,
    marginRight: 8,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C170D",
    marginBottom: 6,
    fontFamily: "PlusJakartaSans_Bold",
  },
  contentTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentType: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F0E5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 8,
  },
  contentTypeText: {
    fontSize: 10,
    color: "#8A7D65",
    marginLeft: 4,
    fontFamily: "PlusJakartaSans_Regular",
  },
  quizType: {
    backgroundColor: "#F5EEFF",
  },
  quizTypeText: {
    color: "#9B59B6",
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00A86B",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  completedText: {
    fontSize: 10,
    color: "#FFFFFF",
    marginLeft: 4,
    fontFamily: "PlusJakartaSans_Bold",
  },
  progressContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#D9CEB9",
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#F5F0E5",
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#00A86B",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: "#8A7D65",
    textAlign: "center",
    fontFamily: "PlusJakartaSans_Regular",
  },
});