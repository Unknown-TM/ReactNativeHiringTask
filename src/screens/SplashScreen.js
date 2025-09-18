import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native</Text>
      <Text style={styles.subtitle}>Hiring Task</Text>
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
