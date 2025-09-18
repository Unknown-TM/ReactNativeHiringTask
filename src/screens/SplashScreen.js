import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

/**
 * SplashScreen Component
 * 
 * Displays app branding and loading indicator while the app initializes.
 * Shows while checking login status and determining initial navigation.
 */
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CheckIn360</Text>
      <Text style={styles.subtitle}>Smart Boarding Pass Scanner</Text>
      <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
