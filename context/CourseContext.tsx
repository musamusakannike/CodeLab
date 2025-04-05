import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  courses, 
  userProgress, 
  Course, 
  Lesson, 
  Content, 
  calculateCourseProgress, 
  markContentAsCompleted, 
  awardGems, 
  updateStreak, 
  getStreakReward,
  enrollInCourse,
  getTrendingCourses,
  getEnrolledCourses,
  getUnenrolledCourses
} from '../data/courseData';

interface CourseContextType {
  courses: Course[];
  userProgress: typeof userProgress;
  trendingCourses: Course[];
  enrolledCourses: Course[];
  unenrolledCourses: Course[];
  currentCourse: Course | null;
  currentLesson: Lesson | null;
  currentContent: Content | null;
  setCurrentCourse: (course: Course | null) => void;
  setCurrentLesson: (lesson: Lesson | null) => void;
  setCurrentContent: (content: Content | null) => void;
  completeContent: (courseId: string, contentId: string) => void;
  enroll: (courseId: string) => void;
  claimDailyReward: () => number;
  hasClaimedDailyReward: boolean;
  streakDays: number;
  totalGems: number;
  awardGems: (amount: number) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allCourses, setAllCourses] = useState<Course[]>(courses);
  const [userProgressState, setUserProgressState] = useState(userProgress);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentContent, setCurrentContent] = useState<Content | null>(null);
  const [trendingCourses, setTrendingCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [unenrolledCourses, setUnenrolledCourses] = useState<Course[]>([]);
  const [hasClaimedDailyReward, setHasClaimedDailyReward] = useState(false);

  // Initialize courses on mount
  useEffect(() => {
    updateCourseData();
    checkDailyStreak();
  }, []);

  const updateCourseData = () => {
    setTrendingCourses(getTrendingCourses());
    setEnrolledCourses(getEnrolledCourses());
    setUnenrolledCourses(getUnenrolledCourses());
  };

  const checkDailyStreak = () => {
    const today = new Date();
    const lastLogin = new Date(userProgressState.streak.lastLoginDate);
    
    // Check if already logged in today
    if (
      lastLogin.getFullYear() === today.getFullYear() &&
      lastLogin.getMonth() === today.getMonth() &&
      lastLogin.getDate() === today.getDate()
    ) {
      setHasClaimedDailyReward(true);
    } else {
      setHasClaimedDailyReward(false);
      updateStreak();
      setUserProgressState({...userProgress});
    }
  };

  const completeContent = (courseId: string, contentId: string) => {
    markContentAsCompleted(courseId, contentId);
    
    // If it's a quiz, award gems
    const course = allCourses.find(c => c.id === courseId);
    if (course) {
      const content = course.lessons
        .flatMap(lesson => lesson.contents)
        .find(content => content.id === contentId);
      
      if (content?.type === 'quiz') {
        awardGems(10); // Award 10 gems for completing a quiz
        setUserProgressState({...userProgress});
      }
    }
    
    // Update state
    setAllCourses([...courses]);
    updateCourseData();
  };

  const enroll = (courseId: string) => {
    enrollInCourse(courseId);
    setAllCourses([...courses]);
    updateCourseData();
  };

  const claimDailyReward = () => {
    if (hasClaimedDailyReward) return 0;
    
    const reward = getStreakReward();
    awardGems(reward);
    setHasClaimedDailyReward(true);
    setUserProgressState({...userProgress});
    
    return reward;
  };

  return (
    <CourseContext.Provider
      value={{
        courses: allCourses,
        userProgress: userProgressState,
        trendingCourses,
        enrolledCourses,
        unenrolledCourses,
        currentCourse,
        currentLesson,
        currentContent,
        setCurrentCourse,
        setCurrentLesson,
        setCurrentContent,
        completeContent,
        enroll,
        claimDailyReward,
        hasClaimedDailyReward,
        streakDays: userProgressState.streak.currentStreak,
        totalGems: userProgressState.totalGems,
        awardGems
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};