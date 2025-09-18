import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import { calculateDistance, CONSTANTS } from '../utils/helpers';

// Delhi Airport coordinates and geofence radius
const DELHI_AIRPORT = CONSTANTS.DELHI_AIRPORT;
const GEOFENCE_RADIUS = CONSTANTS.GEOFENCE_RADIUS;

const LocationScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInsideGeofence, setIsInsideGeofence] = useState(null);
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission is required to check your position');
        return;
      }
    } catch (err) {
      setError('Failed to request location permission');
      console.error('Permission error:', err);
    }
  };


  const getCurrentLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission is required');
        setIsLoading(false);
        return;
      }

      const locationResult = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const currentLocation = {
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
      };

      setLocation(currentLocation);

      // Calculate distance to Delhi Airport
      const calculatedDistance = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        DELHI_AIRPORT.latitude,
        DELHI_AIRPORT.longitude
      );

      setDistance(calculatedDistance);
      setIsInsideGeofence(calculatedDistance <= GEOFENCE_RADIUS);

    } catch (err) {
      setError('Failed to get current location');
      console.error('Location error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocationStatus = () => {
    if (isInsideGeofence === null) return '';
    return isInsideGeofence ? 'Inside Airport Zone' : 'Outside Airport Zone';
  };

  const getStatusColor = () => {
    if (isInsideGeofence === null) return '#666';
    return isInsideGeofence ? '#4CAF50' : '#F44336';
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Location Check</Text>
        <Text style={styles.subtitle}>
          Check if you're within 2km of Delhi Airport
        </Text>

        <View style={styles.airportInfo}>
          <Text style={styles.airportTitle}>Delhi Airport</Text>
          <Text style={styles.airportCoords}>
            Lat: {DELHI_AIRPORT.latitude}, Long: {DELHI_AIRPORT.longitude}
          </Text>
        </View>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2196F3" />
            <Text style={styles.loadingText}>Getting your location...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {location && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationTitle}>Your Location</Text>
            <Text style={styles.locationCoords}>
              Lat: {location.latitude.toFixed(6)}
            </Text>
            <Text style={styles.locationCoords}>
              Long: {location.longitude.toFixed(6)}
            </Text>

            {distance !== null && (
              <View style={styles.distanceContainer}>
                <Text style={styles.distanceText}>
                  Distance to Airport: {distance.toFixed(2)} km
                </Text>
              </View>
            )}

            {isInsideGeofence !== null && (
              <View style={styles.statusContainer}>
                <Text style={[styles.statusText, { color: getStatusColor() }]}>
                  {getLocationStatus()}
                </Text>
              </View>
            )}
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={getCurrentLocation}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Getting Location...' : 'Check My Location'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('ScanScreen')}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Back to Scan
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  airportInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  airportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  airportCoords: {
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  errorText: {
    color: '#F44336',
    fontSize: 16,
  },
  locationContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  locationCoords: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  distanceContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  distanceText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  statusContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#2196F3',
  },
});

export default LocationScreen;
