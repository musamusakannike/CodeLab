import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useCourses } from "../../../context/CourseContext";
import { useRouter } from "expo-router";
import { QuizContent, TextContent, ImageContent, Achievement, QuizOption, CodeContent } from "../../../data/courseData";
import CodeBlock from "../../../components/CodeBlock";

const ContentViewScreen = () => {
  const {
    currentCourse,
    currentLesson,
    currentContent,
    completeContent,
    awardGems,
  } = useCourses();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [earnedAchievement, setEarnedAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    // Reset state when content changes
    setSelectedOption(null);
    setShowExplanation(false);
    setIsCorrect(false);
  }, [currentContent]);

  if (!currentCourse || !currentLesson || !currentContent) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Content not found</Text>
      </SafeAreaView>
    );
  }

  const handleComplete = () => {
    if (currentContent.isCompleted) {
      router.back();
      return;
    }

    completeContent(currentCourse.id, currentContent.id);

    // Check if this completion unlocks an achievement
    const unlockedAchievement = currentCourse.achievements.find(
      (a) => !a.isEarned && a.title === "Design Novice"
    );

    if (unlockedAchievement) {
      setEarnedAchievement(unlockedAchievement);
      setShowAchievement(true);
    } else {
      router.back();
    }
  };

  const handleOptionSelect = (option: QuizOption) => {
    setSelectedOption(option);
  };

  const handleSubmitQuiz = () => {
    if (!selectedOption) return;

    const correct = selectedOption.isCorrect;
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      // Award gems for correct answer
      awardGems(5);
      Alert.alert("Correct!", "You earned 5 gems! 💎", [{ text: "Great!" }]);
    }
  };

  const renderTextContent = () => {
    const textContent = currentContent as TextContent | ImageContent;
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>{textContent.title}</Text>
        <Text style={styles.contentText}>{textContent.text}</Text>
        {textContent.type === "image" && (
          <Image
            source={{ uri: (textContent as ImageContent).imageUrl }}
            style={styles.contentImage}
            resizeMode="contain"
          />
        )}
      </View>
    );
  };

  const renderCodeContent = () => {
    const codeContent = currentContent as CodeContent;
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>{codeContent.title}</Text>
        <Text style={styles.contentText}>{codeContent.text}</Text>
        <View style={styles.codeBlockContainer}>
          <CodeBlock code={codeContent.code} language={codeContent.language} />
        </View>
      </View>
    );
  };

  const renderQuizContent = () => {
    const quizContent = currentContent as QuizContent;
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>Quiz</Text>
        <Text style={styles.quizQuestion}>{quizContent.question}</Text>

        <View style={styles.optionsContainer}>
          {quizContent.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedOption?.id === option.id && styles.selectedOption,
                showExplanation && option.isCorrect && styles.correctOption,
                showExplanation &&
                  selectedOption?.id === option.id &&
                  !option.isCorrect &&
                  styles.incorrectOption,
              ]}
              onPress={() => handleOptionSelect(option)}
              disabled={showExplanation}
            >
              <Text style={styles.optionText}>{option.text}</Text>
              {showExplanation && option.isCorrect && (
                <Feather name="check-circle" size={20} color="#00A86B" />
              )}
              {showExplanation &&
                selectedOption?.id === option.id &&
                !option.isCorrect && (
                  <Feather name="x-circle" size={20} color="#E74C3C" />
                )}
            </TouchableOpacity>
          ))}
        </View>

        {showExplanation && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationTitle}>
              {isCorrect ? "Correct! 🎉" : "Not quite right"}
            </Text>
            <Text style={styles.explanationText}>
              {quizContent.explanation}
            </Text>
          </View>
        )}

        {!showExplanation ? (
          <TouchableOpacity
            style={[
              styles.submitButton,
              !selectedOption && styles.disabledButton,
            ]}
            onPress={handleSubmitQuiz}
            disabled={!selectedOption}
          >
            <Text style={styles.submitButtonText}>Submit Answer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleComplete}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderAchievementModal = () => {
    if (!showAchievement || !earnedAchievement) return null;

    return (
      <View style={styles.achievementModalOverlay}>
        <View style={styles.achievementModal}>
          <View style={styles.achievementIconContainer}>
            <Image
              source={{ uri: earnedAchievement.imageUrl }}
              style={styles.achievementIcon}
            />
          </View>
          <Text style={styles.achievementTitle}>Achievement Unlocked!</Text>
          <Text style={styles.achievementName}>{earnedAchievement.title}</Text>
          <Text style={styles.achievementDescription}>
            {earnedAchievement.description}
          </Text>
          <TouchableOpacity
            style={styles.achievementButton}
            onPress={() => {
              setShowAchievement(false);
              router.back();
            }}
          >
            <Text style={styles.achievementButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
        <Text style={styles.headerTitle}>
          {currentContent.type === "quiz" ? "Quiz" : "Learning Content"}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {currentContent.type === "quiz"
          ? renderQuizContent()
          : currentContent.type === "code"
          ? renderCodeContent()
          : renderTextContent()}
      </ScrollView>

      {/* Complete Button (only for text/image/code content) */}
      {currentContent.type !== "quiz" && (
        <View style={styles.completeButtonContainer}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}
          >
            <Text style={styles.completeButtonText}>
              {currentContent.isCompleted ? "Go Back" : "Mark as Completed"}
            </Text>
            {!currentContent.isCompleted && (
              <Feather name="check" size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Achievement Modal */}
      {renderAchievementModal()}
    </SafeAreaView>
  );
};

export default ContentViewScreen;

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
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  contentContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C170D",
    marginBottom: 16,
    fontFamily: "PlusJakartaSans_Bold",
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#1C170D",
    marginBottom: 20,
    fontFamily: "PlusJakartaSans_Regular",
  },
  contentImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  codeBlockContainer: {
    marginBottom: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
  quizQuestion: {
    fontSize: 18,
    lineHeight: 26,
    color: "#1C170D",
    marginBottom: 24,
    fontFamily: "PlusJakartaSans_Bold",
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  optionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F0E5",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedOption: {
    borderColor: "#8A7D65",
    backgroundColor: "#F0EBE0",
  },
  correctOption: {
    borderColor: "#00A86B",
    backgroundColor: "#E6F7F0",
  },
  incorrectOption: {
    borderColor: "#E74C3C",
    backgroundColor: "#FDEDEC",
  },
  optionText: {
    fontSize: 16,
    color: "#1C170D",
    flex: 1,
    fontFamily: "PlusJakartaSans_Regular",
  },
  explanationContainer: {
    backgroundColor: "#F5F0E5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1C170D",
    marginBottom: 8,
    fontFamily: "PlusJakartaSans_Bold",
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#1C170D",
    fontFamily: "PlusJakartaSans_Regular",
  },
  submitButton: {
    backgroundColor: "#8A7D65",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "PlusJakartaSans_Bold",
  },
  continueButton: {
    backgroundColor: "#00A86B",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "PlusJakartaSans_Bold",
  },
  completeButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#E8DECF",
    borderTopWidth: 1,
    borderTopColor: "#D9CEB9",
  },
  completeButton: {
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
  completeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginRight: 8,
    fontFamily: "PlusJakartaSans_Bold",
  },
  achievementModalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(28, 23, 13, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  achievementModal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },
  achievementIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFF9E6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  achievementIcon: {
    width: 60,
    height: 60,
  },
  achievementTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C170D",
    marginBottom: 8,
    fontFamily: "PlusJakartaSans_Bold",
  },
  achievementName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#8A7D65",
    marginBottom: 12,
    fontFamily: "PlusJakartaSans_Bold",
  },
  achievementDescription: {
    fontSize: 14,
    textAlign: "center",
    color: "#1C170D",
    marginBottom: 24,
    fontFamily: "PlusJakartaSans_Regular",
  },
  achievementButton: {
    backgroundColor: "#00A86B",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  achievementButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "PlusJakartaSans_Bold",
  },
});
