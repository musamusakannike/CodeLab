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
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";
import { router } from "expo-router";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      // Validate inputs
      if (!email || !password) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      await login("mock-auth-token");
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardAvoid}
      >
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subtitleText}>
            Login to your account to continue
          </Text>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputWrapper}>
              <Feather
                name="mail"
                size={20}
                color="#8A7D65"
                style={styles.inputIcon}
              />
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
              <Feather
                name="lock"
                size={20}
                color="#8A7D65"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#A9A195"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color="#8A7D65"
                />
              </Pressable>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or continue with</Text>
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

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
    paddingTop: 40,
    paddingBottom: 24,
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
    fontFamily: "PlusJakartaSans_Regular",
    color: "#8A7D65",
    textAlign: "center",
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "PlusJakartaSans_Bold",
    color: "#A1824A",
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
    fontFamily: "PlusJakartaSans_Regular",
    color: "#1C170D",
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#8A7D65",
    fontFamily: "PlusJakartaSans_Regular",
    fontWeight: "500",
  },
  loginButton: {
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
  loginButtonText: {
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
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  signupText: {
    fontSize: 14,
    color: "#8A7D65",
    fontFamily: "PlusJakartaSans_Regular",
  },
  signupLink: {
    fontSize: 14,
    color: "#1C170D",
    fontWeight: "600",
    fontFamily: "PlusJakartaSans_Bold",
  },
});
