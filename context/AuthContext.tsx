// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  hasSeenOnboarding: boolean;
  authToken: string | null;
  setHasSeenOnboarding: (value: boolean) => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  hasSeenOnboarding: false,
  authToken: null,
  setHasSeenOnboarding: async () => {},
  login: async () => {},
  logout: async () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasSeenOnboarding, setHasSeenOnboardingState] = useState(false);
  const [authToken, setAuthTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [onboardingStatus, token] = await Promise.all([
          AsyncStorage.getItem('hasSeenOnboarding'),
          AsyncStorage.getItem('authToken'),
        ]);
        
        setHasSeenOnboardingState(onboardingStatus === 'true');
        setAuthTokenState(token);
      } catch (error) {
        console.error('Error loading auth data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const setHasSeenOnboarding = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', value.toString());
      setHasSeenOnboardingState(value);
    } catch (error) {
      console.error('Error setting onboarding status:', error);
    }
  };

  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      setAuthTokenState(token);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setAuthTokenState(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        hasSeenOnboarding,
        authToken,
        setHasSeenOnboarding,
        login,
        logout,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};