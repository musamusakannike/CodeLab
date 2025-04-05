import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  SafeAreaView,
  StatusBar
} from "react-native";
import { Feather, AntDesign } from '@expo/vector-icons';

const HomeScreen = () => {
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
        <TouchableOpacity style={styles.notificationButton}>
          <Feather name="bell" size={24} color="#1C170D" />
        </TouchableOpacity>
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
        {/* Trending Courses */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Trending Courses</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            <TouchableOpacity style={styles.courseCard}>
              <Image 
                source={require("../../assets/images/course-image.png")} 
                style={styles.courseImage}
              />
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>Career Development</Text>
                <Text style={styles.courseCount}>12 Courses</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.courseCard}>
              <Image 
                source={{ uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp" }} 
                style={styles.courseImage}
              />
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>Basic Dev's</Text>
                <Text style={styles.courseCount}>20 Courses</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        
        {/* My Courses */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My Courses</Text>
          
          <View style={styles.myCoursesList}>
            <TouchableOpacity style={styles.myCourseCard}>
              <Image 
                source={{ uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp" }} 
                style={styles.myCourseImage}
              />
              <View style={styles.myCourseInfo}>
                <Text style={styles.myCourseTitle}>Art & Design Courses</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: '65%' }]} />
                </View>
                <View style={styles.progressDetails}>
                  <Text style={styles.progressText}>65% completed</Text>
                  <TouchableOpacity>
                    <Text style={styles.viewProgressText}>View Progress</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.myCourseCard}>
              <Image 
                source={{ uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp" }} 
                style={styles.myCourseImage}
              />
              <View style={styles.myCourseInfo}>
                <Text style={styles.myCourseTitle}>3D Art & Design</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: '75%' }]} />
                </View>
                <View style={styles.progressDetails}>
                  <Text style={styles.progressText}>75% completed</Text>
                  <TouchableOpacity>
                    <Text style={styles.viewProgressText}>View Progress</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.myCourseCard}>
              <Image 
                source={{ uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp" }} 
                style={styles.myCourseImage}
              />
              <View style={styles.myCourseInfo}>
                <Text style={styles.myCourseTitle}>Basic Coding</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: '45%' }]} />
                </View>
                <View style={styles.progressDetails}>
                  <Text style={styles.progressText}>45% completed</Text>
                  <TouchableOpacity>
                    <Text style={styles.viewProgressText}>View Progress</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Featured Course */}
        <View style={styles.featuredContainer}>
          <View style={styles.featuredContent}>
            <View style={styles.featuredTextContainer}>
              <Text style={styles.featuredTitle}>How to Make 3D or 4D Design</Text>
              <Text style={styles.featuredAuthor}>By Miss Lillian Spiro</Text>
              <TouchableOpacity style={styles.enrollButton}>
                <Text style={styles.enrollButtonText}>Enroll Now</Text>
                <AntDesign name="arrowright" size={16} color="#1C170D" />
              </TouchableOpacity>
            </View>
            <Image 
              source={{ uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fb579c8b-0720-48bf-83af-5342aa2ace6b-iFL42Qbr3ZyfGuZDYS6b8NAjvu0Dds.webp" }} 
              style={styles.featuredImage}
            />
          </View>
        </View>
      </ScrollView>
      
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.floatingButton}>
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
  courseGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  courseCard: {
    width: "75%",
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
    fontFamily: "PlusJakartaSans_Regular",
    color: "#8A7D65",
  },
  viewProgressText: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_Regular",
    color: "#8A7D65",
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
  horizontalScroll: {
    gap: 16,
    paddingRight: 250,
  },
});