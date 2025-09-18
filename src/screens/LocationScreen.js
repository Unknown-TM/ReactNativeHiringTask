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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  calculateDistance, 
  CONSTANTS, 
  isLocationCacheValid, 
  formatTimestamp 
} from '../utils/helpers';

// Delhi Airport coordinates and geofence radius
const DELHI_AIRPORT = CONSTANTS.DELHI_AIRPORT;
const GEOFENCE_RADIUS = CONSTANTS.GEOFENCE_RADIUS;

const LocationScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInsideGeofence, setIsInsideGeofence] = useState(null);
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);
  const [isUsingCache, setIsUsingCache] = useState(false);
  const [cacheTimestamp, setCacheTimestamp] = useState(null);
  
  // Get the scanned barcode data from navigation params
  const scannedBarcodeData = route?.params?.scannedData || null;

  useEffect(() => {
    requestLocationPermission();
    loadCachedLocation(); // Automatically load cached location on screen open
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

  /**
   * Load cached location data automatically when screen opens
   * Only loads cache if it matches the current scanned barcode
   */
  const loadCachedLocation = async () => {
    // Only try to load cache if we have a scanned barcode
    if (!scannedBarcodeData) {
      return;
    }
    
    try {
      const cachedData = await AsyncStorage.getItem(CONSTANTS.STORAGE_KEYS.LOCATION_CACHE);
      if (cachedData) {
        const parsedCache = JSON.parse(cachedData);
        if (isLocationCacheValid(parsedCache, scannedBarcodeData, CONSTANTS.LOCATION_CACHE_MAX_AGE)) {
          // Use cached data immediately - it matches this barcode
          setLocation(parsedCache.location);
          setDistance(parsedCache.distance);
          setIsInsideGeofence(parsedCache.isInsideGeofence);
          setCacheTimestamp(parsedCache.timestamp);
          setIsUsingCache(true);
        }
      }
    } catch (error) {
      console.error('Error loading cached location:', error);
    }
  };


  const getCurrentLocation = async (forceRefresh = false) => {
    setIsLoading(true);
    setError(null);
    setIsUsingCache(false);

    try {
      // Check for cached location data first (unless force refresh)
      if (!forceRefresh && scannedBarcodeData) {
        const cachedData = await AsyncStorage.getItem(CONSTANTS.STORAGE_KEYS.LOCATION_CACHE);
        if (cachedData) {
          const parsedCache = JSON.parse(cachedData);
          if (isLocationCacheValid(parsedCache, scannedBarcodeData, CONSTANTS.LOCATION_CACHE_MAX_AGE)) {
            // Use cached data - it matches this barcode
            setLocation(parsedCache.location);
            setDistance(parsedCache.distance);
            setIsInsideGeofence(parsedCache.isInsideGeofence);
            setCacheTimestamp(parsedCache.timestamp);
            setIsUsingCache(true);
            setIsLoading(false);
            return;
          }
        }
      }

      // Get fresh location data
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

      // Cache the location data with barcode information
      const cacheData = {
        location: currentLocation,
        distance: calculatedDistance,
        isInsideGeofence: calculatedDistance <= GEOFENCE_RADIUS,
        timestamp: new Date().toISOString(),
        barcodeData: scannedBarcodeData, // Include the scanned barcode data
      };

      await AsyncStorage.setItem(
        CONSTANTS.STORAGE_KEYS.LOCATION_CACHE, 
        JSON.stringify(cacheData)
      );
      setCacheTimestamp(cacheData.timestamp);

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

            {/* Cache Status Information */}
            {cacheTimestamp && (
              <View style={styles.cacheContainer}>
                <Text style={styles.cacheText}>
                  {isUsingCache ? 'Using cached data' : 'Fresh location data'}
                </Text>
                <Text style={styles.cacheTimestamp}>
                  Last updated: {formatTimestamp(cacheTimestamp)}
                </Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.buttonContainer}>
          {!location ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => getCurrentLocation(false)}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Getting Location...' : 'Check My Location'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.refreshButton]}
              onPress={() => getCurrentLocation(true)}
              disabled={isLoading}
            >
              <Text style={[styles.buttonText, styles.refreshButtonText]}>
                Update Location
              </Text>
            </TouchableOpacity>
          )}
        </View>

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
  cacheContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 6,
  },
  cacheText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  cacheTimestamp: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  refreshButton: {
    backgroundColor: '#FF9800',
  },
  refreshButtonText: {
    color: '#fff',
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
