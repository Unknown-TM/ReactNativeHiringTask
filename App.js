import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONSTANTS } from './src/utils/helpers';

// Import screen components
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import ScanScreen from './src/screens/ScanScreen';
import LocationScreen from './src/screens/LocationScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();

/**
 * Main App Component
 * 
 * Handles app initialization, login state management, and navigation setup.
 * Shows splash screen while checking login status, then navigates to appropriate screen.
 */
export default function App() {
  // App state management
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on app initialization
  useEffect(() => {
    checkLoginStatus();
  }, []);

  /**
   * Checks if user is already logged in by reading from AsyncStorage
   * Sets loading state to false after check is complete
   */
  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem(CONSTANTS.STORAGE_KEYS.USER_DATA);
      if (userData) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "ScanScreen" : "LoginScreen"}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen 
          name="ScanScreen" 
          component={ScanScreen}
          options={{ title: 'Scan Boarding Pass' }}
        />
        <Stack.Screen 
          name="LocationScreen" 
          component={LocationScreen}
          options={{ title: 'Location Check' }}
        />
        <Stack.Screen 
          name="ProfileScreen" 
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
