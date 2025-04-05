import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Pressable,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import { router } from "expo-router";
import { useAuth } from "../../../context/AuthContext";

const RegisterScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Create Account</Text>
            <Text style={styles.subtitleText}>
              Sign up to get started with our app
            </Text>
          </View>

          {/* Signup Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <Feather name="user" size={20} color="#8A7D65" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#A9A195"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputWrapper}>
                <Feather name="mail" size={20} color="#8A7D65" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#A9A195"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={20} color="#8A7D65" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
                  placeholderTextColor="#A9A195"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#8A7D65" />
                </Pressable>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={20} color="#8A7D65" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor="#A9A195"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                  <Feather name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#8A7D65" />
                </Pressable>
              </View>
            </View>

            <View style={styles.termsContainer}>
              <TouchableOpacity 
                style={styles.checkbox} 
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              >
                {agreeToTerms && <Feather name="check" size={16} color="#8A7D65" />}
              </TouchableOpacity>
              <Text style={styles.termsText}>
                I agree to the{" "}
                <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>

            <TouchableOpacity style={styles.signupButton}>
              <Text style={styles.signupButtonText}>Create Account</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or sign up with</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Feather name="github" size={24} color="#1C170D" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Feather name="facebook" size={24} color="#1C170D" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Feather name="twitter" size={24} color="#1C170D" />
              </TouchableOpacity>
            </View>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8DECF",
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "PlusJakartaSans_Bold",
    color: "#1C170D",
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: "#8A7D65",
    fontFamily: "PlusJakartaSans_Regular",
    textAlign: "center",
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#A1824A",
    fontFamily: "PlusJakartaSans_Bold",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F0E5",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D9CEB9",
    height: 56,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  eyeIcon: {
    padding: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1C170D",
    fontFamily: "PlusJakartaSans_Regular",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
    marginTop: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#8A7D65",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F0E5",
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: "#8A7D65",
    lineHeight: 20,
  },
  termsLink: {
    color: "#1C170D",
    fontWeight: "500",
    fontFamily: "PlusJakartaSans_Regular",
  },
  signupButton: {
    backgroundColor: "#8A7D65",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  signupButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "PlusJakartaSans_Bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#D9CEB9",
  },
  dividerText: {
    color: "#8A7D65",
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: "PlusJakartaSans_Regular",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#F5F0E5",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#D9CEB9",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 14,
    color: "#8A7D65",
    fontFamily: "PlusJakartaSans_Regular",
  },
  loginLink: {
    fontSize: 14,
    color: "#1C170D",
    fontWeight: "600",
    fontFamily: "PlusJakartaSans_Bold",
  },
});